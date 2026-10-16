import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostComposer } from '../components/PostComposer';
import { PostCard } from '../components/PostCard';
import { Post, PostCategory } from '../types';
import { CommentsModal } from '../components/CommentsModal';
import { Sparkles, MessageSquare } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { posts, selectedUniversityId, currentUser } = useApp();

  const [feedMode, setFeedMode] = useState<'for_you' | 'following' | 'my_campus' | 'latest'>('for_you');
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);
  const [activeQuotePost, setActiveQuotePost] = useState<Post | null>(null);

  const categories: { id: PostCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'academics', label: 'Academics' },
    { id: 'career', label: 'Career' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'campus_news', label: 'Campus News' },
    { id: 'events', label: 'Events' },
    { id: 'marketplace', label: 'Marketplace' }
  ];

  // Filter posts based on selected campus, feed mode, and category
  const filteredPosts = posts.filter((post) => {
    // Category filter
    if (selectedCategory !== 'all' && post.category !== selectedCategory) {
      return false;
    }

    // University selector filter from top bar
    if (selectedUniversityId !== 'all' && post.university_id && post.university_id !== selectedUniversityId) {
      return false;
    }

    // Feed Mode filter
    if (feedMode === 'my_campus') {
      if (currentUser?.university_id && post.university_id !== currentUser.university_id) {
        return false;
      }
    } else if (feedMode === 'following') {
      // In following mode, show posts authored by accounts the user follows or official pulse
      if (post.author_id === currentUser?.id) return true;
      if (post.author.username === 'campus_pulse') return true;
    }

    return true;
  });

  return (
    <div className="w-full min-w-0">
      {/* Feed Tabs: For You, Following, My Campus, Latest */}
      <div className="sticky top-14 z-20 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-around text-xs font-semibold border-b border-slate-100 dark:border-slate-800/60">
          <button
            onClick={() => setFeedMode('for_you')}
            className={`flex-1 py-3 text-center transition-colors relative ${
              feedMode === 'for_you'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span>For You</span>
            {feedMode === 'for_you' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#1D9BF0] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setFeedMode('following')}
            className={`flex-1 py-3 text-center transition-colors relative ${
              feedMode === 'following'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span>Following</span>
            {feedMode === 'following' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#1D9BF0] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setFeedMode('my_campus')}
            className={`flex-1 py-3 text-center transition-colors relative ${
              feedMode === 'my_campus'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span>My Campus</span>
            {feedMode === 'my_campus' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#1D9BF0] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setFeedMode('latest')}
            className={`flex-1 py-3 text-center transition-colors relative ${
              feedMode === 'latest'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span>Latest</span>
            {feedMode === 'latest' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#1D9BF0] rounded-full" />
            )}
          </button>
        </div>

        {/* Category Horizontal Filter Buttons */}
        <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#1D9BF0] text-white'
                    : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Post Composer */}
      <PostComposer
        quotePost={activeQuotePost}
        onClose={activeQuotePost ? () => setActiveQuotePost(null) : undefined}
      />

      {/* Post Stream */}
      <div>
        {filteredPosts.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              No conversations in this filter yet
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
              Your university feed is just getting started. Be the first to share an update, study question, or campus gist!
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpenComments={(p) => setActiveCommentsPost(p)}
              onQuote={(p) => {
                setActiveQuotePost(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))
        )}
      </div>

      {/* Comments Thread Modal */}
      {activeCommentsPost && (
        <CommentsModal
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
        />
      )}
    </div>
  );
};
