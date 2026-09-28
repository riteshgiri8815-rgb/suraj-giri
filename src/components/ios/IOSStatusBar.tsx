import React, { useState, useEffect } from 'react';
import { Wifi, Signal } from 'lucide-react';

export const IOSStatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format 12-hour or standard iOS 9:41 look
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 select-none z-50">
      <span className="font-semibold text-sm pl-1">{currentTime}</span>
      <div className="flex items-center space-x-2">
        <Signal className="w-3.5 h-3.5 fill-current" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        {/* iOS Battery icon */}
        <div className="flex items-center space-x-0.5">
          <div className="w-6 h-3 border border-neutral-900 dark:border-neutral-100 rounded-[4px] p-0.5 flex items-center">
            <div className="h-full bg-emerald-500 rounded-[2px] w-[88%]" />
          </div>
          <div className="w-0.5 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-r-xs" />
        </div>
      </div>
    </div>
  );
};
