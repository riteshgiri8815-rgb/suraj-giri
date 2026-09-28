import React, { useState } from 'react';
import {
  HeartPulse,
  AlertTriangle,
  Clock,
  BookOpen,
  HelpCircle,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { MedicalReport, PossibleCondition } from '../../types/medical';

interface DiseasesTabProps {
  report: MedicalReport;
  onOpenDoctorQuestions: () => void;
}

export const DiseasesTab: React.FC<DiseasesTabProps> = ({
  report,
  onOpenDoctorQuestions,
}) => {
  const [expandedConditionId, setExpandedConditionId] = useState<string | null>(
    report.conditions[0]?.id || null
  );

  const toggleExpand = (id: string) => {
    setExpandedConditionId(expandedConditionId === id ? null : id);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="pt-1">
        <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 tracking-wider uppercase font-mono">
          Differential Patterns
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Possible Conditions
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Medically plausible patterns based on your report. AI-generated possibilities are never confirmed diagnoses.
        </p>
      </div>

      {/* Safety Boundary Notice */}
      <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/40 rounded-3xl text-xs text-purple-900 dark:text-purple-200 flex items-start space-x-2.5">
        <HelpCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Not a Diagnostic Decision:</span>{' '}
          These conditions represent statistical patterns commonly correlated with the extracted abnormal test values. A licensed clinician must correlate your medical history, physical examination, and repeated labs before establishing any diagnosis.
        </div>
      </div>

      {/* Conditions list */}
      <div className="space-y-3.5">
        {report.conditions.length === 0 ? (
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 text-center text-xs text-neutral-400 border border-neutral-200/80 dark:border-neutral-800">
            No possible conditions identified. All primary biomarkers appear within normal reference limits.
          </div>
        ) : (
          report.conditions.map((condition) => {
            const isExpanded = expandedConditionId === condition.id;
            const isUrgent = condition.severity === 'urgent';

            return (
              <div
                key={condition.id}
                className={`bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border transition-all duration-200 shadow-xs ${
                  isUrgent
                    ? 'border-red-400/50 ring-1 ring-red-500/20'
                    : 'border-neutral-200/80 dark:border-neutral-800'
                }`}
              >
                {/* Condition header */}
                <div
                  onClick={() => toggleExpand(condition.id)}
                  className="flex items-start justify-between cursor-pointer"
                >
                  <div className="space-y-1 max-w-[75%]">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/40 px-2 py-0.5 rounded-md font-mono">
                        Potential Differential
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          condition.severity === 'urgent'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : condition.severity === 'moderate'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {condition.severity} severity
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-neutral-900 dark:text-white leading-snug pt-1">
                      {condition.name}
                    </h3>
                  </div>

                  <button className="p-1 rounded-full text-neutral-400 hover:text-neutral-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Simple explanation */}
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-2.5">
                  {condition.simpleExplanation}
                </p>

                {/* Urgency / Consultation Guidance Pill */}
                <div className="mt-3 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl flex items-center space-x-2.5 text-xs">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">Recommended Timeline:</span>{' '}
                    <span className="text-neutral-600 dark:text-neutral-400">{condition.urgencyIndicator}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4 text-xs">
                    {/* Common Symptoms */}
                    <div className="space-y-1.5">
                      <div className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center space-x-1.5 text-xs">
                        <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                        <span>Common Symptoms:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {condition.commonSymptoms.map((sym, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2 p-2 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl text-[11px] text-neutral-600 dark:text-neutral-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                            <span>{sym}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Possible Causes & Risk Factors */}
                    <div className="space-y-1.5">
                      <div className="font-bold text-neutral-800 dark:text-neutral-200 text-xs">
                        Possible Causes & Risk Factors:
                      </div>
                      <ul className="space-y-1">
                        {condition.possibleCauses.map((cause, i) => (
                          <li
                            key={i}
                            className="text-[11px] text-neutral-600 dark:text-neutral-300 flex items-start space-x-2"
                          >
                            <span className="text-neutral-400">•</span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* When to Consult Doctor */}
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-2xl space-y-1">
                      <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>When to Consult a Doctor:</span>
                      </div>
                      <p className="text-[11px] text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                        {condition.whenToConsultDoctor}
                      </p>
                    </div>

                    {/* Medical References / Sources */}
                    {condition.medicalReferences && condition.medicalReferences.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <div className="font-bold text-neutral-500 uppercase tracking-wider text-[10px] flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>Medical Reference Guidelines:</span>
                        </div>
                        <div className="space-y-1">
                          {condition.medicalReferences.map((ref, idx) => (
                            <div
                              key={idx}
                              className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono bg-neutral-50 dark:bg-neutral-800/40 px-2.5 py-1 rounded-lg"
                            >
                              {ref}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
