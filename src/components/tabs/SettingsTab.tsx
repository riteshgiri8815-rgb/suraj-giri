import React, { useState } from 'react';
import {
  Settings,
  Lock,
  EyeOff,
  Shield,
  Phone,
  User,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Info,
} from 'lucide-react';
import { PrivacyPreferences, savePrivacyPreferences } from '../../services/medicalAnalysis';

interface SettingsTabProps {
  prefs: PrivacyPreferences;
  onUpdatePrefs: (prefs: PrivacyPreferences) => void;
  onClearAllData: () => void;
  onOpenDisclaimer: () => void;
  onOpenSwiftUISheet: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  prefs,
  onUpdatePrefs,
  onClearAllData,
  onOpenDisclaimer,
  onOpenSwiftUISheet,
}) => {
  const [localPrefs, setLocalPrefs] = useState<PrivacyPreferences>(prefs);
  const [saveToast, setSaveToast] = useState(false);

  const handleToggle = (key: keyof PrivacyPreferences) => {
    const updated = { ...localPrefs, [key]: !localPrefs[key] };
    setLocalPrefs(updated);
    onUpdatePrefs(updated);
    triggerSaveToast();
  };

  const handleContactChange = (field: 'emergencyContactName' | 'emergencyContactPhone', val: string) => {
    const updated = { ...localPrefs, [field]: val };
    setLocalPrefs(updated);
    onUpdatePrefs(updated);
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="pt-1">
        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">
          Security & Configuration
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          App Settings
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Privacy settings, safety boundaries, and emergency contact details.
        </p>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-500 text-white rounded-2xl text-xs font-semibold flex items-center space-x-2 animate-fade-in shadow-md shadow-emerald-500/20">
          <CheckCircle2 className="w-4 h-4" />
          <span>Preferences updated securely</span>
        </div>
      )}

      {/* Privacy & Confidentiality Card */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <Lock className="w-4 h-4 text-emerald-500" />
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
            Medical Document Privacy
          </h3>
        </div>

        <div className="space-y-3 divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
          {/* Local Encryption */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5 max-w-[80%]">
              <span className="font-semibold text-neutral-900 dark:text-white block">
                Local On-Device Sandboxing
              </span>
              <p className="text-neutral-500 text-[11px]">
                Documents are saved inside your device's browser sandbox and never shared with third-party advertisers.
              </p>
            </div>
            <button
              onClick={() => handleToggle('localEncryption')}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                localPrefs.localEncryption ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  localPrefs.localEncryption ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Anonymize Patient Name */}
          <div className="flex items-center justify-between pt-3">
            <div className="space-y-0.5 max-w-[80%]">
              <span className="font-semibold text-neutral-900 dark:text-white block">
                Patient Name Anonymization
              </span>
              <p className="text-neutral-500 text-[11px]">
                Mask personal identifying names (e.g. Alex M. [Anonymized]) for privacy in previews and shared views.
              </p>
            </div>
            <button
              onClick={() => handleToggle('anonymizePatientName')}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                localPrefs.anonymizePatientName ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  localPrefs.anonymizePatientName ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Physician Contact */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-blue-500" />
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
            Primary Care Emergency Contact
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
              Physician / Clinic Name
            </label>
            <input
              type="text"
              value={localPrefs.emergencyContactName}
              onChange={(e) => handleContactChange('emergencyContactName', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 outline-none text-neutral-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
              Clinic Direct Phone Number
            </label>
            <input
              type="text"
              value={localPrefs.emergencyContactPhone}
              onChange={(e) => handleContactChange('emergencyContactPhone', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 outline-none text-neutral-900 dark:text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* SwiftUI Developer Code Sheet Trigger */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              SwiftUI Architecture & Code
            </h3>
            <p className="text-xs text-neutral-500">
              Inspect or export native SwiftUI iOS 18 source code
            </p>
          </div>
          <button
            onClick={onOpenSwiftUISheet}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs active:scale-95 transition-transform"
          >
            View SwiftUI Code
          </button>
        </div>
      </div>

      {/* Safety Disclaimers & Regulatory Boundary */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800 space-y-3 shadow-xs">
        <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center space-x-2">
          <Shield className="w-4 h-4 text-amber-500" />
          <span>Clinical Disclaimer & Ethics</span>
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed">
          PulseDoc is designed as a patient educational and report comprehension tool. Review the full terms, regulatory boundaries, and emergency protocols.
        </p>
        <button
          onClick={onOpenDisclaimer}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80"
        >
          Review Full Safety Disclaimer
        </button>
      </div>

      {/* Reset Data */}
      <div className="pt-2">
        <button
          onClick={onClearAllData}
          className="w-full py-3 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 text-red-600 dark:text-red-400 font-semibold rounded-2xl text-xs flex items-center justify-center space-x-1.5 transition-colors border border-red-200/60 dark:border-red-900/40"
        >
          <Trash2 className="w-4 h-4" />
          <span>Reset All Saved Reports & Cache</span>
        </button>
      </div>
    </div>
  );
};
