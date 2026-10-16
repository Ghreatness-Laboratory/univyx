import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCheck,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Briefcase,
  Megaphone
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-[#1D9BF0]" />;
      case 'repost':
        return <Repeat2 className="w-4 h-4 text-green-500" />;
      case 'announcement':
        return <Megaphone className="w-4 h-4 text-amber-500" />;
      case 'opportunity_deadline':
        return <Briefcase className="w-4 h-4 text-[#1D9BF0]" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full min-w-0 p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Notifications
          </h2>
          <p className="text-xs text-slate-500">
            Real-time interactions, mentions, and official campus announcements.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1 text-xs text-[#1D9BF0] hover:underline font-medium"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="space-y-2.5">
        {notifications.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400">
            You are all caught up! No new notifications.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-3.5 rounded-2xl border transition-colors flex items-start gap-3 cursor-pointer text-xs ${
                notif.is_read
                  ? 'bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400'
                  : 'bg-blue-50/50 dark:bg-[#16181C] border-[#1D9BF0]/30 text-slate-800 dark:text-slate-200 font-medium'
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {notif.actor_name || notif.actorName || 'Scholar'}
                  </span>
                  <span>
                    {new Date(notif.created_at || notif.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-normal">
                  {notif.content}
                </p>
              </div>

              {!(notif.is_read ?? notif.isRead) && (
                <span className="w-2 h-2 rounded-full bg-[#1D9BF0] shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
