import React from 'react';
import { AlertCircle, Phone, X, ShieldAlert, HeartPulse, User } from 'lucide-react';
import { MedicalReport } from '../types/medical';
import { PrivacyPreferences } from '../services/medicalAnalysis';

interface UrgentAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  report?: MedicalReport;
  prefs: PrivacyPreferences;
}

export const UrgentAlertModal: React.FC<UrgentAlertModalProps> = ({
  isOpen,
  onClose,
  report,
  prefs,
}) => {
  if (!isOpen) return null;

  const urgentTests = report?.tests.filter(
    (t) => t.status === 'critical_high' || t.status === 'critical_low' || t.status === 'high'
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <h3 className="font-bold text-lg">Urgent Clinical Finding Alert</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 text-xs space-y-2">
          <div className="font-bold text-red-800 dark:text-red-300 text-sm">
            Potential Critical Finding Detected
          </div>
          <p className="text-red-700 dark:text-red-300/90 leading-relaxed">
            {report?.urgencyReason ||
              'One or more lab parameters are significantly outside normal human physiological ranges, requiring prompt clinical evaluation.'}
          </p>
        </div>

        {urgentTests && urgentTests.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Abnormal Parameters Detected ({urgentTests.length})
            </div>
            <div className="space-y-1.5">
              {urgentTests.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-2.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl text-xs"
                >
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white">{t.name}</span>
                    <span className="text-neutral-400 ml-2">Ref: {t.referenceRange.text}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-red-600 dark:text-red-400 font-mono text-sm">
                      {t.value} {t.unit}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 uppercase">
                      {t.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Immediate Recommended Actions
          </div>
          <div className="grid grid-cols-1 gap-2">
            <a
              href="tel:911"
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md shadow-red-600/20 active:scale-98 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Emergency Dispatch (911 / 112)</span>
            </a>

            {prefs.emergencyContactPhone && (
              <a
                href={`tel:${prefs.emergencyContactPhone}`}
                className="w-full py-3 px-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 active:scale-98 transition-all"
              >
                <User className="w-4 h-4 text-blue-500" />
                <span>Call Primary Care: {prefs.emergencyContactName} ({prefs.emergencyContactPhone})</span>
              </a>
            )}
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 text-center pt-2">
          PulseDoc is an assistive tool and cannot provide emergency medical intervention.
        </div>
      </div>
    </div>
  );
};
