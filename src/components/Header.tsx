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
    theme,
    setTheme,
    universities,
    selectedUniversityId,
    setSelectedUniversityId,
    isDrawerOpen,
    setIsDrawerOpen
  } = useApp();

  return (
    <header className="sticky top-0 z-30 w-full h-[56px] bg-surface/95 backdrop-blur-md border-b border-border transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 h-full flex items-center justify-between gap-2">
        {/* Left: Hamburger menu (18px, 2px stroke, far left, always visible) + 28px logo tile + Univyx wordmark */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Hamburger Menu Icon (3 lines, 18px, 2px stroke, opens the sidebar/drawer, never dropped on small screens) */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none shrink-0"
            aria-label="Open navigation menu"
            aria-expanded={isDrawerOpen}
            title="Menu"
          >
            <Menu className="w-[18px] h-[18px] text-text" strokeWidth={2} />
          </button>

          {/* Logo Tile (28px) + "Univyx" Wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg active:scale-95 transition-transform duration-150 shrink-0"
            aria-label="Univyx Home"
          >
            {/* Gradient Logo Tile: 28px x 28px */}
            <div className="w-[28px] h-[28px] rounded-[8px] btn-primary-gradient flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform duration-150 shrink-0">
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
            {/* Wordmark: Univyx */}
            <span className="text-[17px] font-bold text-text leading-none select-none tracking-tight">
              Univyx
            </span>
          </button>

          {/* Campus Filter (Tablet & Desktop only) */}
          <div className="hidden md:flex items-center gap-1.5 ml-2 pl-3 border-l border-border text-xs text-text-muted">
            <Building2 className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={1.5} />
            <select
              value={selectedUniversityId}
              onChange={(e) => setSelectedUniversityId(e.target.value)}
              aria-label="Filter campus feed"
              className="bg-transparent border-none text-[11px] font-medium text-text-muted focus:text-text focus:outline-none cursor-pointer py-0.5 max-w-[150px] truncate"
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

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-text-muted">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'home' ? 'text-accent font-bold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('entertainment')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'entertainment' ? 'text-accent font-bold' : ''
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => setActiveTab('academics')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'academics' ? 'text-accent font-bold' : ''
            }`}
          >
            Academics
          </button>
          <button
            onClick={() => setActiveTab('arena')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'arena' ? 'text-accent font-bold' : ''
            }`}
          >
            Arena
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`transition-colors duration-150 whitespace-nowrap hover:text-text cursor-pointer ${
              activeTab === 'store' ? 'text-accent font-bold' : ''
            }`}
          >
            Store
          </button>
        </nav>

        {/* Right: Search, Install, Theme toggle, and Notification bell with red unread dot */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Search Button */}
          <button
            onClick={() => setActiveTab('search')}
            title="Search Univyx"
            aria-label="Search"
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <Search className="w-[18px] h-[18px] text-text-muted" strokeWidth={1.8} />
          </button>

          {/* Install PWA Button */}
          <PWAInstallButton className="w-10 h-10" />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle color theme"
            aria-pressed={theme === 'dark'}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            {theme === 'dark' ? (
              <Sun className="w-[18px] h-[18px] text-text-muted hover:text-amber-400" strokeWidth={1.8} />
            ) : (
              <Moon className="w-[18px] h-[18px] text-text-muted hover:text-accent" strokeWidth={1.8} />
            )}
          </button>

          {/* Notification Bell with red unread dot */}
          <button
            onClick={() => setActiveTab('notifications')}
            title="Notifications"
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <Bell className="w-[18px] h-[18px] text-text-muted" strokeWidth={1.8} />
            <span
              className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-live ring-2 ring-surface"
              aria-label="Unread notifications indicator"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
