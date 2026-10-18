import React from 'react';
import { useApp } from '../context/AppContext';
import { useScrollDirection } from '../hooks/useScrollDirection';
import {
  Home,
  Sparkles,
  Plus,
  Trophy,
  ShoppingBag
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsComposerOpen } = useApp();
  const isVisible = useScrollDirection();

  return (
    <nav
      aria-label="Mobile navigation"
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-nav/95 backdrop-blur-md border-t border-border transition-transform duration-150 ease-out pb-safe ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-5 items-center h-[56px] px-1 max-w-md mx-auto">
        {/* 1. Home */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => setActiveTab('home')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              activeTab === 'home'
                ? 'bg-accent-soft text-accent px-3 py-1 rounded-full'
                : 'text-text-muted hover:text-text px-2'
            }`}
          >
            <Home
              className={`w-5 h-5 transition-transform duration-150 ${
                activeTab === 'home' ? 'scale-105 stroke-[2] text-accent' : 'stroke-[1.5] text-text-muted'
              }`}
            />
            <span
              className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap leading-none ${
                activeTab === 'home' ? 'font-bold text-accent' : 'font-medium text-text-muted'
              }`}
            >
              Home
            </span>
          </button>
        </div>

        {/* 2. Feed */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => setActiveTab('entertainment')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              activeTab === 'entertainment'
                ? 'bg-accent-soft text-accent px-3 py-1 rounded-full'
                : 'text-text-muted hover:text-text px-2'
            }`}
          >
            <Sparkles
              className={`w-5 h-5 transition-transform duration-150 ${
                activeTab === 'entertainment' ? 'scale-105 stroke-[2] text-accent' : 'stroke-[1.5] text-text-muted'
              }`}
            />
            <span
              className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap leading-none ${
                activeTab === 'entertainment' ? 'font-bold text-accent' : 'font-medium text-text-muted'
              }`}
            >
              Feed
            </span>
          </button>
        </div>

        {/* 3. [Center Post] - Raised 42px gradient circle with plus icon & Post label (replaces FAB) */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => setIsComposerOpen(true)}
            aria-label="Open post composer"
            className="flex flex-col items-center justify-center -mt-3.5 group cursor-pointer active:scale-95 transition-transform duration-150 touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <div className="w-[42px] h-[42px] rounded-full btn-primary-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-150">
              <Plus className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-text mt-0.5 leading-none select-none">
              Post
            </span>
          </button>
        </div>

        {/* 4. Arena */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => setActiveTab('arena')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              activeTab === 'arena'
                ? 'bg-accent-soft text-accent px-3 py-1 rounded-full'
                : 'text-text-muted hover:text-text px-2'
            }`}
          >
            <Trophy
              className={`w-5 h-5 transition-transform duration-150 ${
                activeTab === 'arena' ? 'scale-105 stroke-[2] text-accent' : 'stroke-[1.5] text-text-muted'
              }`}
            />
            <span
              className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap leading-none ${
                activeTab === 'arena' ? 'font-bold text-accent' : 'font-medium text-text-muted'
              }`}
            >
              Arena
            </span>
          </button>
        </div>

        {/* 5. Store */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => setActiveTab('store')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              activeTab === 'store'
                ? 'bg-accent-soft text-accent px-3 py-1 rounded-full'
                : 'text-text-muted hover:text-text px-2'
            }`}
          >
            <ShoppingBag
              className={`w-5 h-5 transition-transform duration-150 ${
                activeTab === 'store' ? 'scale-105 stroke-[2] text-accent' : 'stroke-[1.5] text-text-muted'
              }`}
            />
            <span
              className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap leading-none ${
                activeTab === 'store' ? 'font-bold text-accent' : 'font-medium text-text-muted'
              }`}
            >
              Store
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
