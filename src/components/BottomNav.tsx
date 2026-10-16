import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Sparkles,
  GraduationCap,
  Trophy,
  ShoppingBag,
  PenSquare
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsComposerOpen } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'entertainment', label: 'Entertainment', icon: Sparkles },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'arena', label: 'Arena', icon: Trophy },
    { id: 'store', label: 'Store', icon: ShoppingBag }
  ];

  return (
    <>
      {/* Floating Action Button for Mobile Post Composition */}
      <button
        onClick={() => setIsComposerOpen(true)}
        aria-label="Create new text post"
        className="lg:hidden fixed right-4 bottom-20 z-40 w-12 h-12 rounded-full bg-[#1D9BF0] text-white flex items-center justify-center shadow-lg hover:bg-[#1A8CD8] active:scale-95 transition-transform"
      >
        <PenSquare className="w-5 h-5" />
      </button>

      {/* Persistent 5-Item Bottom Navigation Bar */}
      <nav
        aria-label="Mobile navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe transition-colors"
      >
        <div className="grid grid-cols-5 items-center h-14">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-colors ${
                  isActive
                    ? 'text-[#1D9BF0]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.25]' : 'stroke-[1.75]'
                  }`}
                />
                <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
