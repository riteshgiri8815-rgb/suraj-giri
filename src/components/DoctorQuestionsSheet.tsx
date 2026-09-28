import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, Circle, Plus, Printer, X, Copy, Check } from 'lucide-react';
import { MedicalReport } from '../types/medical';

interface DoctorQuestionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  report: MedicalReport;
}

export const DoctorQuestionsSheet: React.FC<DoctorQuestionsSheetProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const [questions, setQuestions] = useState<string[]>(report.doctorQuestions || []);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [newQuestion, setNewQuestion] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleCheck = (idx: number) => {
    setCheckedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQuestions((prev) => [...prev, newQuestion.trim()]);
    setNewQuestion('');
  };

  const handleCopy = () => {
    const text = `PulseDoc - Questions for My Doctor (${report.title}):\n\n` +
      questions.map((q, idx) => `${idx + 1}. [${checkedQuestions[idx] ? 'X' : ' '}] ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Questions for Your Doctor</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Grounded questions tailored to {report.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500 dark:text-neutral-400 font-medium">
            Take this list to your next clinical appointment:
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center space-x-1 hover:bg-neutral-200"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center space-x-1 hover:bg-neutral-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {questions.map((q, idx) => {
            const isChecked = Boolean(checkedQuestions[idx]);
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                  isChecked
                    ? 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800 opacity-60'
                    : 'bg-white dark:bg-neutral-800/80 border-neutral-200/80 dark:border-neutral-700/80 shadow-xs'
                }`}
              >
                <div className="mt-0.5 text-blue-600 dark:text-blue-400 shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 fill-current text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>
                <div className="text-xs leading-relaxed flex-1">
                  <span className={isChecked ? 'line-through text-neutral-400' : 'text-neutral-800 dark:text-neutral-200'}>
                    {q}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add custom question */}
        <form onSubmit={handleAddQuestion} className="flex items-center space-x-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Add your own question..."
            className="flex-1 text-xs px-3 py-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-transparent focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl active:scale-95"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
