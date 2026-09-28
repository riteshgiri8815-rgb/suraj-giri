import React, { useState } from 'react';
import {
  History,
  Search,
  FileText,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Printer,
  Trash2,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { MedicalReport } from '../../types/medical';

interface HistoryTabProps {
  reports: MedicalReport[];
  activeReportId: string;
  onSelectReport: (report: MedicalReport) => void;
  onDeleteReport: (id: string) => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  reports,
  activeReportId,
  onSelectReport,
  onDeleteReport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = reports.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrintSummary = (report: MedicalReport) => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">
            Document Vault
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Report History
          </h1>
        </div>

        <button
          onClick={() => window.print()}
          className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-200 flex items-center space-x-1.5 text-xs font-semibold"
          title="Print Summary"
        >
          <Printer className="w-4 h-4" />
          <span>Export Summary</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search reports by title, test, or date..."
          className="w-full text-xs pl-10 pr-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-transparent focus:border-blue-500 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
        />
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 text-center text-xs text-neutral-400 border border-neutral-200/80 dark:border-neutral-800">
            No medical reports found matching your search.
          </div>
        ) : (
          filtered.map((report) => {
            const isActive = report.id === activeReportId;
            const abnormalCount = report.tests.filter((t) => t.status !== 'normal').length;

            return (
              <div
                key={report.id}
                className={`bg-white dark:bg-[#1C1C1E] rounded-3xl p-4 border transition-all shadow-xs space-y-3 ${
                  isActive
                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <div
                  onClick={() => onSelectReport(report)}
                  className="flex items-start justify-between cursor-pointer"
                >
                  <div className="space-y-1 max-w-[75%]">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono">
                        {report.documentType}
                      </span>
                      {report.urgency === 'urgent' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300 flex items-center space-x-0.5">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          <span>URGENT</span>
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white leading-tight">
                      {report.title}
                    </h3>

                    <div className="flex items-center space-x-3 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        <span>{report.date}</span>
                      </span>
                      <span>•</span>
                      <span>{report.patientName}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400">
                      {abnormalCount} abnormal
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {report.tests.length} tests total
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectReport(report)}
                      className={`font-semibold px-3 py-1 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      {isActive ? 'Currently Active' : 'Switch to this Report'}
                    </button>

                    <button
                      onClick={() => handlePrintSummary(report)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      title="Print Clinical Summary"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>

                  {reports.length > 1 && (
                    <button
                      onClick={() => onDeleteReport(report.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg"
                      title="Delete Report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
