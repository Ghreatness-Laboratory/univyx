import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Bookmark,
  Bell,
  Building2,
  Briefcase,
  Store as StoreIcon,
  Settings,
  HelpCircle,
  Info,
  ShieldAlert,
  LogOut,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const SideDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    currentUser,
    setActiveTab,
    setCurrentUser,
    showToast
  } = useApp();

  if (!isDrawerOpen) return null;

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsDrawerOpen(false);
    showToast('Signed out of univyX session');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-[#16181C] shadow-2xl flex flex-col z-10 border-r border-slate-200 dark:border-slate-800 transition-transform">
        {/* Brand Banner */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-black dark:bg-white text-white dark:text-black flex items-center justify-center p-1">
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
            <span className="text-sm font-black tracking-wider text-slate-900 dark:text-white uppercase font-sans">
              univy<span className="text-[#1D9BF0]">X</span>
            </span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#1D9BF0]/15 text-[#1D9BF0] flex items-center justify-center font-bold text-lg shrink-0 border border-[#1D9BF0]/30">
                {currentUser.full_name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {currentUser.full_name}
                  </h3>
                  {currentUser.is_verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9BF0] shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  @{currentUser.username}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                  {currentUser.university_name || 'University Scholar'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Guest Scholar</p>
                <p className="text-xs text-slate-500">Browse campus ecosystem</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Following / Followers Stats (Anti-pill unboxed text) */}
        {currentUser && (
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">
                {currentUser.following_count || 182}
              </span>{' '}
              Following
            </div>
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">
                {currentUser.followers_count || 248}
              </span>{' '}
              Followers
            </div>
          </div>
        )}

        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 text-sm">
          <button
            onClick={() => navigateTo('profile')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => navigateTo('bookmarks')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span>Saved Posts & Bookmarks</span>
          </button>

          <button
            onClick={() => navigateTo('notifications')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Bell className="w-4 h-4 text-slate-500" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => navigateTo('academics')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>My University & Academics</span>
          </button>

          <button
            onClick={() => navigateTo('academics')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Briefcase className="w-4 h-4 text-[#1D9BF0]" />
            <span>CIVYN Opportunities</span>
          </button>

          <button
            onClick={() => navigateTo('store')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <StoreIcon className="w-4 h-4 text-slate-500" />
            <span>Campus Store & Vendors</span>
          </button>

          {/* Admin panel link */}
          {currentUser && (currentUser.role === 'admin' || currentUser.role === 'superadmin' || currentUser.role === 'moderator') && (
            <button
              onClick={() => navigateTo('admin')}
              className="w-full flex items-center gap-3 px-3 py-2 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors text-left font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Admin Dashboard</span>
            </button>
          )}

          <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 my-2" />

          {/* PWA Install Entry in Menu */}
          <PWAInstallButton variant="menu-item" />

          <button
            onClick={() => navigateTo('settings')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Settings & Themes</span>
          </button>

          <button
            onClick={() => navigateTo('about')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Info className="w-4 h-4 text-slate-500" />
            <span>About univyX</span>
          </button>

          <button
            onClick={() => navigateTo('privacy')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <ShieldAlert className="w-4 h-4 text-slate-500" />
            <span>Privacy & Guidelines</span>
          </button>
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          {currentUser ? (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                showToast('Guest mode: Click any action to explore');
                setIsDrawerOpen(false);
              }}
              className="w-full py-2 text-xs font-semibold text-white bg-[#1D9BF0] rounded-lg hover:bg-[#1A8CD8] transition-colors"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
