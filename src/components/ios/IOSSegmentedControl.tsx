import React from 'react';

interface IOSSegmentedControlProps<T extends string> {
  options: { id: T; label: string; count?: number }[];
  selected: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
}

export function IOSSegmentedControl<T extends string>({
  options,
  selected,
  onChange,
  size = 'md',
}: IOSSegmentedControlProps<T>) {
  return (
    <div
      className={`relative flex items-center bg-neutral-200/80 dark:bg-neutral-800/90 p-1 rounded-xl select-none backdrop-blur-md ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      }`}
    >
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`flex-1 relative z-10 py-1.5 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1.5 ${
              isSelected
                ? 'text-neutral-900 dark:text-white font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                    : 'bg-neutral-300/60 dark:bg-neutral-700/60 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {option.count}
              </span>
            )}
            {isSelected && (
              <div className="absolute inset-0 bg-white dark:bg-neutral-700/90 rounded-lg -z-10 shadow-xs border border-black/5 dark:border-white/10" />
            )}
          </button>
        );
      })}
    </div>
  );
}
