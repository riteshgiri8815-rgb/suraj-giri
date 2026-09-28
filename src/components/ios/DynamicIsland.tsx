import React, { useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Pill } from 'lucide-react';
import { UrgencyLevel } from '../../types/medical';

interface DynamicIslandProps {
  isAnalyzing: boolean;
  urgency?: UrgencyLevel;
  activeReportTitle?: string;
  nextMedication?: { name: string; time: string };
  onIslandClick?: () => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  isAnalyzing,
  urgency,
  activeReportTitle,
  nextMedication,
  onIslandClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (onIslandClick) onIslandClick();
  };

  return (
    <div className="w-full flex justify-center py-1 select-none z-50">
      <div
        onClick={handleClick}
        className={`transition-all duration-300 ease-out bg-black text-white rounded-full flex items-center justify-between cursor-pointer shadow-lg hover:shadow-black/20 ${
          isExpanded
            ? 'w-[92%] max-w-sm px-4 py-2.5 rounded-3xl'
            : isAnalyzing
            ? 'w-60 px-3.5 py-2'
            : urgency === 'urgent'
            ? 'w-56 px-3.5 py-1.5 ring-2 ring-red-500/50'
            : 'w-36 px-3 py-1.5'
        }`}
      >
        {isAnalyzing ? (
          <div className="w-full flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="font-medium text-[11px] tracking-tight">AI Clinical OCR...</span>
            </div>
            <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          </div>
        ) : isExpanded ? (
          <div className="w-full text-xs space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-neutral-100">PulseDoc Health Core</span>
              </div>
              <span className="text-[10px] text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">iOS 18</span>
            </div>
            <div className="text-[11px] text-neutral-300 truncate pt-1">
              {activeReportTitle || 'No active report selected'}
            </div>
            {nextMedication && (
              <div className="flex items-center justify-between text-[10px] text-neutral-400 border-t border-neutral-800 pt-1">
                <span className="flex items-center space-x-1">
                  <Pill className="w-3 h-3 text-amber-400" />
                  <span>Next: {nextMedication.name}</span>
                </span>
                <span className="text-amber-400 font-medium">{nextMedication.time}</span>
              </div>
            )}
          </div>
        ) : urgency === 'urgent' ? (
          <div className="w-full flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-bounce" />
              <span className="text-[11px] font-medium text-red-300">Urgent Findings</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
        ) : (
          <div className="w-full flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] font-medium text-neutral-200">PulseDoc</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          </div>
        )}
      </div>
    </div>
  );
};
