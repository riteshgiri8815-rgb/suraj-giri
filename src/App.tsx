/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Activity,
  HeartPulse,
  Pill,
  Clock,
  History,
  Settings,
  Code,
  Moon,
  Sun,
  Smartphone,
  Maximize2,
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

import { ActiveTab, MedicalReport } from './types/medical';
import { SAMPLE_REPORTS } from './data/sampleReports';
import {
  getSavedReports,
  saveReports,
  getActiveReportId,
  setActiveReportId,
  getPrivacyPreferences,
  savePrivacyPreferences,
  PrivacyPreferences,
} from './services/medicalAnalysis';

// iOS components
import { IOSStatusBar } from './components/ios/IOSStatusBar';
import { DynamicIsland } from './components/ios/DynamicIsland';
import { IOSTabBar } from './components/ios/IOSTabBar';

// Banner and Modals
import { SafetyDisclaimerBanner } from './components/SafetyDisclaimerBanner';
import { UrgentAlertModal } from './components/UrgentAlertModal';
import { SwiftUICodeSheet } from './components/SwiftUICodeSheet';
import { DoctorQuestionsSheet } from './components/DoctorQuestionsSheet';

// Tab screens
import { HomeTab } from './components/tabs/HomeTab';
import { UploadTab } from './components/tabs/UploadTab';
import { AnalysisTab } from './components/tabs/AnalysisTab';
import { DiseasesTab } from './components/tabs/DiseasesTab';
import { MedicinesTab } from './components/tabs/MedicinesTab';
import { TimelineTab } from './components/tabs/TimelineTab';
import { HistoryTab } from './components/tabs/HistoryTab';
import { SettingsTab } from './components/tabs/SettingsTab';

export default function App() {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [activeReport, setActiveReport] = useState<MedicalReport>(SAMPLE_REPORTS[0]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [prefs, setPrefs] = useState<PrivacyPreferences>(getPrivacyPreferences());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isIPhoneFrame, setIsIPhoneFrame] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Modals state
  const [isUrgentModalOpen, setIsUrgentModalOpen] = useState(false);
  const [isSwiftUICodeOpen, setIsSwiftUICodeOpen] = useState(false);
  const [isDoctorQuestionsOpen, setIsDoctorQuestionsOpen] = useState(false);

  // Initial load
  useEffect(() => {
    const loadedReports = getSavedReports();
    setReports(loadedReports);

    const activeId = getActiveReportId();
    const found = loadedReports.find((r) => r.id === activeId) || loadedReports[0] || SAMPLE_REPORTS[0];
    setActiveReport(found);
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle selecting a report
  const handleSelectReport = (rep: MedicalReport) => {
    setActiveReport(rep);
    setActiveReportId(rep.id);
    if (rep.urgency === 'urgent') {
      setIsUrgentModalOpen(true);
    }
  };

  // Handle report analyzed (from upload or sample)
  const handleReportAnalyzed = (newReport: MedicalReport) => {
    const updated = [newReport, ...reports.filter((r) => r.id !== newReport.id)];
    setReports(updated);
    saveReports(updated);
    setActiveReport(newReport);
    setActiveReportId(newReport.id);
    setActiveTab('analysis');

    if (newReport.urgency === 'urgent') {
      setIsUrgentModalOpen(true);
    }
  };

  // Handle delete report
  const handleDeleteReport = (id: string) => {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    saveReports(updated);
    if (activeReport.id === id && updated.length > 0) {
      setActiveReport(updated[0]);
      setActiveReportId(updated[0].id);
    }
  };

  // Handle clear all data
  const handleClearAllData = () => {
    if (window.confirm('Reset all saved medical reports to default sample cases?')) {
      setReports(SAMPLE_REPORTS);
      saveReports(SAMPLE_REPORTS);
      setActiveReport(SAMPLE_REPORTS[0]);
      setActiveReportId(SAMPLE_REPORTS[0].id);
      setActiveTab('home');
    }
  };

  const handleUpdatePrefs = (newPrefs: PrivacyPreferences) => {
    setPrefs(newPrefs);
    savePrivacyPreferences(newPrefs);
  };

  const abnormalCount = activeReport.tests.filter((t) => t.status !== 'normal').length;
  const nextMed = activeReport.timeline[0]
    ? { name: activeReport.timeline[0].medicineName, time: activeReport.timeline[0].timeOfDay }
    : undefined;

  return (
    <div className="min-h-screen bg-[#E5E5EA] dark:bg-[#121214] text-[#1C1C1E] dark:text-[#F2F2F7] flex flex-col items-center justify-start p-0 md:py-6 transition-colors duration-200">
      {/* Top Device & Environment Control Bar (Desktop Only) */}
      <header className="hidden md:flex items-center justify-between w-full max-w-md mb-2 px-2 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">PulseDoc</span>
          <span className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-mono px-1.5 py-0.5 rounded">
            iOS 18 SwiftUI
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* SwiftUI Code Viewer Button */}
          <button
            onClick={() => setIsSwiftUICodeOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-semibold shadow-xs hover:bg-neutral-50 transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
            <span>SwiftUI Code</span>
          </button>

          {/* Toggle Device Frame */}
          <button
            onClick={() => setIsIPhoneFrame(!isIPhoneFrame)}
            className="p-1.5 rounded-lg bg-white dark:bg-neutral-800 shadow-xs hover:bg-neutral-50 text-neutral-600 dark:text-neutral-300"
            title={isIPhoneFrame ? 'Expand to Full Viewport' : 'Show iPhone Frame'}
          >
            {isIPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-lg bg-white dark:bg-neutral-800 shadow-xs hover:bg-neutral-50 text-neutral-600 dark:text-neutral-300"
            title="Toggle Appearance"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main iPhone Frame / Container */}
      <main
        className={`w-full bg-[#F2F2F7] dark:bg-[#000000] flex flex-col transition-all duration-300 relative ${
          isIPhoneFrame
            ? 'max-w-md min-h-screen md:min-h-[860px] md:max-h-[890px] md:rounded-[52px] md:shadow-2xl md:ring-1 md:ring-black/10 dark:md:ring-white/10 md:overflow-hidden md:border-[10px] md:border-neutral-900 dark:md:border-neutral-800'
            : 'max-w-3xl min-h-screen'
        }`}
      >
        {/* iOS Status Bar */}
        <IOSStatusBar />

        {/* Dynamic Island */}
        <DynamicIsland
          isAnalyzing={isAnalyzing}
          urgency={activeReport.urgency}
          activeReportTitle={activeReport.title}
          nextMedication={nextMed}
          onIslandClick={() => {
            if (activeReport.urgency === 'urgent') setIsUrgentModalOpen(true);
          }}
        />

        {/* Top iOS Navigation Bar (with Title & Actions) */}
        <div className="px-5 py-2 flex items-center justify-between border-b border-neutral-200/50 dark:border-neutral-900">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-neutral-500">
              {activeTab === 'home' && 'Summary'}
              {activeTab === 'upload' && 'Intake'}
              {activeTab === 'analysis' && 'Biomarkers'}
              {activeTab === 'diseases' && 'Differentials'}
              {activeTab === 'medicines' && 'Prescriptions'}
              {activeTab === 'timeline' && 'Schedule'}
              {activeTab === 'history' && 'Vault'}
              {activeTab === 'settings' && 'Settings'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Doctor Questions quick icon */}
            <button
              onClick={() => setIsDoctorQuestionsOpen(true)}
              className="p-1.5 rounded-full bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs hover:bg-neutral-100"
              title="Doctor Questions"
            >
              <Stethoscope className="w-4 h-4" />
            </button>

            {/* SwiftUI Code Icon */}
            <button
              onClick={() => setIsSwiftUICodeOpen(true)}
              className="p-1.5 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shadow-xs hover:bg-neutral-100"
              title="SwiftUI Code Inspector"
            >
              <Code className="w-4 h-4" />
            </button>

            {/* Settings Tab trigger */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-1.5 rounded-full shadow-xs transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Viewport */}
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 space-y-4 no-scrollbar">
          {/* Prominent Medical Disclaimer & Urgent Alerts */}
          <SafetyDisclaimerBanner
            urgency={activeReport.urgency}
            urgencyReason={activeReport.urgencyReason}
            onOpenEmergencyModal={() => setIsUrgentModalOpen(true)}
          />

          {/* Active Tab Screen */}
          {activeTab === 'home' && (
            <HomeTab
              report={activeReport}
              allReports={reports}
              onSelectReport={handleSelectReport}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenDoctorQuestions={() => setIsDoctorQuestionsOpen(true)}
            />
          )}

          {activeTab === 'upload' && (
            <UploadTab
              onReportAnalyzed={handleReportAnalyzed}
              onSetAnalyzing={setIsAnalyzing}
            />
          )}

          {activeTab === 'analysis' && (
            <AnalysisTab
              report={activeReport}
              onNavigateToDiseases={() => setActiveTab('diseases')}
              onOpenDoctorQuestions={() => setIsDoctorQuestionsOpen(true)}
            />
          )}

          {activeTab === 'diseases' && (
            <DiseasesTab
              report={activeReport}
              onOpenDoctorQuestions={() => setIsDoctorQuestionsOpen(true)}
            />
          )}

          {activeTab === 'medicines' && (
            <MedicinesTab
              report={activeReport}
              onNavigateToTimeline={() => setActiveTab('timeline')}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineTab report={activeReport} />
          )}

          {activeTab === 'history' && (
            <HistoryTab
              reports={reports}
              activeReportId={activeReport.id}
              onSelectReport={(rep) => {
                handleSelectReport(rep);
                setActiveTab('analysis');
              }}
              onDeleteReport={handleDeleteReport}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              prefs={prefs}
              onUpdatePrefs={handleUpdatePrefs}
              onClearAllData={handleClearAllData}
              onOpenDisclaimer={() => setIsUrgentModalOpen(true)}
              onOpenSwiftUISheet={() => setIsSwiftUICodeOpen(true)}
            />
          )}
        </div>

        {/* Authentic iOS 18 Glassmorphic Tab Bar */}
        <IOSTabBar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          abnormalCount={abnormalCount}
          medsCount={activeReport.medicines.length}
        />

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-900/30 dark:bg-white/30 rounded-full pointer-events-none z-50" />
      </main>

      {/* Floating Modals */}
      <UrgentAlertModal
        isOpen={isUrgentModalOpen}
        onClose={() => setIsUrgentModalOpen(false)}
        report={activeReport}
        prefs={prefs}
      />

      <SwiftUICodeSheet
        isOpen={isSwiftUICodeOpen}
        onClose={() => setIsSwiftUICodeOpen(false)}
      />

      <DoctorQuestionsSheet
        isOpen={isDoctorQuestionsOpen}
        onClose={() => setIsDoctorQuestionsOpen(false)}
        report={activeReport}
      />
    </div>
  );
}
