import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';
import { PostComposer } from '../components/PostComposer';
import { CommentsModal } from '../components/CommentsModal';
import { Post } from '../types';
import {
  Sparkles,
  Flame,
  Calendar,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const EntertainmentView: React.FC = () => {
  const { posts, events, selectedUniversityId, setActiveTab } = useApp();
  const [subCategory, setSubCategory] = useState<string>('all');
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);

  const entertainmentCategories = [
    { id: 'all', label: 'All Entertainment' },
    { id: 'gist', label: 'Trending Gist' },
    { id: 'lifestyle', label: 'Student Lifestyle' },
    { id: 'sports', label: 'Sports & Derbies' },
    { id: 'pop_culture', label: 'Music & Culture' },
    { id: 'events', label: 'Campus Events' }
  ];

  const entertainmentPosts = posts.filter((p) => {
    if (selectedUniversityId !== 'all' && p.university_id && p.university_id !== selectedUniversityId) {
      return false;
    }
    return p.category === 'entertainment' || p.category === 'events' || p.category === 'campus_news';
  });

  return (
    <div className="w-full min-w-0">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1D9BF0] mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Campus Culture & Trends</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Campus Entertainment & Gist
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Trending campus conversations, student lifestyle, hostel banter, and event schedules.
        </p>

        {/* Community Safety Notice */}
        <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1D9BF0] shrink-0 mt-0.5" />
          <span>
            <strong>Safety Guideline:</strong> univyX prohibits doxxing, harassment, impersonation, or unverified personal slander. Keep banter lively, creative, and respectful.
          </span>
        </div>
      </div>

      {/* Subcategory Filter Buttons */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50/50 dark:bg-[#111316] border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {entertainmentCategories.map((cat) => {
          const isSelected = subCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSubCategory(cat.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors shrink-0 ${
                isSelected
                  ? 'bg-[#1D9BF0] text-white'
                  : 'bg-white dark:bg-[#16181C] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Featured Campus Events Strip (if subcategory is all or events) */}
      {(subCategory === 'all' || subCategory === 'events') && events.length > 0 && (
        <div className="p-4 bg-slate-50/40 dark:bg-[#0E1013] border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#1D9BF0]" />
              <span>Upcoming Official Campus Events</span>
            </h3>
            <span className="text-[11px] text-slate-400">Verified Organizers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs shadow-xs"
              >
                <div className="flex items-center justify-between text-[11px] text-[#1D9BF0] font-medium">
                  <span>{evt.category}</span>
                  <span className="text-slate-400">
                    {new Date(evt.start_time).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mt-1 line-clamp-1">
                  {evt.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mt-1">
                  {evt.description}
                </p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 truncate max-w-[180px]">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </span>
                  {evt.registration_url && (
                    <a
                      href={evt.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1D9BF0] hover:underline flex items-center gap-0.5 shrink-0"
                    >
                      <span>RSVP</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Composer preconfigured for Entertainment */}
      <PostComposer defaultCategory="entertainment" />

      {/* Entertainment Feed */}
      <div>
        {entertainmentPosts.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <Flame className="w-10 h-10 text-amber-500 mx-auto mb-2 opacity-70" />
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              No entertainment conversations yet
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Share what is trending at your student center, hostel, or faculty!
            </p>
          </div>
        ) : (
          entertainmentPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpenComments={(p) => setActiveCommentsPost(p)}
            />
          ))
        )}
      </div>

      {activeCommentsPost && (
        <CommentsModal
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
        />
      )}
    </div>
  );
};
