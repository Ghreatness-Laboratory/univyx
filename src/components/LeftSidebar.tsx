import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Sparkles,
  GraduationCap,
  Trophy,
  ShoppingBag,
  User,
  Bookmark,
  Bell,
  Settings,
  PenSquare,
  CheckCircle2,
  Radio,
  Mail
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsComposerOpen,
    currentUser,
    unreadNotificationsCount,
    unreadMessagesCount
  } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rooms', label: 'Gist Rooms', icon: Radio },
    { id: 'messages', label: 'Messages', icon: Mail, badge: unreadMessagesCount },
    { id: 'entertainment', label: 'Entertainment', icon: Sparkles },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'arena', label: 'Univyx Arena', icon: Trophy },
    { id: 'store', label: 'Store', icon: ShoppingBag },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
    { id: 'bookmarks', label: 'Saved Posts', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const userDisplayName = currentUser?.fullName || currentUser?.full_name || 'Scholar';
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between py-4 px-3 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-slate-200 dark:border-slate-800">
      {/* Top Navigation Links */}
      <div className="space-y-1">
        {/* Brand Lockup in sidebar */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 px-3.5 py-3 mb-2 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-[#111316] transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center p-1.5 shadow-xs">
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
          <div>
            <div className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              Univyx
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-tight mt-1">
              Private University Network
            </div>
          </div>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-slate-100 dark:bg-[#16181C] text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#111316] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-[#1D9BF0]' : 'text-slate-500 dark:text-slate-400'
                  }`}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-[#1D9BF0] text-white text-[10px] font-bold">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        {/* Primary Desktop Post Composer Button */}
        <div className="pt-3">
          <button
            onClick={() => setIsComposerOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1D9BF0] text-white text-sm font-bold hover:bg-[#1A8CD8] active:scale-[0.98] transition-all shadow-sm"
          >
            <PenSquare className="w-4 h-4" />
            <span>Post</span>
          </button>
        </div>
      </div>

      {/* Bottom Mini User Profile Card */}
      {currentUser && (
        <div
          onClick={() => setActiveTab('profile')}
          className="p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-[#16181C] cursor-pointer transition-colors flex items-center gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
        >
          <div className="w-10 h-10 rounded-full bg-[#1D9BF0]/15 text-[#1D9BF0] font-bold flex items-center justify-center shrink-0 border border-[#1D9BF0]/30 text-sm">
            {userInitial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {userDisplayName}
              </h4>
              {(currentUser.isVerified || currentUser.is_verified) && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9BF0] shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              @{currentUser.username}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
