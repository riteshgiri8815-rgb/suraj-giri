import { MedicalReport } from '../types/medical';

export const SAMPLE_REPORTS: MedicalReport[] = [
  {
    id: 'report-metabolic-lipid-01',
    title: 'Comprehensive Metabolic Panel & Lipid Profile',
    date: '2026-09-15',
    patientName: 'Alex M. (Anonymized)',
    patientAge: 48,
    patientGender: 'Male',
    documentType: 'Laboratory Blood Test',
    urgency: 'attention_needed',
    urgencyReason: 'Elevated Fasting Plasma Glucose (138 mg/dL) and LDL Cholesterol (164 mg/dL) warrant doctor consultation.',
    confidenceScore: 0.96,
    extractedText: `QUEST DIAGNOSTICS - CLINICAL REPORT
Patient: Alex M. | DOB: 1978-04-12 | Specimen ID: Q9402184
Collected: 2026-09-15 07:30 AM | Fasting: YES (10 hours)

TEST NAME                 RESULT    UNITS     REFERENCE INTERVAL    FLAG
------------------------------------------------------------------------
Fasting Glucose           138       mg/dL     70 - 99               HIGH
Hemoglobin A1c (HbA1c)    6.8       %         4.0 - 5.6             HIGH
Total Cholesterol         242       mg/dL     125 - 200             HIGH
HDL Cholesterol           42        mg/dL     > 40                  NORMAL
LDL Cholesterol (Calc)    164       mg/dL     < 100                 HIGH
Triglycerides             180       mg/dL     < 150                 HIGH
Creatinine (Serum)        0.98      mg/dL     0.70 - 1.30           NORMAL
eGFR                      92        mL/min    > 60                  NORMAL
ALT (SGPT)                34        U/L       7 - 56                NORMAL
AST (SGOT)                28        U/L       10 - 40               NORMAL
Potassium                 4.3       mEq/L     3.5 - 5.1             NORMAL
Sodium                    140       mEq/L     135 - 145             NORMAL

PHYSICIAN RECOMMENDATION / RX:
1. Metformin HCl 500 mg: Take 1 tablet orally twice daily with meals (morning and evening). Duration: 90 days.
2. Atorvastatin 20 mg: Take 1 tablet orally once daily at bedtime. Duration: 90 days.
3. Schedule 3-month follow-up for repeat HbA1c and fasting lipid panel.`,
    tests: [
      {
        id: 'test-glu',
        name: 'Fasting Blood Glucose',
        category: 'Metabolic',
        value: '138',
        unit: 'mg/dL',
        referenceRange: { low: 70, high: 99, text: '70 - 99 mg/dL' },
        status: 'high',
        aiExplanation: 'Glucose is the primary sugar your body uses for energy. A fasting test measures blood sugar after not eating overnight.',
        clinicalSignificance: 'Value of 138 mg/dL is above the normal fasting threshold (<100 mg/dL) and within the range commonly associated with diabetes when confirmed by repeated testing.',
        requiresDoctorReview: true,
        historyPoints: [
          { date: '2025-09-10', value: 112 },
          { date: '2026-03-02', value: 124 },
          { date: '2026-09-15', value: 138 }
        ]
      },
      {
        id: 'test-a1c',
        name: 'Hemoglobin A1c (HbA1c)',
        category: 'Metabolic',
        value: '6.8',
        unit: '%',
        referenceRange: { low: 4.0, high: 5.6, text: '4.0 - 5.6 %' },
        status: 'high',
        aiExplanation: 'HbA1c provides an estimate of your average blood glucose levels over the preceding 2 to 3 months.',
        clinicalSignificance: 'An HbA1c of 6.8% is above the prediabetes range (5.7-6.4%) and is indicative of diabetes threshold according to ADA guidelines. Clinical correlation required.',
        requiresDoctorReview: true,
        historyPoints: [
          { date: '2025-09-10', value: 5.9 },
          { date: '2026-03-02', value: 6.3 },
          { date: '2026-09-15', value: 6.8 }
        ]
      },
      {
        id: 'test-ldl',
        name: 'LDL Cholesterol (Calculated)',
        category: 'Lipids',
        value: '164',
        unit: 'mg/dL',
        referenceRange: { low: 0, high: 100, text: '< 100 mg/dL' },
        status: 'high',
        aiExplanation: 'Often called "bad cholesterol", low-density lipoprotein transports fat molecules throughout your artery walls.',
        clinicalSignificance: 'Elevated LDL increases the long-term risk of cardiovascular plaque build-up. Often managed with dietary changes and statin therapy.',
        requiresDoctorReview: true,
        historyPoints: [
          { date: '2025-09-10', value: 148 },
          { date: '2026-03-02', value: 156 },
          { date: '2026-09-15', value: 164 }
        ]
      },
      {
        id: 'test-chol-total',
        name: 'Total Cholesterol',
        category: 'Lipids',
        value: '242',
        unit: 'mg/dL',
        referenceRange: { low: 125, high: 200, text: '125 - 200 mg/dL' },
        status: 'high',
        aiExplanation: 'The sum of all cholesterol types circulating in the bloodstream.',
        clinicalSignificance: 'Desirable level is below 200 mg/dL. Elevated along with LDL.',
        requiresDoctorReview: false
      },
      {
        id: 'test-trig',
        name: 'Triglycerides',
        category: 'Lipids',
        value: '180',
        unit: 'mg/dL',
        referenceRange: { low: 0, high: 150, text: '< 150 mg/dL' },
        status: 'high',
        aiExplanation: 'Triglycerides are the most common type of fat in the body, derived from dietary calories not immediately burned.',
        clinicalSignificance: 'Borderline elevated (150-199 mg/dL). Common in metabolic syndrome or elevated carbohydrate intake.',
        requiresDoctorReview: false
      },
      {
        id: 'test-hdl',
        name: 'HDL Cholesterol',
        category: 'Lipids',
        value: '42',
        unit: 'mg/dL',
        referenceRange: { low: 40, high: 100, text: '> 40 mg/dL' },
        status: 'normal',
        aiExplanation: '"Good cholesterol" helps scavenge excess fat from arteries back to the liver for excretion.',
        clinicalSignificance: 'Within acceptable male reference range (>40 mg/dL), though higher levels (>50 mg/dL) offer enhanced protection.',
        requiresDoctorReview: false
      },
      {
        id: 'test-creat',
        name: 'Creatinine (Serum)',
        category: 'Liver & Kidney',
        value: '0.98',
        unit: 'mg/dL',
        referenceRange: { low: 0.70, high: 1.30, text: '0.70 - 1.30 mg/dL' },
        status: 'normal',
        aiExplanation: 'A waste byproduct of normal muscle wear and tear filtered out by healthy kidneys.',
        clinicalSignificance: 'Normal kidney filtration function indicated.',
        requiresDoctorReview: false
      },
      {
        id: 'test-egfr',
        name: 'eGFR (Kidney Filtration Rate)',
        category: 'Liver & Kidney',
        value: '92',
        unit: 'mL/min',
        referenceRange: { low: 60, high: 120, text: '> 60 mL/min' },
        status: 'normal',
        aiExplanation: 'Estimated Glomerular Filtration Rate calculates how efficiently kidneys filter waste from blood.',
        clinicalSignificance: 'Optimal kidney function (Stage 1 / Normal).',
        requiresDoctorReview: false
      },
      {
        id: 'test-alt',
        name: 'ALT (Alanine Aminotransferase)',
        category: 'Liver & Kidney',
        value: '34',
        unit: 'U/L',
        referenceRange: { low: 7, high: 56, text: '7 - 56 U/L' },
        status: 'normal',
        aiExplanation: 'An enzyme found mainly inside liver cells that helps process protein into cellular energy.',
        clinicalSignificance: 'Normal, showing no acute hepatocellular liver stress.',
        requiresDoctorReview: false
      }
    ],
    conditions: [
      {
        id: 'cond-t2d',
        name: 'Type 2 Diabetes / Impaired Glucose Tolerance',
        simpleExplanation: 'A metabolic condition where the body develops resistance to insulin, causing glucose levels to accumulate in the bloodstream rather than fueling cells.',
        commonSymptoms: [
          'Increased thirst (polydipsia)',
          'Frequent urination, especially at night',
          'Fatigue or sluggishness after meals',
          'Mild blurred vision',
          'Slow healing of small scratches'
        ],
        possibleCauses: [
          'Insulin resistance in muscle and liver tissues',
          'Sedentary lifestyle or dietary refined carbohydrates',
          'Genetic predisposition / family history',
          'Excess visceral adiposity'
        ],
        severity: 'moderate',
        urgencyIndicator: 'Doctor Consultation Recommended (within 1-2 weeks)',
        whenToConsultDoctor: 'Schedule an appointment within 1 to 2 weeks to discuss a confirmatory repeat test and diabetes self-management plan. Seek immediate care if experiencing extreme nausea, confusion, or rapid breathing.',
        confidenceLevel: 'high',
        medicalReferences: [
          'American Diabetes Association (ADA) Standards of Care in Diabetes — 2024',
          'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)'
        ],
        associatedLabTests: ['Fasting Blood Glucose', 'Hemoglobin A1c (HbA1c)']
      },
      {
        id: 'cond-hyperlipidemia',
        name: 'Mixed Hyperlipidemia / Dyslipidemia',
        simpleExplanation: 'An elevated level of atherogenic lipids (specifically LDL and triglycerides) in circulating blood.',
        commonSymptoms: [
          'Typically asymptomatic in early and moderate stages ("silent")',
          'Chest heaviness during high exertion (if advanced coronary disease)'
        ],
        possibleCauses: [
          'Diet high in saturated fats and refined sugars',
          'Familial hypercholesterolemia gene variants',
          'Metabolic syndrome co-occurrence'
        ],
        severity: 'moderate',
        urgencyIndicator: 'Routine Follow-up (Next doctor visit)',
        whenToConsultDoctor: 'Discuss cardiovascular risk calculation (ASCVD 10-year score) and lipid-lowering therapy response with your doctor at your next scheduled visit.',
        confidenceLevel: 'high',
        medicalReferences: [
          'AHA/ACC 2018 Guideline on the Management of Blood Cholesterol',
          'Endocrine Society Clinical Practice Guidelines'
        ],
        associatedLabTests: ['LDL Cholesterol (Calculated)', 'Total Cholesterol', 'Triglycerides']
      }
    ],
    medicines: [
      {
        id: 'med-metformin',
        name: 'Metformin HCl',
        purpose: 'Improves hepatic insulin sensitivity and lowers intestinal absorption of glucose.',
        instructionsExact: 'Take 1 tablet orally twice daily with meals (morning and evening).',
        dosage: '500 mg',
        timing: 'twice_daily',
        duration: '90 days (Refills: 3)',
        precautions: [
          'Always take with food to minimize mild stomach upset or nausea.',
          'Avoid heavy consumption of alcohol while on this medication.',
          'Inform your doctor if undergoing radiological scans using iodinated contrast dye.'
        ],
        sideEffects: [
          'Mild nausea or diarrhea during initial 1-2 weeks',
          'Metallic taste in mouth',
          'Abdominal cramping'
        ],
        isVerifiedByPrescription: true,
        color: '#3B82F6'
      },
      {
        id: 'med-atorvastatin',
        name: 'Atorvastatin Calcium',
        purpose: 'HMG-CoA reductase inhibitor that suppresses liver synthesis of bad cholesterol (LDL).',
        instructionsExact: 'Take 1 tablet orally once daily at bedtime.',
        dosage: '20 mg',
        timing: 'bedtime',
        duration: '90 days (Refills: 3)',
        precautions: [
          'Avoid excessive consumption of grapefruit or grapefruit juice.',
          'Report unexplained muscle tenderness, aching, or weakness to your doctor promptly.',
          'Contraindicated during pregnancy or nursing.'
        ],
        sideEffects: [
          'Mild headache',
          'Occasional muscle soreness or joint aches',
          'Digestive changes'
        ],
        isVerifiedByPrescription: true,
        color: '#10B981'
      }
    ],
    timeline: [
      {
        id: 'time-met-am',
        medicineName: 'Metformin HCl 500 mg',
        timeOfDay: '08:00 AM',
        mealRelation: 'With breakfast',
        frequency: 'Daily',
        durationDays: '90 days',
        status: 'scheduled'
      },
      {
        id: 'time-met-pm',
        medicineName: 'Metformin HCl 500 mg',
        timeOfDay: '07:30 PM',
        mealRelation: 'With dinner',
        frequency: 'Daily',
        durationDays: '90 days',
        status: 'scheduled'
      },
      {
        id: 'time-ator-night',
        medicineName: 'Atorvastatin 20 mg',
        timeOfDay: '10:00 PM',
        mealRelation: 'At bedtime with glass of water',
        frequency: 'Nightly',
        durationDays: '90 days',
        followUpDate: '2026-12-15',
        status: 'scheduled'
      }
    ],
    safetyNotes: [
      'PulseDoc analysis is intended exclusively as an educational summary and report-understanding aid.',
      'Only a licensed physician can formally diagnose Type 2 Diabetes or prescribe therapeutic adjustments.',
      'Do not discontinue Metformin or Atorvastatin without direct guidance from your prescribing doctor.'
    ],
    doctorQuestions: [
      'Should we repeat the fasting glucose and HbA1c to formally confirm the diagnosis?',
      'Would home blood glucose monitoring (glucometer or CGM) be beneficial for me?',
      'What dietary modifications (carbohydrate budgeting) do you suggest before our next checkup?',
      'When should we check liver enzymes (ALT/AST) after starting Atorvastatin 20mg?'
    ]
  },
  {
    id: 'report-cardiac-urgent-02',
    title: 'Cardiology Assessment & Urgent Hypertension Panel',
    date: '2026-09-24',
    patientName: 'Eleanor R.',
    patientAge: 62,
    patientGender: 'Female',
    documentType: 'Clinical Consultation & Labs',
    urgency: 'urgent',
    urgencyReason: 'Severely elevated Systolic Blood Pressure (178/104 mmHg) and Elevated hs-CRP require immediate physician evaluation.',
    confidenceScore: 0.94,
    extractedText: `CARDIOVASCULAR HEALTH ASSOCIATES
Patient: Eleanor R. | Age: 62 | Visit Date: 2026-09-24
Presenting Complaint: Intermittent morning headache, mild palpitations.

VITALS:
Blood Pressure: 178/104 mmHg (CRITICAL HIGH) | Heart Rate: 88 bpm | SpO2: 98%

LAB TESTS:
High-Sensitivity CRP (hs-CRP)     4.8 mg/L      Ref: < 1.0 (HIGH RISK)
Potassium (Serum)                3.7 mEq/L     Ref: 3.5 - 5.0 (NORMAL)
Sodium (Serum)                   138 mEq/L     Ref: 135 - 145 (NORMAL)
Serum Creatinine                 1.12 mg/dL    Ref: 0.60 - 1.10 (BORDERLINE HIGH)
BNP (B-Type Natriuretic)         68 pg/mL      Ref: < 100 (NORMAL)

RX PRESCRIBED:
1. Amlodipine Besylate 5 mg: 1 tablet daily every morning.
2. Lisinopril 10 mg: 1 tablet daily every morning.
Warning: If BP exceeds 180 systolic or symptoms like chest pressure appear, seek emergency room immediately.`,
    tests: [
      {
        id: 'test-bp',
        name: 'Blood Pressure (Sitting)',
        category: 'Cardiovascular',
        value: '178/104',
        unit: 'mmHg',
        referenceRange: { text: '< 120/80 mmHg' },
        status: 'critical_high',
        aiExplanation: 'Measures the pressure circulating blood exerts against the walls of blood vessels.',
        clinicalSignificance: 'Stage 2 Hypertension bordering on Hypertensive Crisis. Extremely high vascular tension puts urgent stress on coronary and cerebral blood vessels.',
        requiresDoctorReview: true
      },
      {
        id: 'test-crp',
        name: 'High-Sensitivity CRP (hs-CRP)',
        category: 'Cardiovascular',
        value: '4.8',
        unit: 'mg/L',
        referenceRange: { low: 0, high: 1.0, text: '< 1.0 mg/L' },
        status: 'high',
        aiExplanation: 'An acute-phase inflammatory marker synthesized by the liver in response to cytokines.',
        clinicalSignificance: 'Levels > 3.0 mg/L reflect high relative risk for future cardiovascular events due to systemic vascular inflammation.',
        requiresDoctorReview: true
      },
      {
        id: 'test-creat-card',
        name: 'Serum Creatinine',
        category: 'Liver & Kidney',
        value: '1.12',
        unit: 'mg/dL',
        referenceRange: { low: 0.60, high: 1.10, text: '0.60 - 1.10 mg/dL' },
        status: 'high',
        aiExplanation: 'Waste product cleared by kidney nephrons.',
        clinicalSignificance: 'Slightly elevated; persistent high blood pressure can gradually diminish kidney microvascular flow.',
        requiresDoctorReview: true
      }
    ],
    conditions: [
      {
        id: 'cond-htn',
        name: 'Severe Stage 2 Hypertension / Hypertensive Urgency Risk',
        simpleExplanation: 'Significantly elevated arterial blood pressure that requires prompt clinical intervention to prevent end-organ strain.',
        commonSymptoms: [
          'Dull morning headaches',
          'Facial flushing or sensation of heat',
          'Noticeable pounding or palpitations in chest or neck',
          'Occasional dizziness upon standing'
        ],
        possibleCauses: [
          'Essential hypertension with vascular stiffening',
          'High dietary sodium intake',
          'Renal artery stenosis or secondary endocrine causes'
        ],
        severity: 'urgent',
        urgencyIndicator: 'Seek Medical Review within 24 Hours (Immediate ER if chest pain)',
        whenToConsultDoctor: 'Contact your prescribing physician within 24 hours. IF you develop chest tightness, shortness of breath, numbness, speech changes, or severe vision loss, call 911 immediately.',
        confidenceLevel: 'high',
        medicalReferences: [
          'AHA/ACC High Blood Pressure Clinical Practice Guidelines',
          'European Society of Cardiology (ESC) Guidelines'
        ],
        associatedLabTests: ['Blood Pressure (Sitting)', 'High-Sensitivity CRP (hs-CRP)']
      }
    ],
    medicines: [
      {
        id: 'med-amlo',
        name: 'Amlodipine Besylate',
        purpose: 'Calcium channel blocker that relaxes and widens peripheral arterial blood vessels.',
        instructionsExact: 'Take 1 tablet orally once daily in the morning with water.',
        dosage: '5 mg',
        timing: 'morning',
        duration: '30 days initial trial',
        precautions: [
          'Monitor blood pressure daily at the same time each morning.',
          'Stand up slowly from reclining positions to avoid lightheadedness.'
        ],
        sideEffects: [
          'Mild ankle or foot swelling (peripheral edema)',
          'Flushing or warmth',
          'Dizziness'
        ],
        isVerifiedByPrescription: true,
        color: '#EF4444'
      },
      {
        id: 'med-lisin',
        name: 'Lisinopril',
        purpose: 'ACE inhibitor that prevents conversion of angiotensin I to II, relaxing blood vessels.',
        instructionsExact: 'Take 1 tablet orally once daily in the morning.',
        dosage: '10 mg',
        timing: 'morning',
        duration: '30 days',
        precautions: [
          'Do not take potassium supplements without consulting doctor.',
          'Notify doctor if you experience persistent dry tickling cough or lip swelling.'
        ],
        sideEffects: [
          'Dry persistent cough (common class effect)',
          'Mild dizziness',
          'Slight elevation in serum potassium'
        ],
        isVerifiedByPrescription: true,
        color: '#F59E0B'
      }
    ],
    timeline: [
      {
        id: 'time-amlo-am',
        medicineName: 'Amlodipine 5 mg + Lisinopril 10 mg',
        timeOfDay: '08:30 AM',
        mealRelation: 'Morning after glass of water',
        frequency: 'Daily',
        durationDays: '30 days',
        followUpDate: '2026-10-01',
        status: 'scheduled'
      }
    ],
    safetyNotes: [
      'CRITICAL: Blood pressure over 180/120 mmHg with headache or chest discomfort is a medical emergency.',
      'PulseDoc cannot replace emergency medical dispatchers or on-call emergency room physicians.'
    ],
    doctorQuestions: [
      'How frequently should I log my home blood pressure cuff readings?',
      'What specific systolic reading should trigger an immediate call or emergency room visit?',
      'Should we check serum electrolytes (potassium) 2 weeks after starting Lisinopril?'
    ]
  },
  {
    id: 'report-cbc-anemia-03',
    title: 'Complete Blood Count (CBC) with Iron Deficiency',
    date: '2026-09-02',
    patientName: 'Sarah K.',
    patientAge: 34,
    patientGender: 'Female',
    documentType: 'Hematology Panel',
    urgency: 'attention_needed',
    urgencyReason: 'Low Hemoglobin (9.2 g/dL) and Serum Ferritin (7 ng/mL) suggest Microcytic Anemia.',
    confidenceScore: 0.95,
    extractedText: `LABCORP - HEMATOLOGY REPORT
Patient: Sarah K. | Age: 34 | Female
Physician: Dr. T. Henderson, MD

TEST                      RESULT    UNITS     REFERENCE RANGE     FLAG
----------------------------------------------------------------------
White Blood Cell (WBC)    6.4       x10^3/uL  4.5 - 11.0          NORMAL
Red Blood Cell (RBC)      3.6       x10^6/uL  4.0 - 5.2           LOW
Hemoglobin                9.2       g/dL      12.0 - 16.0         LOW
Hematocrit                28.4      %         37.0 - 47.0         LOW
MCV                       71.2      fL        80.0 - 100.0        LOW
MCH                       23.1      pg        27.0 - 33.0         LOW
RDW                       17.8      %         11.5 - 14.5         HIGH
Platelets                 320       x10^3/uL  150 - 450           NORMAL
Ferritin (Serum)          7         ng/mL     15 - 150            LOW
Iron (Total Serum)        34        ug/dL     50 - 170            LOW

RX / Clinical Note:
Ferrous Sulfate 325 mg (65 mg elemental iron): Take 1 tablet daily with citrus juice on empty stomach. Continue for 90 days. Repeat CBC in 8 weeks.`,
    tests: [
      {
        id: 'test-hgb',
        name: 'Hemoglobin',
        category: 'CBC',
        value: '9.2',
        unit: 'g/dL',
        referenceRange: { low: 12.0, high: 16.0, text: '12.0 - 16.0 g/dL' },
        status: 'low',
        aiExplanation: 'The iron-rich protein in red blood cells that carries vital oxygen from your lungs to tissues all throughout your body.',
        clinicalSignificance: 'Significantly lower than normal range for adult women. Reduces oxygen-delivery capacity to muscles and brain.',
        requiresDoctorReview: true,
        historyPoints: [
          { date: '2025-05-10', value: 11.4 },
          { date: '2026-01-14', value: 10.1 },
          { date: '2026-09-02', value: 9.2 }
        ]
      },
      {
        id: 'test-ferritin',
        name: 'Serum Ferritin',
        category: 'CBC',
        value: '7',
        unit: 'ng/mL',
        referenceRange: { low: 15, high: 150, text: '15 - 150 ng/mL' },
        status: 'low',
        aiExplanation: 'Reflects the total stored iron reserves held inside bone marrow, liver, and spleen.',
        clinicalSignificance: 'Very depleted iron reserves (<15 ng/mL is the clinical hallmark of true iron deficiency).',
        requiresDoctorReview: true
      },
      {
        id: 'test-mcv',
        name: 'MCV (Mean Corpuscular Volume)',
        category: 'CBC',
        value: '71.2',
        unit: 'fL',
        referenceRange: { low: 80.0, high: 100.0, text: '80.0 - 100.0 fL' },
        status: 'low',
        aiExplanation: 'Calculates the average physical size of your individual red blood cells.',
        clinicalSignificance: 'Microcytic (small cells) typical when lack of iron restricts hemoglobin synthesis.',
        requiresDoctorReview: false
      }
    ],
    conditions: [
      {
        id: 'cond-ida',
        name: 'Microcytic Hypochromic Iron Deficiency Anemia',
        simpleExplanation: 'A condition where the body lacks sufficient iron to manufacture enough hemoglobin, leading to smaller, paler red blood cells that carry less oxygen.',
        commonSymptoms: [
          'Chronic fatigue and low physical endurance',
          'Pale skin, nailbeds, or inner eyelids',
          'Cold intolerance (frequently cold hands and feet)',
          'Brittle nails or hair thinning',
          'Shortness of breath climbing stairs'
        ],
        possibleCauses: [
          'Heavy menstrual blood loss (menorrhagia)',
          'Inadequate dietary intake or absorption (e.g. celiac disease)',
          'Occult gastrointestinal blood loss'
        ],
        severity: 'moderate',
        urgencyIndicator: 'Doctor Review Recommended (within 1-2 weeks)',
        whenToConsultDoctor: 'Schedule an appointment to identify the root cause of the iron depletion (e.g. gynecological evaluation or GI screening) rather than only taking supplements.',
        confidenceLevel: 'high',
        medicalReferences: [
          'American Society of Hematology (ASH) Iron Deficiency Guidelines',
          'WHO Guideline on Iron Supplementation'
        ],
        associatedLabTests: ['Hemoglobin', 'Serum Ferritin', 'MCV (Mean Corpuscular Volume)']
      }
    ],
    medicines: [
      {
        id: 'med-iron',
        name: 'Ferrous Sulfate',
        purpose: 'Replenishes depleted systemic iron stores to facilitate erythropoiesis (red cell production).',
        instructionsExact: 'Take 1 tablet daily with citrus juice on empty stomach.',
        dosage: '325 mg (65 mg elemental iron)',
        timing: 'morning',
        duration: '90 days',
        precautions: [
          'Do not take within 2 hours of calcium supplements, antacids, dairy, tea, or coffee.',
          'Vitamin C (citrus juice) enhances absorption.',
          'Keep out of reach of young children (iron toxicity is hazardous to toddlers).'
        ],
        sideEffects: [
          'Dark or black colored stools (normal and harmless)',
          'Constipation (increase fiber and hydration)',
          'Mild stomach cramping'
        ],
        isVerifiedByPrescription: true,
        color: '#8B5CF6'
      }
    ],
    timeline: [
      {
        id: 'time-iron-am',
        medicineName: 'Ferrous Sulfate 325 mg',
        timeOfDay: '07:30 AM',
        mealRelation: '30 mins before breakfast with orange juice',
        frequency: 'Daily',
        durationDays: '90 days',
        followUpDate: '2026-10-28',
        status: 'scheduled'
      }
    ],
    safetyNotes: [
      'Iron deficiency requires identifying the source of blood or iron loss, not just taking supplements.',
      'Never exceed recommended iron dosage; iron overload can damage internal organs.'
    ],
    doctorQuestions: [
      'Should we investigate underlying reasons for iron loss (such as GI or menstrual bleeding)?',
      'If I experience constipation from oral iron, is an alternate formulation or alternate-day dosing appropriate?',
      'When should we recheck my CBC and ferritin to confirm reticulocyte response?'
    ]
  },
  {
    id: 'report-thyroid-04',
    title: 'Endocrine & Thyroid Function Panel',
    date: '2026-08-18',
    patientName: 'David W.',
    patientAge: 51,
    patientGender: 'Male',
    documentType: 'Endocrinology Report',
    urgency: 'attention_needed',
    urgencyReason: 'Elevated TSH (7.8 uIU/mL) with Borderline Low Free T4 indicates Subclinical/Primary Hypothyroidism.',
    confidenceScore: 0.97,
    extractedText: `ENDOCRINOLOGY SPECIALISTS CLINICAL LAB
Patient: David W. | Age: 51 | Male
Ref Doctor: Dr. C. Martinez

TEST NAME                     RESULT    UNITS     REFERENCE INTERVAL    FLAG
----------------------------------------------------------------------------
TSH (Thyroid Stimulating)     7.8       uIU/mL    0.45 - 4.50           HIGH
Free T4 (Thyroxine)           0.78      ng/dL     0.82 - 1.77           LOW
Free T3 (Triiodothyronine)    2.5       pg/mL     2.0 - 4.4             NORMAL
Thyroid Peroxidase Ab (TPO)   84        IU/mL     < 35                  HIGH

PRESCRIPTION:
Levothyroxine Sodium 50 mcg: Take 1 tablet by mouth daily in the morning on an empty stomach with a full glass of water, at least 30 to 60 minutes before breakfast. Recheck TSH in 6 to 8 weeks.`,
    tests: [
      {
        id: 'test-tsh',
        name: 'TSH (Thyroid Stimulating Hormone)',
        category: 'Thyroid',
        value: '7.8',
        unit: 'uIU/mL',
        referenceRange: { low: 0.45, high: 4.50, text: '0.45 - 4.50 uIU/mL' },
        status: 'high',
        aiExplanation: 'Hormone produced by pituitary gland instructing the thyroid to produce thyroxine (T4). When thyroid is underactive, pituitary pumps out more TSH.',
        clinicalSignificance: 'Elevated TSH indicates the thyroid gland is sluggish in producing sufficient thyroid hormone.',
        requiresDoctorReview: true,
        historyPoints: [
          { date: '2025-08-10', value: 4.2 },
          { date: '2026-02-14', value: 5.9 },
          { date: '2026-08-18', value: 7.8 }
        ]
      },
      {
        id: 'test-ft4',
        name: 'Free T4 (Thyroxine)',
        category: 'Thyroid',
        value: '0.78',
        unit: 'ng/dL',
        referenceRange: { low: 0.82, high: 1.77, text: '0.82 - 1.77 ng/dL' },
        status: 'low',
        aiExplanation: 'The active circulating form of thyroxine hormone that regulates systemic basal metabolic rate.',
        clinicalSignificance: 'Slightly low, explaining feelings of cold intolerance and sluggish energy.',
        requiresDoctorReview: true
      },
      {
        id: 'test-tpo',
        name: 'Thyroid Peroxidase Antibodies (TPO)',
        category: 'Thyroid',
        value: '84',
        unit: 'IU/mL',
        referenceRange: { low: 0, high: 35, text: '< 35 IU/mL' },
        status: 'high',
        aiExplanation: 'Antibodies that mistakenly target an enzyme involved in thyroid hormone synthesis.',
        clinicalSignificance: 'Positive antibodies support an autoimmune etiology such as Hashimoto thyroiditis.',
        requiresDoctorReview: true
      }
    ],
    conditions: [
      {
        id: 'cond-hypothyroid',
        name: 'Primary Hypothyroidism / Autoimmune Thyroiditis (Hashimoto)',
        simpleExplanation: 'An underactive thyroid gland producing inadequate thyroid hormone to sustain peak metabolic pace.',
        commonSymptoms: [
          'Unexplained weight gain or difficulty losing weight',
          'Persistent fatigue and muscle weakness',
          'Increased sensitivity to cold temperatures',
          'Dry skin and brittle fingernails',
          'Brain fog or memory lapses'
        ],
        possibleCauses: [
          'Autoimmune thyroiditis (Hashimoto disease)',
          'Genetic predisposition',
          'Post-viral thyroid inflammation'
        ],
        severity: 'moderate',
        urgencyIndicator: 'Doctor Visit Recommended (within 2 weeks)',
        whenToConsultDoctor: 'Follow up with your prescribing endocrinologist or primary doctor to confirm medication titration.',
        confidenceLevel: 'high',
        medicalReferences: [
          'American Thyroid Association (ATA) Hypothyroidism Guidelines',
          'American Association of Clinical Endocrinologists (AACE)'
        ],
        associatedLabTests: ['TSH (Thyroid Stimulating Hormone)', 'Free T4 (Thyroxine)', 'Thyroid Peroxidase Antibodies (TPO)']
      }
    ],
    medicines: [
      {
        id: 'med-levo',
        name: 'Levothyroxine Sodium',
        purpose: 'Synthetic isomer of thyroxine (T4) that restores physiological thyroid hormone concentrations.',
        instructionsExact: 'Take 1 tablet by mouth daily in the morning on an empty stomach with a full glass of water, at least 30 to 60 minutes before breakfast.',
        dosage: '50 mcg',
        timing: 'morning',
        duration: 'Continuous / Repeat TSH in 8 weeks',
        precautions: [
          'Must be taken strictly on an empty stomach with plain water only.',
          'Wait at least 30 to 60 minutes before eating breakfast or drinking coffee.',
          'Keep at least 4 hours apart from calcium supplements, iron pills, or antacids.'
        ],
        sideEffects: [
          'Palpitations or rapid heart rate if dose is too high',
          'Insomnia or nervousness if over-replaced',
          'Mild sweating'
        ],
        isVerifiedByPrescription: true,
        color: '#EC4899'
      }
    ],
    timeline: [
      {
        id: 'time-levo-am',
        medicineName: 'Levothyroxine 50 mcg',
        timeOfDay: '06:30 AM',
        mealRelation: 'Empty stomach with water, 45 min before breakfast',
        frequency: 'Daily',
        durationDays: '60 days',
        followUpDate: '2026-10-15',
        status: 'scheduled'
      }
    ],
    safetyNotes: [
      'Levothyroxine dosage is highly sensitive; do not change brands or dosage without lab confirmation.',
      'PulseDoc cannot calibrate hormone dosages.'
    ],
    doctorQuestions: [
      'Is 50 mcg an appropriate initial starting dose given my body weight?',
      'Should we retest TSH in 6 weeks or 8 weeks to determine steady-state concentration?',
      'Are there specific foods (like soy or dietary fiber) that might interfere with absorption?'
    ]
  }
];
