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
      {/* Requirement 7: Floating compose button: 36px gradient circle, bottom right, above the nav */}
      <button
        onClick={() => setIsComposerOpen(true)}
        aria-label="Create new post"
        title="Create new post"
        className="lg:hidden fixed right-4 bottom-20 z-40 w-9 h-9 rounded-full btn-primary-gradient text-white flex items-center justify-center shadow-lg hover:opacity-95 active:scale-95 transition-transform duration-150 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        <PenSquare className="w-4 h-4 text-white" strokeWidth={1.8} />
      </button>

      {/* Requirement 8: Bottom nav (56px + safe-area padding): Home, Feed, Academics, Arena, Store */}
      <nav
        aria-label="Mobile navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-nav/95 backdrop-blur-md border-t border-border transition-colors duration-150 pb-safe"
      >
        <div className="grid grid-cols-5 items-center h-14 px-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="flex justify-center items-center">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[44px] flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                    isActive
                      ? 'bg-accent-soft text-accent px-3 py-1 rounded-full'
                      : 'text-text-muted hover:text-text px-2'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-150 ${
                      isActive ? 'scale-105 stroke-[2] text-accent' : 'stroke-[1.5] text-text-muted'
                    }`}
                  />
                  <span
                    className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap leading-none ${
                      isActive ? 'font-bold text-accent' : 'font-medium text-text-muted'
                    }`}
                  >
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
