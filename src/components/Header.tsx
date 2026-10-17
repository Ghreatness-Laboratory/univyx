import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  Search,
  Building2
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsDrawerOpen,
    theme,
    setTheme,
    unreadNotificationsCount,
    universities,
    selectedUniversityId,
    setSelectedUniversityId
  } = useApp();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#0A0F1E]/95 backdrop-blur-md border-b border-[#EFF3F4] dark:border-[#1E2846] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Left: Hamburger Drawer + Gradient Logo Tile + "Univyx" Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#536471] dark:text-[#8A94B3] hover:text-[#4C8DFF] dark:hover:text-[#F2F5FF] hover:bg-slate-100 dark:hover:bg-[#121A30] rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.8} />
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            aria-label="Univyx Home"
          >
            {/* Gradient Logo Tile */}
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#4C8DFF] to-[#7B5CFF] text-white flex items-center justify-center p-1.5 shadow-md shadow-[#4C8DFF]/25 group-hover:scale-105 active:scale-95 transition-all duration-150">
              <svg viewBox="0 0 512 512" className="w-full h-full fill-white stroke-white stroke-[28] stroke-linecap-round stroke-linejoin-round">
                <rect x="186" y="112" width="34" height="52" rx="17" transform="rotate(-22 203 138)" stroke="none"/>
                <rect x="178" y="348" width="52" height="34" rx="17" transform="rotate(-30 204 365)" stroke="none"/>
                <path d="M 235,260 L 98,228" strokeWidth="50"/>
                <path d="M 235,260 L 420,180" strokeWidth="50"/>
                <path d="M 235,260 L 210,195" strokeWidth="50"/>
                <path d="M 235,260 L 338,416" strokeWidth="52"/>
                <circle cx="235" cy="260" r="30" stroke="none"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F1419] dark:text-[#F2F5FF] select-none font-sans">
              Univyx
            </span>
          </button>

          {/* Searchable University Selector (Tablet & Desktop) */}
          <div className="hidden md:flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200 dark:border-[#1E2846] text-xs text-[#536471] dark:text-[#8A94B3]">
            <Building2 className="w-3.5 h-3.5 text-[#4C8DFF] shrink-0" strokeWidth={1.8} />
            <select
              value={selectedUniversityId}
              onChange={(e) => setSelectedUniversityId(e.target.value)}
              aria-label="Filter campus feed"
              className="bg-transparent border-none text-xs font-semibold text-slate-700 dark:text-[#8A94B3] focus:outline-none cursor-pointer py-1 max-w-[170px] truncate"
            >
              <option value="all" className="dark:bg-[#121A30]">All Private Campuses</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id} className="dark:bg-[#121A30]">
                  {u.shortName || u.short_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#536471] dark:text-[#8A94B3]">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-[#0F1419] dark:hover:text-[#F2F5FF] cursor-pointer ${
              activeTab === 'home' ? 'text-[#4C8DFF] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('entertainment')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-[#0F1419] dark:hover:text-[#F2F5FF] cursor-pointer ${
              activeTab === 'entertainment' ? 'text-[#4C8DFF] font-semibold' : ''
            }`}
          >
            Entertainment
          </button>
          <button
            onClick={() => setActiveTab('academics')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-[#0F1419] dark:hover:text-[#F2F5FF] cursor-pointer ${
              activeTab === 'academics' ? 'text-[#4C8DFF] font-semibold' : ''
            }`}
          >
            Academics
          </button>
          <button
            onClick={() => setActiveTab('arena')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-[#0F1419] dark:hover:text-[#F2F5FF] cursor-pointer ${
              activeTab === 'arena' ? 'text-[#4C8DFF] font-semibold' : ''
            }`}
          >
            Univyx Arena
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-[#0F1419] dark:hover:text-[#F2F5FF] cursor-pointer ${
              activeTab === 'store' ? 'text-[#4C8DFF] font-semibold' : ''
            }`}
          >
            Store
          </button>
        </nav>

        {/* Right: Search, Install, Theme toggle, Notification bell with red unread dot */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Search Button */}
          <button
            onClick={() => setActiveTab('search')}
            title="Search Univyx"
            aria-label="Search"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#536471] dark:text-[#8A94B3] hover:text-[#4C8DFF] dark:hover:text-[#F2F5FF] hover:bg-slate-100 dark:hover:bg-[#121A30] rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <Search className="w-5 h-5" strokeWidth={1.8} />
          </button>

          {/* Install PWA Button */}
          <PWAInstallButton />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle color theme"
            aria-pressed={theme === 'dark'}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#536471] dark:text-[#8A94B3] hover:text-[#4C8DFF] dark:hover:text-[#F2F5FF] hover:bg-slate-100 dark:hover:bg-[#121A30] rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[#8A94B3] hover:text-amber-400" strokeWidth={1.8} />
            ) : (
              <Moon className="w-5 h-5 text-[#536471] hover:text-[#4C8DFF]" strokeWidth={1.8} />
            )}
          </button>

          {/* Notification Bell with small red unread dot */}
          <button
            onClick={() => setActiveTab('notifications')}
            title="Notifications"
            aria-label="Notifications"
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#536471] dark:text-[#8A94B3] hover:text-[#4C8DFF] dark:hover:text-[#F2F5FF] hover:bg-slate-100 dark:hover:bg-[#121A30] rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <Bell className="w-5 h-5" strokeWidth={1.8} />
            {/* Small red unread dot */}
            <span
              className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white dark:ring-[#0A0F1E] ${
                unreadNotificationsCount > 0 ? 'opacity-100' : 'opacity-100'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
