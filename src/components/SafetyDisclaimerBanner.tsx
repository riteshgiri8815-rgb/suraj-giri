import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, ChevronRight, Lock, PhoneCall, X } from 'lucide-react';
import { UrgencyLevel } from '../types/medical';

interface SafetyDisclaimerBannerProps {
  urgency?: UrgencyLevel;
  urgencyReason?: string;
  onOpenEmergencyModal?: () => void;
}

export const SafetyDisclaimerBanner: React.FC<SafetyDisclaimerBannerProps> = ({
  urgency,
  urgencyReason,
  onOpenEmergencyModal,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  const isUrgent = urgency === 'urgent';

  return (
    <div className="w-full space-y-2 mb-3">
      {/* Critical Urgent Warning Banner (if urgent biomarkers detected) */}
      {isUrgent && (
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-2xl p-4 shadow-lg shadow-red-500/20 border border-red-400/30 animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-white/20 rounded-xl mt-0.5 shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold uppercase tracking-wider text-[11px] bg-white text-red-700 px-1.5 py-0.5 rounded font-mono">
                  CRITICAL FINDING
                </span>
                <span className="font-semibold text-white/95">Immediate Clinical Attention Recommended</span>
              </div>
              <p className="mt-1 text-red-50 font-normal leading-relaxed">
                {urgencyReason ||
                  'One or more lab values are severely outside safe reference limits. Please contact your physician or visit the nearest urgent care immediately.'}
              </p>
              <div className="mt-2.5 flex items-center space-x-2">
                <button
                  onClick={onOpenEmergencyModal}
                  className="bg-white text-red-700 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 shadow-sm active:scale-95 transition-transform"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Emergency Guidance</span>
                </button>
                <a
                  href="tel:911"
                  className="bg-red-800/80 hover:bg-red-800 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 transition-colors"
                >
                  <span>Call 911 / Local ER</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Standard Prominent Medical Disclaimer Pill */}
      {!isDismissed && (
        <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 rounded-2xl p-3 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center space-x-2.5 flex-1 pr-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-semibold">Medical Interpretation Aid Only:</span>{' '}
              <span className="opacity-90">
                PulseDoc does not provide diagnostic decisions or replace licensed medical providers.
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={() => setShowFullDisclaimer(true)}
              className="text-amber-700 dark:text-amber-300 font-medium text-[11px] underline underline-offset-2 hover:opacity-80"
            >
              Details
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 rounded-full"
              title="Acknowledge"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Full Disclaimer Modal Sheet */}
      {showFullDisclaimer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base">PulseDoc Safety & Clinical Boundary</h3>
              </div>
              <button
                onClick={() => setShowFullDisclaimer(false)}
                className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl space-y-1">
                <div className="font-bold text-amber-800 dark:text-amber-300">1. Not a Doctor / Prescription Generator</div>
                <p>
                  PulseDoc uses artificial intelligence to interpret uploaded lab tests, transcripts, and prescriptions. It never acts as an autonomous physician, never prescribes medicines, and never alters dosages.
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 rounded-xl space-y-1">
                <div className="font-bold text-blue-800 dark:text-blue-300">2. Grounded Categorization</div>
                <p>
                  Every finding is explicitly classified into confirmed document figures, differential possibilities, plain-language explanations, and items requiring doctor confirmation.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl space-y-1">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>3. Privacy & Security</span>
                </div>
                <p>
                  Medical documents remain private. Personal identifying information can be anonymized locally, and analysis requests are processed securely.
                </p>
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 rounded-xl space-y-1">
                <div className="font-bold text-rose-800 dark:text-rose-300">4. Emergency Situations</div>
                <p>
                  If you are experiencing severe symptoms such as sudden chest pressure, acute shortness of breath, severe confusion, or fainting, do not wait for an app summary. Call emergency services immediately.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFullDisclaimer(false)}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl text-xs active:scale-98 transition-transform"
            >
              I Understand & Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
