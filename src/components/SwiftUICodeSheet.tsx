import React, { useState } from 'react';
import { Code, Copy, Check, X, FileCode } from 'lucide-react';

interface SwiftUICodeSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SwiftUICodeSheet: React.FC<SwiftUICodeSheetProps> = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState<'ContentView' | 'ReportAnalysisView' | 'MedicineTimelineView' | 'Models'>('ContentView');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const swiftFiles: Record<string, string> = {
    ContentView: `// PulseDocApp.swift
// Modern iOS 18 Application using SwiftUI & Apple HealthKit styling

import SwiftUI

@main
struct PulseDocApp: App {
    @State private var medicalStore = MedicalReportStore()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(medicalStore)
                .preferredColorScheme(.light)
        }
    }
}

struct ContentView: View {
    @Environment(MedicalReportStore.self) private var store
    @State private var selectedTab: AppTab = .home
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeDashboardView()
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(AppTab.home)
            
            DocumentUploadView()
                .tabItem {
                    Label("Upload", systemImage: "doc.viewfinder.fill")
                }
                .tag(AppTab.upload)
            
            ReportAnalysisView()
                .tabItem {
                    Label("Analysis", systemImage: "waveform.path.ecg")
                }
                .badge(store.activeReport?.abnormalCount ?? 0)
                .tag(AppTab.analysis)
            
            MedicineTimelineView()
                .tabItem {
                    Label("Medicines", systemImage: "pill.fill")
                }
                .tag(AppTab.medicines)
            
            ReportHistoryView()
                .tabItem {
                    Label("History", systemImage: "clock.arrow.circlepath")
                }
                .tag(AppTab.history)
        }
        .tint(.blue)
    }
}`,
    ReportAnalysisView: `// ReportAnalysisView.swift
// Categorized Biomarker Cards with Four-Tier Clinical Grounding

import SwiftUI

struct ReportAnalysisView: View {
    @Environment(MedicalReportStore.self) private var store
    @State private var selectedFilter: TestCategory = .all
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Medical Disclaimer Banner
                    MedicalDisclaimerView(urgency: store.activeReport?.urgency ?? .normal)
                    
                    // Filter Chips
                    CategoryFilterPicker(selection: $selectedFilter)
                    
                    // Categorized Lab Test Cards
                    ForEach(filteredLabTests) { test in
                        BiomarkerCard(test: test)
                    }
                }
                .padding()
            }
            .navigationTitle("Analysis & Findings")
            .navigationBarTitleDisplayMode(.large)
            .background(Color(.systemGroupedBackground))
        }
    }
    
    private var filteredLabTests: [LabTest] {
        guard let report = store.activeReport else { return [] }
        if selectedFilter == .abnormalOnly {
            return report.tests.filter { $0.status != .normal }
        }
        return report.tests
    }
}

struct BiomarkerCard: View {
    let test: LabTest
    @State private var isExpanded: Bool = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(test.name)
                        .font(.headline)
                    Text("Ref: \\(test.referenceRange.text)")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("\\(test.value) \\(test.unit)")
                        .font(.system(.title3, design: .rounded).bold())
                        .foregroundColor(test.status == .normal ? .primary : .red)
                    StatusBadge(status: test.status)
                }
            }
            
            // Grounded Explanation Section
            VStack(alignment: .leading, spacing: 6) {
                Label("AI Clinical Explanation", systemImage: "sparkles")
                    .font(.caption.bold())
                    .foregroundColor(.blue)
                Text(test.aiExplanation)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            .padding(10)
            .background(Color(.secondarySystemGroupedBackground))
            .cornerRadius(10)
            
            if test.requiresDoctorReview {
                Label("Doctor Confirmation Required", systemImage: "stethoscope")
                    .font(.caption.weight(.medium))
                    .foregroundColor(.orange)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.04), radius: 5, y: 2)
    }
}`,
    MedicineTimelineView: `// MedicineTimelineView.swift
// Prescription Schedule & Treatment Timeline in SwiftUI

import SwiftUI

struct MedicineTimelineView: View {
    @Environment(MedicalReportStore.self) private var store
    
    var body: some View {
        NavigationStack {
            List {
                Section(header: Text("Prescribed Medications (Exact Verbatim)")) {
                    ForEach(store.activeReport?.medicines ?? []) { med in
                        MedicineRow(medicine: med)
                    }
                }
                
                Section(header: Text("Daily Treatment Timeline")) {
                    ForEach(store.activeReport?.timeline ?? []) { event in
                        HStack(spacing: 14) {
                            Text(event.timeOfDay)
                                .font(.caption.monospaced().bold())
                                .foregroundColor(.secondary)
                                .frame(width: 70, alignment: .leading)
                            
                            VStack(alignment: .leading, spacing: 3) {
                                Text(event.medicineName)
                                    .font(.subheadline.bold())
                                Text(event.mealRelation)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Image(systemName: "checkmark.circle")
                                .foregroundColor(.blue)
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Treatment Timeline")
        }
    }
}`,
    Models: `// MedicalModels.swift
// Strict Data Architecture for Clinical Documents

import Foundation

enum UrgencyLevel: String, Codable {
    case normal
    case attentionNeeded = "attention_needed"
    case urgent
}

enum BiomarkerStatus: String, Codable {
    case normal, low, high, criticalLow = "critical_low", criticalHigh = "critical_high"
}

struct LabTest: Identifiable, Codable {
    var id: String
    var name: string
    var category: String
    var value: String
    var unit: String
    var referenceRange: ReferenceRange
    var status: BiomarkerStatus
    var aiExplanation: String
    var clinicalSignificance: String
    var requiresDoctorReview: Bool
}

struct PossibleCondition: Identifiable, Codable {
    var id: String
    var name: String
    var simpleExplanation: String
    var commonSymptoms: [String]
    var possibleCauses: [String]
    var severity: String
    var urgencyIndicator: String
    var whenToConsultDoctor: String
    var confidenceLevel: String
    var medicalReferences: [String]
}

struct PrescriptionMedicine: Identifiable, Codable {
    var id: String
    var name: String
    var purpose: String
    var instructionsExact: String
    var dosage: String
    var timing: String
    var duration: String
    var precautions: [String]
    var sideEffects: [String]
    var isVerifiedByPrescription: Bool
}`
  };

  const currentCode = swiftFiles[activeFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#1C1C1E] text-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center space-x-2">
                <span>SwiftUI Native iOS Architecture</span>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                  iOS 18 + Xcode 16
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Native SwiftUI source code corresponding to PulseDoc iOS views
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
          {Object.keys(swiftFiles).map((fileName) => (
            <button
              key={fileName}
              onClick={() => setActiveFile(fileName as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-colors shrink-0 ${
                activeFile === fileName
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{fileName}.swift</span>
            </button>
          ))}
        </div>

        {/* Code box */}
        <div className="relative flex-1 bg-black/80 rounded-2xl p-4 overflow-auto font-mono text-xs text-emerald-400 border border-neutral-800/80 max-h-[50vh]">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 bg-neutral-800/90 hover:bg-neutral-700 text-neutral-200 px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 border border-neutral-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy SwiftUI Code'}</span>
          </button>
          <pre className="pt-6">{currentCode}</pre>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
          <span>Target: iOS 17.0+ / iOS 18.0 (SwiftUI 5.0)</span>
          <button
            onClick={handleCopy}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Copy {activeFile}.swift
          </button>
        </div>
      </div>
    </div>
  );
};
