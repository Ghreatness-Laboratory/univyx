import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PostComposer } from '../components/PostComposer';
import { PostCard } from '../components/PostCard';
import { PostCardSkeleton } from '../components/PostCardSkeleton';
import { AdCard } from '../components/AdCard';
import { LiveNowStrip } from '../components/LiveNowStrip';
import { LocationPickerSheet } from '../components/LocationPickerSheet';
import { Post, PostCategory } from '../types';
import { CommentsModal } from '../components/CommentsModal';
import { MessageSquare, MapPin, X } from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    posts,
    selectedUniversityId,
    currentUser,
    rooms,
    joinRoom,
    setActiveTab,
    ads,
    hiddenAdIds
  } = useApp();

  // Requirement 2: Tabs: For You, Following, My University, Latest
  const [feedMode, setFeedMode] = useState<'for_you' | 'following' | 'my_university' | 'latest'>('for_you');

  // Requirement 3: Category chips: Academics (active by default), Career, Gaming, Campus Life, Marketplace
  const [selectedCategory, setSelectedCategory] = useState<string>('academics');
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);

  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);
  const [activeQuotePost, setActiveQuotePost] = useState<Post | null>(null);
  const [activeLocationFilter, setActiveLocationFilter] = useState<string | undefined>(undefined);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);

  const categories = [
    { id: 'academics', label: 'Academics' },
    { id: 'career', label: 'Career' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'campus_life', label: 'Campus Life' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'all', label: 'All' }
  ];

  // Brief skeleton loader simulation on tab or category switch for polish
  const handleTabChange = (newMode: 'for_you' | 'following' | 'my_university' | 'latest') => {
    if (newMode === feedMode) return;
    setIsLoadingFeed(true);
    setFeedMode(newMode);
    setTimeout(() => {
      setIsLoadingFeed(false);
    }, 250);
  };

  const handleCategoryChange = (catId: string) => {
    setIsLoadingFeed(true);
    setSelectedCategory(catId);
    setTimeout(() => {
      setIsLoadingFeed(false);
    }, 200);
  };

  // Active sponsored ads to naturally interleave in feed
  const activeAds = ads.filter(
    (a) =>
      (a.status === 'Running' || a.status === 'Active') &&
      !hiddenAdIds.includes(a.id) &&
      (a.placement === 'home' || !a.placement || a.placement === 'all')
  );

  // Filter posts based on selected campus, feed mode, category, and location
  const filteredPosts = posts.filter((post) => {
    // Category filter: match 'academics', 'career', 'gaming', 'campus_news' / 'campus_life', 'marketplace'
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'campus_life') {
        if (post.category !== 'campus_news' && post.category !== 'events' && post.category !== 'general') {
          return false;
        }
      } else if (post.category !== selectedCategory) {
        return false;
      }
    }

    const postUniId = post.universityId || post.university_id;
    // University selector filter from top bar
    if (selectedUniversityId !== 'all' && postUniId && postUniId !== selectedUniversityId) {
      return false;
    }

    // Specific Location chip filter
    if (activeLocationFilter) {
      if (!post.location || !post.location.toLowerCase().includes(activeLocationFilter.toLowerCase())) {
        return false;
      }
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
      if (
        authorUsername === 'univyx_official' ||
        authorUsername === 'damola_abuad' ||
        authorUsername === 'zainab_nile' ||
        authorUsername === 'korede_babcock'
      ) {
        return true;
      }
      return false;
    }

    return true;
  });

  return (
    <div className="w-full min-w-0 pb-28 sm:pb-20">
      {/* Optional Voice Rooms Live Strip */}
      <LiveNowStrip
        rooms={rooms}
        onJoinRoom={joinRoom}
        onViewAllRooms={() => setActiveTab('rooms')}
      />

      {/* Requirement 2: Tabs: For You, Following, My University, Latest (Single line, no wrap, blue underline) */}
      <div className="sticky top-14 z-20 bg-white/95 dark:bg-[#0A0F1E]/95 backdrop-blur-md border-b border-[#EFF3F4] dark:border-[#1E2846] transition-colors duration-150">
        <div className="flex items-center overflow-x-auto no-scrollbar whitespace-nowrap px-2">
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
                onClick={() => handleTabChange(tab.id as any)}
                className={`relative flex-1 min-h-[44px] py-3 px-3 text-center transition-colors duration-150 cursor-pointer whitespace-nowrap flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#4C8DFF] focus-visible:outline-none ${
                  isActive
                    ? 'text-[#0F1419] dark:text-[#F2F5FF] font-bold'
                    : 'text-[#536471] dark:text-[#8A94B3] font-medium hover:text-[#0F1419] dark:hover:text-[#F2F5FF]'
                }`}
              >
                <span className="relative inline-block px-1 text-[14px]">
                  {tab.label}
                  {/* Blue Underline on Active Tab */}
                  {isActive && (
                    <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#4C8DFF] rounded-full shadow-sm shadow-[#4C8DFF]/40" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Requirement 3: Category chips: Academics (active, white pill with dark text), Career, Gaming, Campus Life, Marketplace. Horizontally scrollable, with muted outlined inactive chips */}
        <div className="flex items-center gap-2 px-3 py-2.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`min-h-[44px] px-4 py-2 text-xs rounded-full whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer flex items-center justify-center active:scale-95 focus-visible:ring-2 focus-visible:ring-[#4C8DFF] focus-visible:outline-none ${
                  isSelected
                    ? 'bg-white text-[#0A0F1E] font-semibold shadow-sm ring-1 ring-white/20'
                    : 'border border-[#1E2846] text-[#8A94B3] hover:text-[#F2F5FF] hover:border-[#4C8DFF]/40 bg-[#121A30]/50 font-medium'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          {/* Location Filter Chip */}
          <button
            onClick={() => setIsLocationSheetOpen(true)}
            className={`min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-full whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer border active:scale-95 ${
              activeLocationFilter
                ? 'bg-[#4C8DFF] text-white border-[#4C8DFF] font-semibold shadow-xs'
                : 'border border-[#1E2846] text-[#8A94B3] hover:text-[#F2F5FF] hover:border-[#4C8DFF]/40 bg-[#121A30]/50 font-medium'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.8} />
            <span>{activeLocationFilter || 'Campus Location'}</span>
            {activeLocationFilter && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLocationFilter(undefined);
                }}
                className="hover:opacity-80 p-0.5"
              >
                <X className="w-3.5 h-3.5 ml-0.5" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Feed Content Container with 8px Spacing Grid */}
      <div className="px-3 sm:px-4 pt-3.5">
        {/* Requirement 4: Composer card */}
        <PostComposer
          quotePost={activeQuotePost}
          onClose={activeQuotePost ? () => setActiveQuotePost(null) : undefined}
        />

        {/* Feed Posts Stream or Skeleton Loaders */}
        <div className="space-y-3">
          {isLoadingFeed ? (
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          ) : filteredPosts.length === 0 ? (
            <div className="py-16 px-4 text-center rounded-[20px] bg-white dark:bg-[#121A30] border border-slate-200 dark:border-[#1E2846]">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#1E2846] text-[#4C8DFF] flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <h4 className="text-sm font-bold text-[#0F1419] dark:text-[#F2F5FF]">
                No conversations in this feed yet
              </h4>
              <p className="text-xs text-[#536471] dark:text-[#8A94B3] max-w-xs mx-auto mt-1 leading-relaxed">
                Be the first to share an academic question, study guide, or campus gist!
              </p>
            </div>
          ) : (
            filteredPosts.map((post, idx) => (
              <React.Fragment key={post.id}>
                {/* Requirement 5: Post Card */}
                <PostCard
                  post={post}
                  onOpenComments={(p) => setActiveCommentsPost(p)}
                  onQuote={(p) => {
                    setActiveQuotePost(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Natural Sponsored Ads Placement (Interleaved cleanly) */}
                {idx === 1 && activeAds[0] && (
                  <AdCard key={activeAds[0].id} ad={activeAds[0]} />
                )}
                {idx === 4 && activeAds[1] && (
                  <AdCard key={activeAds[1].id} ad={activeAds[1]} />
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      {/* Comments Thread Modal */}
      {activeCommentsPost && (
        <CommentsModal
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
        />
      )}

      {/* Location Picker Sheet */}
      <LocationPickerSheet
        isOpen={isLocationSheetOpen}
        onClose={() => setIsLocationSheetOpen(false)}
        selectedLocation={activeLocationFilter}
        onSelectLocation={(loc) => setActiveLocationFilter(loc)}
        title="Filter Feed by Campus Location"
      />
    </div>
  );
};
