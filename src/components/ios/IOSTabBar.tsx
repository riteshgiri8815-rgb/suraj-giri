import React from 'react';
import {
  Home,
  PlusCircle,
  Activity,
  HeartPulse,
  Clock,
  History,
  Pill,
} from 'lucide-react';
import { ActiveTab } from '../../types/medical';

interface IOSTabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  abnormalCount?: number;
  medsCount?: number;
}

export const IOSTabBar: React.FC<IOSTabBarProps> = ({
  activeTab,
  onTabChange,
  abnormalCount = 0,
  medsCount = 0,
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload', icon: PlusCircle },
    { id: 'analysis', label: 'Analysis', icon: Activity, badge: abnormalCount },
    { id: 'diseases', label: 'Diseases', icon: HeartPulse },
    { id: 'medicines', label: 'Medicines', icon: Pill, badge: medsCount },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <nav
      aria-label="iOS Tab Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/85 dark:bg-[#161618]/85 backdrop-blur-xl border-t border-neutral-200/80 dark:border-neutral-800/80 pb-safe transition-colors duration-200"
    >
      <div className="max-w-xl mx-auto flex items-center justify-around px-1 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-0.5 relative transition-all duration-150 active:scale-90 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
