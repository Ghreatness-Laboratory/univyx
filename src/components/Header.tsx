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
    <header className="sticky top-0 z-30 w-full bg-surface/95 backdrop-blur-md border-b border-border transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Left: Hamburger Drawer + Gradient Logo Tile + "Univyx" Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg"
            aria-label="Univyx Home"
          >
            {/* Gradient Logo Tile */}
            <div className="w-8 h-8 rounded-[10px] btn-primary-gradient flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 active:scale-95 transition-all duration-150">
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
            <span className="text-xl font-bold tracking-tight text-text select-none font-sans">
              Univyx
            </span>
          </button>

          {/* Searchable University Selector (Tablet & Desktop) */}
          <div className="hidden md:flex items-center gap-1.5 ml-2 pl-3 border-l border-border text-xs text-text-muted">
            <Building2 className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={1.8} />
            <select
              value={selectedUniversityId}
              onChange={(e) => setSelectedUniversityId(e.target.value)}
              aria-label="Filter campus feed"
              className="bg-transparent border-none text-xs font-semibold text-text-muted focus:text-text focus:outline-none cursor-pointer py-1 max-w-[170px] truncate"
            >
              <option value="all" className="bg-surface text-text">All Private Campuses</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id} className="bg-surface text-text">
                  {u.shortName || u.short_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-text-muted">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'home' ? 'text-accent font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('entertainment')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'entertainment' ? 'text-accent font-semibold' : ''
            }`}
          >
            Entertainment
          </button>
          <button
            onClick={() => setActiveTab('academics')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'academics' ? 'text-accent font-semibold' : ''
            }`}
          >
            Academics
          </button>
          <button
            onClick={() => setActiveTab('arena')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'arena' ? 'text-accent font-semibold' : ''
            }`}
          >
            Univyx Arena
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'store' ? 'text-accent font-semibold' : ''
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
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <Search className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
          </button>

          {/* Install PWA Button */}
          <PWAInstallButton />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle color theme"
            aria-pressed={theme === 'dark'}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-text-muted hover:text-amber-400" strokeWidth={1.8} />
            ) : (
              <Moon className="w-5 h-5 text-text-muted hover:text-accent" strokeWidth={1.8} />
            )}
          </button>

          {/* Notification Bell with small red unread dot */}
          <button
            onClick={() => setActiveTab('notifications')}
            title="Notifications"
            aria-label="Notifications"
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <Bell className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
            {/* Small red unread dot */}
            <span
              className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-surface"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
