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
    { id: 'entertainment', label: 'Feed', icon: Sparkles },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'arena', label: 'Arena', icon: Trophy },
    { id: 'store', label: 'Store', icon: ShoppingBag }
  ];

  return (
    <>
      {/* Requirement 7: Floating compose button: gradient circle, bottom right, above the nav */}
      <button
        onClick={() => setIsComposerOpen(true)}
        aria-label="Create new post"
        title="Create new post"
        className="lg:hidden fixed right-4 bottom-20 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-[#4C8DFF] to-[#7B5CFF] text-white flex items-center justify-center shadow-xl shadow-[#4C8DFF]/35 hover:opacity-95 active:scale-90 transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4C8DFF] focus-visible:outline-none"
      >
        <PenSquare className="w-6 h-6" strokeWidth={2} />
      </button>

      {/* Requirement 8: Bottom nav: Home, Feed, Academics, Arena, Store */}
      <nav
        aria-label="Mobile navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0A0F1E]/95 backdrop-blur-md border-t border-[#EFF3F4] dark:border-[#1E2846] pt-1.5 pb-safe transition-colors duration-150"
      >
        <div className="grid grid-cols-5 items-center h-14 px-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="flex justify-center items-center">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[44px] min-w-[54px] flex flex-col items-center justify-center py-1 transition-all duration-150 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4C8DFF] focus-visible:outline-none ${
                    isActive
                      ? 'bg-[#4C8DFF]/15 text-[#4C8DFF] px-3.5 rounded-full'
                      : 'text-[#536471] dark:text-[#8A94B3] hover:text-[#0F1419] dark:hover:text-[#F2F5FF] px-2'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-150 ${
                      isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.8]'
                    }`}
                  />
                  <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap font-medium ${
                    isActive ? 'font-bold text-[#4C8DFF]' : 'text-[#8A94B3]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};
