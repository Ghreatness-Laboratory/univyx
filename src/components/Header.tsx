import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  PenSquare,
  Search,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsDrawerOpen,
    setIsComposerOpen,
    theme,
    setTheme,
    unreadNotificationsCount,
    universities,
    selectedUniversityId,
    setSelectedUniversityId,
    currentUser
  } = useApp();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-left focus:outline-none group"
          >
            {/* Official univyX Emblem */}
            <div className="w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 512 512" className="w-full h-full fill-white dark:fill-black stroke-white dark:stroke-black stroke-[30] stroke-linecap-round stroke-linejoin-round">
                <rect x="186" y="112" width="34" height="52" rx="17" transform="rotate(-22 203 138)" stroke="none"/>
                <rect x="178" y="348" width="52" height="34" rx="17" transform="rotate(-30 204 365)" stroke="none"/>
                <path d="M 235,260 L 98,228" strokeWidth="50"/>
                <path d="M 235,260 L 420,180" strokeWidth="50"/>
                <path d="M 235,260 L 210,195" strokeWidth="50"/>
                <path d="M 235,260 L 338,416" strokeWidth="52"/>
                <circle cx="235" cy="260" r="30" stroke="none"/>
              </svg>
            </div>
            <span className="text-lg font-black tracking-wider text-slate-900 dark:text-white uppercase font-sans">
              univy<span className="text-[#1D9BF0]">X</span>
            </span>
          </button>

          {/* Quick University Badge on Mobile/Desktop */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-[#1D9BF0]" />
            <select
              value={selectedUniversityId}
              onChange={(e) => setSelectedUniversityId(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer py-1"
            >
              <option value="all" className="dark:bg-[#16181C]">All Campuses</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id} className="dark:bg-[#16181C]">
                  {u.short_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'home' ? 'text-[#1D9BF0] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('entertainment')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'entertainment' ? 'text-[#1D9BF0] font-semibold' : ''
            }`}
          >
            Entertainment
          </button>
          <button
            onClick={() => setActiveTab('academics')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'academics' ? 'text-[#1D9BF0] font-semibold' : ''
            }`}
          >
            Academics & CIVYN
          </button>
          <button
            onClick={() => setActiveTab('arena')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'arena' ? 'text-[#1D9BF0] font-semibold' : ''
            }`}
          >
            Arena
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'store' ? 'text-[#1D9BF0] font-semibold' : ''
            }`}
          >
            Store
          </button>
          {currentUser && (currentUser.role === 'admin' || currentUser.role === 'superadmin' || currentUser.role === 'moderator') && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1 transition-colors whitespace-nowrap ${
                activeTab === 'admin' ? 'text-[#1D9BF0] font-semibold' : 'text-amber-500 hover:text-amber-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Actions (Search, Post, Notifs, Theme, Install) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('search')}
            title="Search campus"
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          <PWAInstallButton />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle color theme"
            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            title="Notifications"
            className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#1D9BF0]" />
            )}
          </button>

          {/* Primary Action: Post Composer Trigger */}
          <button
            onClick={() => setIsComposerOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1D9BF0] text-white text-xs font-semibold hover:bg-[#1A8CD8] active:scale-95 transition-all shadow-xs"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
        </div>
      </div>
    </header>
  );
};
