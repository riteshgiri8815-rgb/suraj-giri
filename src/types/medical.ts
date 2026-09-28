export type UrgencyLevel = 'normal' | 'attention_needed' | 'urgent';

export type BiomarkerStatus = 'normal' | 'low' | 'high' | 'critical_low' | 'critical_high' | 'abnormal';

export interface ReferenceRange {
  low?: number;
  high?: number;
  text: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  value: string | number;
  unit: string;
  referenceRange: ReferenceRange;
  status: BiomarkerStatus;
  aiExplanation: string;
  clinicalSignificance: string;
  requiresDoctorReview: boolean;
  historyPoints?: { date: string; value: number }[];
}

export interface PossibleCondition {
  id: string;
  name: string;
  simpleExplanation: string;
  commonSymptoms: string[];
  possibleCauses: string[];
  severity: 'mild' | 'moderate' | 'elevated' | 'urgent';
  urgencyIndicator: string; // e.g. "Follow-up in 1-2 weeks" or "Urgent consultation"
  whenToConsultDoctor: string;
  confidenceLevel: 'high' | 'moderate' | 'needs_more_data';
  medicalReferences: string[];
  associatedLabTests?: string[];
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  purpose: string;
  instructionsExact: string; // Verbatim quote from the report
  dosage: string;
  timing: 'morning' | 'evening' | 'twice_daily' | 'thrice_daily' | 'bedtime' | 'with_food' | 'before_food' | 'custom';
  duration: string;
  precautions: string[];
  sideEffects: string[];
  isVerifiedByPrescription: boolean;
  color?: string;
  takenToday?: boolean;
}

export interface TreatmentTimelineEvent {
  id: string;
  medicineName: string;
  timeOfDay: string; // e.g. "08:00 AM", "01:00 PM", "08:00 PM"
  mealRelation: string; // e.g. "With breakfast", "After dinner"
  frequency: string; // e.g. "Daily", "Twice daily"
  durationDays: string; // e.g. "30 days"
  followUpDate?: string;
  status: 'scheduled' | 'taken' | 'skipped';
}

export interface MedicalReport {
  id: string;
  title: string;
  date: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  documentType: string;
  urgency: UrgencyLevel;
  urgencyReason?: string;
  confidenceScore: number; // 0.0 - 1.0
  extractedText: string;
  tests: LabTest[];
  conditions: PossibleCondition[];
  medicines: PrescriptionMedicine[];
  timeline: TreatmentTimelineEvent[];
  safetyNotes: string[];
  doctorQuestions: string[];
  isSample?: boolean;
  rawFileName?: string;
  fileSizeBytes?: number;
}

export type ActiveTab = 'home' | 'upload' | 'analysis' | 'diseases' | 'medicines' | 'timeline' | 'history' | 'settings';

export type CategoryFilter = 'All' | 'Abnormal' | 'Metabolic' | 'Lipids' | 'CBC' | 'Thyroid' | 'Liver & Kidney';

export type SafetyTierType = 'confirmed' | 'possible' | 'ai_explanation' | 'doctor_required';
