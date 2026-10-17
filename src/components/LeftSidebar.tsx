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
    { id: 'entertainment', label: 'Feed', icon: Sparkles },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'arena', label: 'Arena', icon: Trophy },
    { id: 'store', label: 'Store', icon: ShoppingBag },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
    { id: 'bookmarks', label: 'Saved Posts', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const userDisplayName = currentUser?.fullName || currentUser?.full_name || 'Scholar';
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between py-4 px-3 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-border bg-surface/50">
      {/* Top Navigation Links */}
      <div className="space-y-1">
        {/* Brand Lockup in sidebar */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 px-3 py-2.5 mb-2 rounded-[14px] cursor-pointer hover:bg-surface transition-colors"
        >
          <div className="w-7 h-7 rounded-[8px] btn-primary-gradient flex items-center justify-center p-1 shadow-xs shrink-0">
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
          <div>
            <div className="text-[17px] font-bold text-text leading-none tracking-tight">
              Univyx
            </div>
            <div className="text-[10px] text-text-muted font-medium mt-1">
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors duration-150 cursor-pointer ${
                isActive
                  ? 'bg-accent-soft text-accent font-bold'
                  : 'text-text-muted hover:bg-surface hover:text-text'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-accent' : 'text-text-muted'
                  }`}
                  strokeWidth={1.5}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-live text-white text-[10px] font-bold leading-none">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        {/* Primary Desktop Post Composer Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsComposerOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full btn-primary-gradient text-white text-[13px] font-bold shadow-xs active:scale-95 transition-transform duration-150 cursor-pointer"
          >
            <PenSquare className="w-4 h-4 text-white" strokeWidth={1.5} />
            <span>Post</span>
          </button>
        </div>
      </div>

      {/* Bottom Mini User Profile Card */}
      {currentUser && (
        <div
          onClick={() => setActiveTab('profile')}
          className="p-2 rounded-xl hover:bg-surface cursor-pointer transition-colors flex items-center gap-2.5 border border-transparent hover:border-border"
        >
          <div className="w-8 h-8 rounded-full avatar-gradient font-bold text-[11px] text-white flex items-center justify-center shrink-0 shadow-xs">
            {userInitial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h4 className="text-[12px] font-bold text-text truncate">
                {userDisplayName}
              </h4>
              {(currentUser.isVerified || currentUser.is_verified) && (
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={1.5} />
              )}
            </div>
            <p className="text-[10.5px] text-text-muted truncate">
              @{currentUser.username}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
