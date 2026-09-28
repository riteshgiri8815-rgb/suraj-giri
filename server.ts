import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared Gemini client setup following gemini-api SKILL.md guidelines
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MEDICAL_ANALYSIS_SYSTEM_PROMPT = `You are a specialized medical information interpretation assistant for an iOS application named PulseDoc.
Your role is to strictly analyze uploaded medical laboratory reports, doctor prescriptions, and scanned clinical documents.

CRITICAL MEDICAL SAFETY & GROUNDING RULES:
1. NEVER act as an autonomous doctor, never make unsupported claims, and NEVER present an AI-generated possibility as a confirmed diagnosis.
2. Clearly separate information into four distinct categories:
   - CONFIRMED: Values, test names, units, and ranges directly written in the report.
   - POSSIBLE CONDITIONS: Medically grounded differential possibilities or patterns indicated by abnormal values. Must be explicitly phrased as "Possible finding to discuss with doctor", NOT a confirmed diagnosis.
   - AI EXPLANATION: Simple, easy-to-understand plain language explanations of what each test measures and why it is performed.
   - REQUIRES DOCTOR CONFIRMATION: Specific follow-up tests or clinical evaluations only a licensed physician can perform.
3. For PRESCRIPTION MEDICINES:
   - Extract the exact name, purpose, and INSTRUCTIONS EXACTLY AS WRITTEN in the document.
   - Do NOT independently prescribe medicines, change dosage, or invent treatment duration.
   - If dosage or duration is missing, explicitly note: "Consult qualified doctor/pharmacist for exact dosage and duration."
   - Include standard precautions and known potential side effects.
4. DETECT POTENTIALLY URGENT FINDINGS:
   - If any biomarker indicates a potentially life-threatening or urgent state (e.g. extreme hypoglycemia < 50 mg/dL or hyperglycemia > 350 mg/dL, severe anemia Hb < 7 g/dL, severe hyponatremia/hyperkalemia, critical troponin elevation, hypertensive crisis BP >= 180/120 mmHg), flag urgency as "urgent" and provide an urgent medical warning.

Output MUST be valid JSON adhering to this exact schema:
{
  "title": string,
  "date": string,
  "patientName": string (e.g. "Patient" or name if in report),
  "documentType": string (e.g. "Laboratory Report" | "Prescription" | "Discharge Summary" | "General Health Checkup"),
  "urgency": "normal" | "attention_needed" | "urgent",
  "urgencyReason": string (optional explanation if urgent or attention needed),
  "confidenceScore": number (e.g. 0.94),
  "extractedText": string (summary of key extracted raw text),
  "tests": [
    {
      "id": string,
      "name": string,
      "category": string (e.g. "Metabolic", "Lipids", "Complete Blood Count", "Thyroid", "Liver Enzymes", "Kidney Function"),
      "value": string,
      "unit": string,
      "referenceRange": {
        "low": number (optional),
        "high": number (optional),
        "text": string
      },
      "status": "normal" | "low" | "high" | "critical_low" | "critical_high" | "abnormal",
      "aiExplanation": string,
      "clinicalSignificance": string,
      "requiresDoctorReview": boolean
    }
  ],
  "conditions": [
    {
      "id": string,
      "name": string,
      "simpleExplanation": string,
      "commonSymptoms": string[],
      "possibleCauses": string[],
      "severity": "mild" | "moderate" | "elevated" | "urgent",
      "urgencyIndicator": string (e.g. "Routine Follow-up (1-2 weeks)" or "Prompt Consultation (within 48h)"),
      "whenToConsultDoctor": string,
      "confidenceLevel": "high" | "moderate" | "needs_more_data",
      "medicalReferences": string[]
    }
  ],
  "medicines": [
    {
      "id": string,
      "name": string,
      "purpose": string,
      "instructionsExact": string,
      "dosage": string,
      "timing": "morning" | "evening" | "twice_daily" | "thrice_daily" | "bedtime" | "with_food" | "before_food" | "custom",
      "duration": string,
      "precautions": string[],
      "sideEffects": string[],
      "isVerifiedByPrescription": boolean
    }
  ],
  "timeline": [
    {
      "id": string,
      "medicineName": string,
      "timeOfDay": string,
      "mealRelation": string,
      "frequency": string,
      "durationDays": string,
      "followUpDate": string (optional),
      "status": "scheduled"
    }
  ],
  "safetyNotes": string[],
  "doctorQuestions": string[]
}`;

// API Route: Analyze Medical Report via Gemini 3.8 Flash
app.post('/api/analyze-report', async (req, res) => {
  try {
    const { text, fileBase64, mimeType, documentName } = req.body;

    if (!text && !fileBase64) {
      return res.status(400).json({ error: 'Either document text or fileBase64 must be provided' });
    }

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set on server. Using fallback analysis.');
      return res.status(200).json({
        usingFallback: true,
        message: 'No API key configured; client should use intelligent clinical mock engine.',
      });
    }

    const contents: any[] = [];
    const parts: any[] = [];

    if (fileBase64 && mimeType) {
      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: fileBase64,
        },
      });
    }

    const promptText = `Analyze this medical document (${documentName || 'Document'}).
${text ? `Extracted OCR Text:\n"""\n${text}\n"""` : 'Extract all data directly from the attached document.'}

Carefully extract every test, measurement value, units, reference intervals, prescribed drugs, directions, and potential differential conditions.
Remember to strictly respect the JSON output schema without markdown codeblocks or conversational filler.`;

    parts.push({ text: promptText });
    contents.push({ role: 'user', parts });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: MEDICAL_ANALYSIS_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Clean potential JSON markdown wrapper
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({
      success: true,
      report: parsedData,
    });
  } catch (error: any) {
    console.error('Error analyzing medical report with Gemini:', error);
    return res.status(500).json({
      error: error.message || 'Failed to analyze report',
      usingFallback: true,
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    model: 'gemini-3.8-flash',
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PulseDoc iOS Server active at http://localhost:${PORT}`);
  });
}

startServer();
