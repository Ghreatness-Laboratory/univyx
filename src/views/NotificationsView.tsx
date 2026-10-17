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
import { VerifiedBadge } from '../components/VerifiedBadge';

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
      <div className="flex items-center justify-between pb-3 border-b border-[#EFF3F4] dark:border-[#2F3336]">
        <div>
          <h2 className="page-title text-[20px] font-extrabold text-[#0F1419] dark:text-[#E7E9EA] tracking-tight">
            Notifications
          </h2>
          <p className="text-[13px] text-[#536471] dark:text-[#71767B] mt-0.5">
            Real-time interactions, mentions, and official campus announcements.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1 text-[13px] text-[#1D9BF0] hover:underline font-semibold cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="space-y-2.5">
        {notifications.length === 0 ? (
          <div className="py-16 text-center text-[15px] text-[#536471] dark:text-[#71767B]">
            You are all caught up! No new notifications.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-3.5 rounded-2xl border transition-colors flex items-start gap-3 cursor-pointer ${
                notif.is_read
                  ? 'bg-white dark:bg-[#000000] border-[#EFF3F4] dark:border-[#2F3336] text-[#536471] dark:text-[#71767B]'
                  : 'bg-blue-50/40 dark:bg-[#16181C] border-[#1D9BF0]/30 text-[#0F1419] dark:text-[#E7E9EA]'
              }`}
            >
              <div className="p-2.5 rounded-full bg-slate-100 dark:bg-[#16181C] shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[13px] text-[#536471] dark:text-[#71767B] mb-0.5">
                  <div className="flex items-center gap-1">
                    <span className="display-name font-bold text-[15px] text-[#0F1419] dark:text-[#E7E9EA]">
                      {notif.actor_name || notif.actorName || 'Scholar'}
                    </span>
                    <VerifiedBadge
                      type={notif.actor_verification_tier || notif.actorVerificationTier || 'none'}
                      size="small"
                    />
                  </div>
                  <span className="timestamp-text font-normal text-[13px] text-[#536471] dark:text-[#71767B]">
                    {new Date(notif.created_at || notif.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="post-text text-[15px] leading-[20px] text-[#0F1419] dark:text-[#E7E9EA]">
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
