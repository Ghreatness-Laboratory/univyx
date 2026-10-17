import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Bookmark,
  Building2,
  Briefcase,
  Store as StoreIcon,
  Settings,
  HelpCircle,
  Info,
  ShieldAlert,
  LogOut,
  CheckCircle2,
  FileText,
  Users,
  Radio,
  Mail
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const SideDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    currentUser,
    signOut,
    setActiveTab,
    showToast
  } = useApp();

  if (!isDrawerOpen) return null;

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setIsDrawerOpen(false);
    showToast('Signed out of session');
  };

  const userDisplayName = currentUser?.fullName || currentUser?.full_name || 'Scholar';
  const userInitial = userDisplayName.charAt(0).toUpperCase();
  const universityName = currentUser?.universityName || currentUser?.university_name || 'Verified University Scholar';
  const followingCount = currentUser?.followingCount ?? currentUser?.following_count ?? 182;
  const followersCount = currentUser?.followersCount ?? currentUser?.followers_count ?? 248;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Body */}
      <div className="relative w-72 sm:w-80 max-w-[85vw] bg-white dark:bg-[#0A0A0A] h-full shadow-2xl flex flex-col z-10 border-r border-slate-200 dark:border-slate-800">
        {/* User Identity Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#1D9BF0]/15 text-[#1D9BF0] font-bold flex items-center justify-center text-sm border border-[#1D9BF0]/30 shrink-0">
                {userInitial}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {userDisplayName}
                  </h3>
                  {(currentUser.isVerified || currentUser.is_verified) && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9BF0] shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate">
                  @{currentUser.username}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5 font-medium">
                  {universityName}
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
                <p className="text-xs text-slate-500">Private campus network</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Following / Followers Counts */}
        {currentUser && (
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-5 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">
                {followingCount}
              </span>{' '}
              Following
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">
                {followersCount}
              </span>{' '}
              Followers
            </div>
          </div>
        )}

        {/* Scrollable Navigation Links (Strictly matching user spec) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 text-sm">
          <button
            onClick={() => navigateTo('rooms')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <Radio className="w-4 h-4 text-purple-500" />
            <span>Gist Rooms</span>
          </button>

          <button
            onClick={() => navigateTo('messages')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <Mail className="w-4 h-4 text-[#1D9BF0]" />
            <span>Direct Messages</span>
          </button>

          <button
            onClick={() => navigateTo('profile')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => navigateTo('bookmarks')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span>Saved Posts</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('home');
              setIsDrawerOpen(false);
              showToast('Viewing following network feed');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <Users className="w-4 h-4 text-slate-500" />
            <span>Following</span>
          </button>

          <button
            onClick={() => navigateTo('academics')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>My University</span>
          </button>

          <button
            onClick={() => navigateTo('academics')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <Briefcase className="w-4 h-4 text-[#1D9BF0]" />
            <span>CIVYN Opportunities</span>
          </button>

          <button
            onClick={() => navigateTo('store')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <StoreIcon className="w-4 h-4 text-slate-500" />
            <span>My Store</span>
          </button>

          <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 my-2" />

          <button
            onClick={() => navigateTo('settings')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              showToast('Univyx Help Center: Reach student support at help@univyx.ng');
              setIsDrawerOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Help</span>
          </button>

          <button
            onClick={() => navigateTo('about')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <Info className="w-4 h-4 text-slate-500" />
            <span>About Univyx</span>
          </button>

          <button
            onClick={() => navigateTo('privacy')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <ShieldAlert className="w-4 h-4 text-slate-500" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => navigateTo('privacy')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left font-medium"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Terms</span>
          </button>

          {/* PWA Install Entry in Menu */}
          <div className="pt-1">
            <PWAInstallButton variant="menu-item" />
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          {currentUser ? (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                showToast('Welcome to Univyx!');
                setIsDrawerOpen(false);
              }}
              className="w-full py-2 text-xs font-semibold text-white bg-[#1D9BF0] rounded-xl hover:bg-[#1A8CD8] transition-colors"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
