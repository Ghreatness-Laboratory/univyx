import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostComposer } from '../components/PostComposer';
import { PostCard } from '../components/PostCard';
import { Post, PostCategory } from '../types';
import { CommentsModal } from '../components/CommentsModal';
import { MessageSquare } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { posts, selectedUniversityId, currentUser } = useApp();

  const [feedMode, setFeedMode] = useState<'for_you' | 'following' | 'my_university' | 'latest'>('for_you');
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

    const postUniId = post.universityId || post.university_id;
    // University selector filter from top bar
    if (selectedUniversityId !== 'all' && postUniId && postUniId !== selectedUniversityId) {
      return false;
    }

    const userUniId = currentUser?.universityId || currentUser?.university_id;
    const authorId = post.authorId || post.author_id || post.author?.id;
    const authorUsername = post.username || post.author?.username;

    // Feed Mode filter
    if (feedMode === 'my_university') {
      if (userUniId && postUniId !== userUniId) {
        return false;
      }
    } else if (feedMode === 'following') {
      if (authorId === currentUser?.id) return true;
      if (authorUsername === 'univyx_official' || authorUsername === 'damola_abuad' || authorUsername === 'zainab_nile') return true;
    }

    return true;
  });

  return (
    <div className="w-full min-w-0">
      {/* Feed Tabs: For You, Following, My University, Latest (15px, weight 600, active 700) */}
      <div className="sticky top-14 z-20 bg-white/95 dark:bg-[#000000]/95 backdrop-blur-md border-b border-[#EFF3F4] dark:border-[#2F3336]">
        <div className="flex items-center justify-around border-b border-[#EFF3F4] dark:border-[#2F3336]">
          {[
            { id: 'for_you', label: 'For You' },
            { id: 'following', label: 'Following' },
            { id: 'my_university', label: 'My University' },
            { id: 'latest', label: 'Latest' }
          ].map((tab) => {
            const isActive = feedMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFeedMode(tab.id as any)}
                className={`tab-item flex-1 py-3.5 text-center transition-colors relative cursor-pointer ${
                  isActive
                    ? 'tab-item-active text-[#0F1419] dark:text-[#E7E9EA] font-bold'
                    : 'text-[#536471] dark:text-[#71767B] font-semibold hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                }`}
              >
                <span className="relative inline-block px-1">
                  {tab.label}
                  {isActive && (
                    <span className="absolute -bottom-3.5 left-0 right-0 h-1 bg-[#1D9BF0] rounded-full" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Horizontal Filter Buttons (15px, weight 600) */}
        <div className="flex items-center gap-2 px-3 py-2.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-[15px] rounded-full whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F1419] text-white dark:bg-[#E7E9EA] dark:text-[#0F1419] font-bold'
                    : 'bg-slate-100 dark:bg-[#16181C] text-[#536471] dark:text-[#71767B] font-semibold hover:bg-slate-200 dark:hover:bg-slate-800'
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
