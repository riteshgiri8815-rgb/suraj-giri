import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Pill,
  CalendarPlus,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { MedicalReport, TreatmentTimelineEvent } from '../../types/medical';
import confetti from 'canvas-confetti';

interface TimelineTabProps {
  report: MedicalReport;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({ report }) => {
  const [timelineEvents, setTimelineEvents] = useState<TreatmentTimelineEvent[]>(report.timeline || []);
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);

  const toggleEventStatus = (id: string) => {
    setTimelineEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const nextStatus = e.status === 'taken' ? 'scheduled' : 'taken';
          if (nextStatus === 'taken') {
            confetti({
              particleCount: 20,
              spread: 50,
              origin: { y: 0.7 },
            });
          }
          return { ...e, status: nextStatus };
        }
        return e;
      })
    );
  };

  // Export .ics calendar event for follow-up date
  const exportCalendarEvent = (title: string, dateString: string) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PulseDoc iOS//EN
BEGIN:VEVENT
SUMMARY:Doctor Follow-up: ${title}
DESCRIPTION:Scheduled clinical follow-up for lab review and prescription recheck.
DTSTART;VALUE=DATE:${dateString.replace(/-/g, '')}
DTEND;VALUE=DATE:${dateString.replace(/-/g, '')}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PulseDoc_FollowUp_${dateString}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate 7-day strip
  const days = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() + idx);
    return {
      offset: idx,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      fullDate: d.toISOString().split('T')[0],
    };
  });

  return (
    <div className="space-y-4 pb-20">
      <div className="pt-1">
        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">
          Adherence & Schedule
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Treatment Timeline
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Organized daily regimen based on your doctor's exact instructions and follow-up milestones.
        </p>
      </div>

      {/* 7-Day Date Selector Strip */}
      <div className="flex items-center justify-between space-x-1.5 overflow-x-auto pb-1">
        {days.map((d) => {
          const isSelected = selectedDayOffset === d.offset;
          return (
            <button
              key={d.offset}
              onClick={() => setSelectedDayOffset(d.offset)}
              className={`flex-1 py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-white dark:bg-[#1C1C1E] text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider">{d.dayName}</span>
              <span className="text-base font-bold mt-0.5">{d.dateNum}</span>
              {isSelected && <span className="w-1 h-1 bg-white rounded-full mt-1" />}
            </button>
          );
        })}
      </div>

      {/* Daily Timeline Events */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Medication Schedule ({timelineEvents.length} slots)
          </h3>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            {timelineEvents.filter((e) => e.status === 'taken').length} of {timelineEvents.length} logged
          </span>
        </div>

        {timelineEvents.length === 0 ? (
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-8 text-center text-xs text-neutral-400 border border-neutral-200/80 dark:border-neutral-800">
            No medication schedule specified in this document.
          </div>
        ) : (
          <div className="space-y-2.5">
            {timelineEvents.map((event, idx) => {
              const isTaken = event.status === 'taken';

              return (
                <div
                  key={event.id || idx}
                  className={`bg-white dark:bg-[#1C1C1E] rounded-3xl p-4 border transition-all shadow-xs flex items-center justify-between ${
                    isTaken
                      ? 'border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20'
                      : 'border-neutral-200/80 dark:border-neutral-800'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 max-w-[70%]">
                    {/* Time slot bubble */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-center min-w-16">
                      <Clock className="w-3.5 h-3.5 text-blue-500 mb-0.5" />
                      <span className="text-[11px] font-mono font-bold text-neutral-900 dark:text-white">
                        {event.timeOfDay}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h4
                        className={`text-sm font-bold leading-snug ${
                          isTaken
                            ? 'line-through text-neutral-400'
                            : 'text-neutral-900 dark:text-white'
                        }`}
                      >
                        {event.medicineName}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {event.mealRelation} • {event.frequency}
                      </p>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Duration: {event.durationDays}
                      </span>
                    </div>
                  </div>

                  {/* Log button */}
                  <button
                    onClick={() => toggleEventStatus(event.id)}
                    className={`p-3 rounded-2xl transition-all active:scale-90 ${
                      isTaken
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {isTaken ? (
                      <CheckCircle2 className="w-5 h-5 fill-current" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Follow-up Milestones Card */}
      {report.timeline.some((t) => t.followUpDate) ? (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-5 shadow-lg shadow-blue-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-200" />
              <h3 className="font-bold text-sm">Physician Follow-up Milestone</h3>
            </div>
            <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-mono">
              Scheduled
            </span>
          </div>

          {report.timeline
            .filter((t) => t.followUpDate)
            .map((t, idx) => (
              <div key={idx} className="flex items-center justify-between pt-1">
                <div>
                  <div className="font-bold text-base">{t.followUpDate}</div>
                  <div className="text-xs text-blue-100">
                    Repeat lab evaluation for {t.medicineName}
                  </div>
                </div>

                <button
                  onClick={() => exportCalendarEvent(report.title, t.followUpDate!)}
                  className="bg-white text-blue-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm active:scale-95 transition-transform"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to iOS Calendar</span>
                </button>
              </div>
            ))}
        </div>
      ) : null}

      {/* Historical Trend Tracking Widget */}
      <div className="bg-white dark:bg-[#1C1C1E] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Biomarker Progression
            </h3>
          </div>
          <span className="text-[11px] text-neutral-400">Past 3 Test Cycles</span>
        </div>

        <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between font-semibold text-neutral-700 dark:text-neutral-300">
            <span>Primary Marker Tracked:</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {report.tests[0]?.name || 'Fasting Glucose'}
            </span>
          </div>
          <div className="flex items-end justify-between h-20 pt-2 px-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[10px] font-mono text-neutral-400">Baseline</span>
              <div className="w-8 bg-blue-300 dark:bg-blue-800 rounded-t-lg h-10" />
              <span className="text-[10px] text-neutral-400">-12 mo</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[10px] font-mono text-neutral-400">Interim</span>
              <div className="w-8 bg-blue-400 dark:bg-blue-600 rounded-t-lg h-12" />
              <span className="text-[10px] text-neutral-400">-6 mo</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">Current</span>
              <div className="w-8 bg-blue-600 rounded-t-lg h-16" />
              <span className="text-[10px] font-bold text-neutral-900 dark:text-white">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
