import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';
import { CommentsModal } from '../components/CommentsModal';
import { Post } from '../types';
import {
  User,
  CheckCircle2,
  Building2,
  Calendar,
  Bookmark,
  MessageSquare,
  Settings
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, posts, setActiveTab } = useApp();
  const [profileTab, setProfileTab] = useState<'posts' | 'bookmarks'>('posts');
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);

  if (!currentUser) {
    return (
      <div className="p-12 text-center text-xs text-slate-400">
        Please sign in or configure your profile in Settings.
      </div>
    );
  }

  const userPosts = posts.filter((p) => p.author_id === currentUser.id);
  const bookmarkedPosts = posts.filter((p) => p.is_bookmarked);

  const displayedPosts = profileTab === 'posts' ? userPosts : bookmarkedPosts;

  return (
    <div className="w-full min-w-0">
      {/* Profile Header Header/Banner */}
      <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1D9BF0]/15 text-[#1D9BF0] font-bold text-2xl flex items-center justify-center border-2 border-[#1D9BF0]/30 shrink-0">
              {currentUser.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {currentUser.full_name}
                </h2>
                {currentUser.is_verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#1D9BF0]" />
                )}
                <span className="text-xs text-slate-400 font-mono">
                  @{currentUser.username}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#1D9BF0]" />
                  <span>{currentUser.university_name || 'Campus Scholar'}</span>
                </span>
                {currentUser.department && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{currentUser.department}</span>
                  </>
                )}
                {currentUser.academic_level && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{currentUser.academic_level}</span>
                  </>
                )}
              </div>

              {currentUser.bio && (
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 max-w-lg leading-relaxed">
                  {currentUser.bio}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 text-slate-700 dark:text-slate-300"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit Profile</span>
          </button>
        </div>

        {/* Following & Followers Stats (Unboxed text) */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <strong className="text-slate-900 dark:text-white">{currentUser.following_count || 182}</strong> Following
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white">{currentUser.followers_count || 248}</strong> Followers
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white">{userPosts.length}</strong> Posts
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs: My Posts vs Saved Items */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold bg-white dark:bg-[#0A0A0A]">
        <button
          onClick={() => setProfileTab('posts')}
          className={`flex-1 py-3 text-center transition-colors relative ${
            profileTab === 'posts' ? 'text-slate-900 dark:text-white' : 'text-slate-400'
          }`}
        >
          <span>My Posts ({userPosts.length})</span>
          {profileTab === 'posts' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#1D9BF0] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setProfileTab('bookmarks')}
          className={`flex-1 py-3 text-center transition-colors relative ${
            profileTab === 'bookmarks' ? 'text-slate-900 dark:text-white' : 'text-slate-400'
          }`}
        >
          <span>Saved Posts ({bookmarkedPosts.length})</span>
          {profileTab === 'bookmarks' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#1D9BF0] rounded-full" />
          )}
        </button>
      </div>

      {/* Posts Stream */}
      <div>
        {displayedPosts.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400">
            {profileTab === 'posts'
              ? 'You have not published any posts yet. Start a discussion from the Home composer!'
              : 'You have no saved posts. Tap the bookmark icon on any post to save it for later.'}
          </div>
        ) : (
          displayedPosts.map((post) => (
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
