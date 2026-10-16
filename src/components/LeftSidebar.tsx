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
  ShieldCheck,
  PenSquare,
  CheckCircle2
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsComposerOpen,
    currentUser,
    unreadNotificationsCount
  } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'entertainment', label: 'Entertainment', icon: Sparkles },
    { id: 'academics', label: 'Academics & CIVYN', icon: GraduationCap },
    { id: 'arena', label: 'univyX Arena', icon: Trophy },
    { id: 'store', label: 'Store', icon: ShoppingBag },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'superadmin' || currentUser?.role === 'moderator';

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between py-4 px-3 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-slate-200 dark:border-slate-800">
      {/* Top Navigation Links */}
      <div className="space-y-1">
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

        {isAdmin && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${
              activeTab === 'admin'
                ? 'bg-amber-500/10 text-amber-500'
                : 'text-amber-500/80 hover:bg-amber-500/10 hover:text-amber-500'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span>Admin Dashboard</span>
          </button>
        )}

        {/* Primary Desktop Post Composer Button */}
        <div className="pt-3">
          <button
            onClick={() => setIsComposerOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1D9BF0] text-white text-sm font-bold hover:bg-[#1A8CD8] active:scale-[0.98] transition-all shadow-md shadow-[#1D9BF0]/15"
          >
            <PenSquare className="w-4 h-4" />
            <span>Post to Campus</span>
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
            {currentUser.full_name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {currentUser.full_name}
              </h4>
              {currentUser.is_verified && (
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
