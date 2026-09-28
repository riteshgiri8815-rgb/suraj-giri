import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Info,
  Sparkles,
  Stethoscope,
  Filter,
  Check,
  TrendingUp,
  FileCheck2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { MedicalReport, LabTest, CategoryFilter } from '../../types/medical';
import { IOSSegmentedControl } from '../ios/IOSSegmentedControl';

interface AnalysisTabProps {
  report: MedicalReport;
  onNavigateToDiseases: () => void;
  onOpenDoctorQuestions: () => void;
}

export const AnalysisTab: React.FC<AnalysisTabProps> = ({
  report,
  onNavigateToDiseases,
  onOpenDoctorQuestions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [tierFilter, setTierFilter] = useState<'all' | 'confirmed' | 'doctor_review'>('all');
  const [expandedTestId, setExpandedTestId] = useState<string | null>(null);

  const categories: CategoryFilter[] = ['All', 'Abnormal', 'Metabolic', 'Lipids', 'CBC', 'Thyroid', 'Liver & Kidney'];

  const filteredTests = report.tests.filter((test) => {
    // Category filter
    if (selectedCategory === 'Abnormal' && test.status === 'normal') return false;
    if (
      selectedCategory !== 'All' &&
      selectedCategory !== 'Abnormal' &&
      !test.category.toLowerCase().includes(selectedCategory.toLowerCase())
    ) {
      return false;
    }
    // Tier filter
    if (tierFilter === 'doctor_review' && !test.requiresDoctorReview) return false;

    return true;
  });

  const abnormalCount = report.tests.filter((t) => t.status !== 'normal').length;
  const doctorReviewCount = report.tests.filter((t) => t.requiresDoctorReview).length;

  const toggleExpand = (id: string) => {
    setExpandedTestId(expandedTestId === id ? null : id);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">
            Clinical Findings
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Report Analysis
          </h1>
        </div>

        {/* Confidence & Uncertainty Indicator */}
        <div className="flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{Math.round(report.confidenceScore * 100)}% Confidence</span>
        </div>
      </div>

      {/* 4-Tier Grounding Legend Box */}
      <div className="bg-white dark:bg-[#1C1C1E] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-4 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Clinical Grounding Framework
          </span>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
            Strict Separation
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 flex items-center space-x-2">
            <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <div className="font-bold text-blue-900 dark:text-blue-200 text-[11px]">1. Confirmed</div>
              <div className="text-[10px] text-blue-700/80 dark:text-blue-300/80">Direct from report</div>
            </div>
          </div>

          <div
            onClick={onNavigateToDiseases}
            className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 flex items-center space-x-2 cursor-pointer hover:bg-purple-100"
          >
            <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <div className="font-bold text-purple-900 dark:text-purple-200 text-[11px]">2. Possible</div>
              <div className="text-[10px] text-purple-700/80 dark:text-purple-300/80">Differential pattern</div>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-emerald-900 dark:text-emerald-200 text-[11px]">3. AI Explanation</div>
              <div className="text-[10px] text-emerald-700/80 dark:text-emerald-300/80">Plain language</div>
            </div>
          </div>

          <div
            onClick={onOpenDoctorQuestions}
            className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-center space-x-2 cursor-pointer hover:bg-amber-100"
          >
            <Stethoscope className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <div className="font-bold text-amber-900 dark:text-amber-200 text-[11px]">4. Doctor Review</div>
              <div className="text-[10px] text-amber-700/80 dark:text-amber-300/80">Confirmation needed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Category Filter */}
      <div className="overflow-x-auto pb-1 flex items-center space-x-1.5 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === 'All'
              ? report.tests.length
              : cat === 'Abnormal'
              ? abnormalCount
              : report.tests.filter((t) => t.category.toLowerCase().includes(cat.toLowerCase())).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 shrink-0 ${
                isSelected
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-[#1C1C1E] text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? 'bg-blue-700 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lab Tests List */}
      <div className="space-y-3">
        {filteredTests.length === 0 ? (
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 text-center text-xs text-neutral-400 border border-neutral-200/80 dark:border-neutral-800">
            No tests match this filter.
          </div>
        ) : (
          filteredTests.map((test) => {
            const isAbnormal = test.status !== 'normal';
            const isCritical = test.status === 'critical_high' || test.status === 'critical_low';
            const isExpanded = expandedTestId === test.id;

            return (
              <div
                key={test.id}
                className={`bg-white dark:bg-[#1C1C1E] rounded-3xl p-4 border transition-all duration-200 shadow-xs ${
                  isCritical
                    ? 'border-red-500/40 ring-1 ring-red-500/20'
                    : isAbnormal
                    ? 'border-amber-400/40'
                    : 'border-neutral-200/80 dark:border-neutral-800'
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(test.id)}
                  className="flex items-start justify-between cursor-pointer"
                >
                  <div className="space-y-1 max-w-[65%]">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                        {test.category}
                      </span>
                      {test.requiresDoctorReview && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 flex items-center space-x-0.5">
                          <Stethoscope className="w-2.5 h-2.5" />
                          <span>Doctor Confirmation Required</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white leading-tight">
                      {test.name}
                    </h3>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Standard Reference Range: <span className="font-medium text-neutral-700 dark:text-neutral-300">{test.referenceRange.text}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-base font-extrabold font-mono tracking-tight ${
                        isCritical
                          ? 'text-red-600 dark:text-red-400'
                          : isAbnormal
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-neutral-900 dark:text-white'
                      }`}
                    >
                      {test.value} <span className="text-xs font-normal text-neutral-500">{test.unit}</span>
                    </div>
                    <span
                      className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isCritical
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                          : isAbnormal
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {test.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Range Visualizer Bar */}
                <div className="mt-3 pt-2">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                    <span>Low</span>
                    <span className="font-medium text-neutral-600 dark:text-neutral-300">Target Range</span>
                    <span>High</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex">
                    <div className="w-1/4 bg-amber-400/30" />
                    <div className="w-2/4 bg-emerald-500/40" />
                    <div className="w-1/4 bg-red-500/30" />
                  </div>
                </div>

                {/* Plain-English AI Explanation */}
                <div className="mt-3 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl space-y-1.5 text-xs">
                  <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-Generated Plain Language Explanation</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-[11px]">
                    {test.aiExplanation}
                  </p>
                </div>

                {/* Expandable Section: Clinical Significance */}
                {isExpanded && (
                  <div className="mt-2.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-neutral-700 dark:text-neutral-300 text-[11px] block">
                        Clinical Significance & Context:
                      </span>
                      <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed mt-0.5">
                        {test.clinicalSignificance}
                      </p>
                    </div>

                    {test.historyPoints && test.historyPoints.length > 0 && (
                      <div className="pt-1">
                        <span className="font-bold text-neutral-700 dark:text-neutral-300 text-[11px] block mb-1">
                          Historical Test Trend:
                        </span>
                        <div className="flex items-center space-x-2">
                          {test.historyPoints.map((pt, i) => (
                            <div key={i} className="flex-1 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center">
                              <div className="text-[10px] text-neutral-400">{pt.date}</div>
                              <div className="font-mono font-bold text-neutral-800 dark:text-neutral-200">
                                {pt.value} {test.unit}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Toggle details chevron */}
                <button
                  onClick={() => toggleExpand(test.id)}
                  className="w-full mt-2 pt-1 flex items-center justify-center space-x-1 text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <span>{isExpanded ? 'Less Details' : 'More Clinical Details'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
