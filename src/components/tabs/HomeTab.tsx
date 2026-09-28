import React from 'react';
import {
  Activity,
  AlertTriangle,
  FileText,
  Upload,
  Pill,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { MedicalReport, ActiveTab } from '../../types/medical';
import { SAMPLE_REPORTS } from '../../data/sampleReports';

interface HomeTabProps {
  report: MedicalReport;
  allReports: MedicalReport[];
  onSelectReport: (report: MedicalReport) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenDoctorQuestions: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  report,
  allReports,
  onSelectReport,
  onNavigateTab,
  onOpenDoctorQuestions,
}) => {
  const abnormalTests = report.tests.filter((t) => t.status !== 'normal');
  const normalCount = report.tests.length - abnormalTests.length;
  const criticalCount = report.tests.filter(
    (t) => t.status === 'critical_high' || t.status === 'critical_low'
  ).length;

  return (
    <div className="space-y-4 pb-20">
      {/* iOS Header Title */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">
            {report.documentType}
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Health Summary
          </h1>
        </div>
        <div className="flex items-center space-x-1.5 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300">
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
          <span>{report.date}</span>
        </div>
      </div>

      {/* Active Report Hero Card (Apple Health styling) */}
      <div className="bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-[#1C1C1E] dark:via-[#1C1C1E] dark:to-blue-950/20 rounded-3xl p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1 max-w-[70%]">
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold">
                Active Document
              </span>
              {report.urgency === 'urgent' ? (
                <span className="text-xs px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 font-semibold flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Urgent Review</span>
                </span>
              ) : abnormalTests.length > 0 ? (
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-semibold">
                  Attention Needed
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-semibold">
                  All Normal
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug pt-1">
              {report.title}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Patient: <span className="font-medium text-neutral-700 dark:text-neutral-200">{report.patientName}</span> • Conf. Score:{' '}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {Math.round(report.confidenceScore * 100)}%
              </span>
            </p>
          </div>

          {/* Biomarkers Radial Ring Stat */}
          <div className="flex flex-col items-center justify-center p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-2xl border border-neutral-100 dark:border-neutral-700/60 text-center min-w-20">
            <span className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              {report.tests.length}
            </span>
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Tests Extracted
            </span>
          </div>
        </div>

        {/* 3 Metrics Mini Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={() => onNavigateTab('analysis')}
            className="p-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition-colors"
          >
            <div className="text-[10px] font-semibold text-neutral-400 uppercase">Abnormal</div>
            <div className="text-base font-bold text-red-600 dark:text-red-400">
              {abnormalTests.length} <span className="text-xs font-normal text-neutral-400">flagged</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('diseases')}
            className="p-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition-colors"
          >
            <div className="text-[10px] font-semibold text-neutral-400 uppercase">Conditions</div>
            <div className="text-base font-bold text-amber-600 dark:text-amber-400">
              {report.conditions.length} <span className="text-xs font-normal text-neutral-400">differentials</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('medicines')}
            className="p-2.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition-colors"
          >
            <div className="text-[10px] font-semibold text-neutral-400 uppercase">Meds in Rx</div>
            <div className="text-base font-bold text-blue-600 dark:text-blue-400">
              {report.medicines.length} <span className="text-xs font-normal text-neutral-400">prescribed</span>
            </div>
          </button>
        </div>

        {/* Quick CTA to open Analysis */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onNavigateTab('analysis')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center space-x-1 hover:underline"
          >
            <span>View detailed clinical cards</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenDoctorQuestions}
            className="text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-xl flex items-center space-x-1 hover:bg-blue-100"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor Questions ({report.doctorQuestions?.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Quick Upload Action Banner */}
      <div
        onClick={() => onNavigateTab('upload')}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-4 shadow-md shadow-blue-500/20 cursor-pointer active:scale-98 transition-all flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 rounded-2xl">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">Upload New Medical PDF or Scan</div>
            <div className="text-xs text-blue-100">Files, camera photo OCR, or clinical labs</div>
          </div>
        </div>
        <div className="p-2 bg-white/10 rounded-full">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Key Abnormal Findings Highlights */}
      {abnormalTests.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Key Biomarker Deviations ({abnormalTests.length})
            </h3>
            <button
              onClick={() => onNavigateTab('analysis')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {abnormalTests.slice(0, 4).map((test) => (
              <div
                key={test.id}
                onClick={() => onNavigateTab('analysis')}
                className="p-3.5 bg-white dark:bg-[#1C1C1E] border border-neutral-200/80 dark:border-neutral-800 rounded-2xl shadow-xs cursor-pointer hover:border-blue-400/50 transition-all flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-xs text-neutral-900 dark:text-white">
                    {test.name}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Ref: {test.referenceRange.text}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-red-600 dark:text-red-400">
                    {test.value} <span className="text-[10px] font-normal">{test.unit}</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 uppercase">
                    {test.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Treatment Schedule Snippet */}
      {report.timeline.length > 0 && (
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-4 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Pill className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Prescription Schedule
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('timeline')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold"
            >
              Full Timeline
            </button>
          </div>

          <div className="space-y-2">
            {report.timeline.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-2.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl text-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-neutral-500 font-semibold text-[11px] bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded-md">
                    {event.timeOfDay}
                  </span>
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      {event.medicineName}
                    </div>
                    <div className="text-[11px] text-neutral-500">{event.mealRelation}</div>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {event.frequency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Clinical Reports Loader (One-tap test) */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Load Realistic Clinical Sample Reports</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_REPORTS.map((sample) => {
            const isCurrent = sample.id === report.id;
            return (
              <button
                key={sample.id}
                onClick={() => onSelectReport(sample)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  isCurrent
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20'
                    : 'bg-white dark:bg-[#1C1C1E] border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-900 dark:text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-neutral-500 dark:text-neutral-400 font-mono">
                    {sample.documentType}
                  </span>
                  {sample.urgency === 'urgent' && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300">
                      CRITICAL
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs leading-snug truncate">{sample.title}</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 flex items-center space-x-2">
                  <span>{sample.tests.length} tests</span>
                  <span>•</span>
                  <span>{sample.medicines.length} meds</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {sample.patientName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
