import React, { useState } from 'react';
import {
  Pill,
  Clock,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { MedicalReport, PrescriptionMedicine } from '../../types/medical';
import confetti from 'canvas-confetti';

interface MedicinesTabProps {
  report: MedicalReport;
  onNavigateToTimeline: () => void;
}

export const MedicinesTab: React.FC<MedicinesTabProps> = ({
  report,
  onNavigateToTimeline,
}) => {
  const [takenStatus, setTakenStatus] = useState<Record<string, boolean>>({});
  const [expandedMedId, setExpandedMedId] = useState<string | null>(
    report.medicines[0]?.id || null
  );

  const toggleTaken = (id: string) => {
    const nextVal = !takenStatus[id];
    setTakenStatus((prev) => ({ ...prev, [id]: nextVal }));
    if (nextVal) {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 },
      });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedMedId(expandedMedId === id ? null : id);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="pt-1">
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase font-mono">
          Prescription Extraction
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Prescribed Medicines
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Extracted directly from doctor prescription. Dosages and timings reflect exact text verbatim.
        </p>
      </div>

      {/* Strict Clinical Safety Notice */}
      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-3xl text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Prescription Safety Guard:</span> PulseDoc does NOT prescribe medications, alter prescribed doses, or invent treatment duration. If dosage or timing is unclear on your paper prescription, consult your prescribing physician or licensed pharmacist directly.
        </div>
      </div>

      {/* Medicines list */}
      <div className="space-y-3.5">
        {report.medicines.length === 0 ? (
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 text-center text-xs text-neutral-400 border border-neutral-200/80 dark:border-neutral-800">
            No prescription medicines detected in this document.
          </div>
        ) : (
          report.medicines.map((med) => {
            const isTaken = Boolean(takenStatus[med.id]);
            const isExpanded = expandedMedId === med.id;

            return (
              <div
                key={med.id}
                className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800 transition-all shadow-xs space-y-3"
              >
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 max-w-[70%]">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md font-mono">
                        Prescription Verified
                      </span>
                      <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                        {med.dosage}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-neutral-900 dark:text-white leading-snug pt-0.5">
                      {med.name}
                    </h3>

                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      Purpose: <span className="font-medium text-neutral-700 dark:text-neutral-300">{med.purpose}</span>
                    </div>
                  </div>

                  {/* Adherence Checkbox Pill */}
                  <button
                    onClick={() => toggleTaken(med.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all active:scale-95 ${
                      isTaken
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isTaken ? 'Taken Today' : 'Log Dose'}</span>
                  </button>
                </div>

                {/* Verbatim Prescription Quote Box */}
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-neutral-400 font-mono flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                    <span>Prescription Instructions (Exact Verbatim):</span>
                  </div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 italic">
                    "{med.instructionsExact}"
                  </p>
                </div>

                {/* Timing & Duration Row */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Schedule</div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-200 capitalize">
                        {med.timing.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase">Duration</div>
                      <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {med.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Precautions and Side Effects */}
                {isExpanded ? (
                  <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    {/* Precautions */}
                    <div className="space-y-1">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300 text-[11px] block">
                        Safety Precautions & Food Interactions:
                      </span>
                      <ul className="space-y-1">
                        {med.precautions.map((prec, i) => (
                          <li
                            key={i}
                            className="text-[11px] text-neutral-600 dark:text-neutral-400 flex items-start space-x-1.5"
                          >
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{prec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Common Side Effects */}
                    <div className="space-y-1">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300 text-[11px] block">
                        Known Potential Side Effects:
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {med.sideEffects.map((side, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                          >
                            {side}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                <button
                  onClick={() => toggleExpand(med.id)}
                  className="w-full text-center text-[11px] text-neutral-400 hover:text-neutral-600 pt-1 flex items-center justify-center space-x-1"
                >
                  <span>{isExpanded ? 'Less' : 'Precautions & Side Effects'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Button to jump to Timeline */}
      <button
        onClick={onNavigateToTimeline}
        className="w-full py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold rounded-2xl text-xs flex items-center justify-center space-x-2 transition-colors"
      >
        <Calendar className="w-4 h-4 text-blue-500" />
        <span>View Full Daily Treatment Timeline</span>
      </button>
    </div>
  );
};
