import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostComposer } from '../components/PostComposer';
import { PostCard } from '../components/PostCard';
import { PostCardSkeleton } from '../components/PostCardSkeleton';
import { AdCard } from '../components/AdCard';
import { LiveNowStrip } from '../components/LiveNowStrip';
import { LocationPickerSheet } from '../components/LocationPickerSheet';
import { Post } from '../types';
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

  // Tabs: For You, Following, My University, Latest
  const [feedMode, setFeedMode] = useState<'for_you' | 'following' | 'my_university' | 'latest'>('for_you');

  // Category chips: Academics (active by default), Career, Gaming, Campus Life, Marketplace
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
    { id: 'marketplace', label: 'Marketplace' }
  ];

  // Brief skeleton loader simulation on tab or category switch
  const handleTabChange = (newMode: 'for_you' | 'following' | 'my_university' | 'latest') => {
    if (newMode === feedMode) return;
    setIsLoadingFeed(true);
    setFeedMode(newMode);
    setTimeout(() => {
      setIsLoadingFeed(false);
    }, 150);
  };

  const handleCategoryChange = (catId: string) => {
    setIsLoadingFeed(true);
    setSelectedCategory(catId);
    setTimeout(() => {
      setIsLoadingFeed(false);
    }, 150);
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
      {/* 2. Live gist rooms: a section row with red live dot, "Live gist rooms", "3 active", "See all" */}
      <LiveNowStrip
        rooms={rooms}
        onJoinRoom={joinRoom}
        onViewAllRooms={() => setActiveTab('rooms')}
      />

      {/* 3. Tabs: For You, Following, My University, Latest. One line, no wrapping, 2px accent underline on active tab */}
      <div className="sticky top-14 z-20 bg-surface/95 backdrop-blur-md border-b border-border transition-colors duration-150">
        <div className="flex items-center overflow-x-auto no-scrollbar whitespace-nowrap px-1">
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
                className={`relative flex-1 min-h-[44px] py-2.5 px-3 text-center transition-colors duration-150 cursor-pointer whitespace-nowrap flex items-center justify-center touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                  isActive
                    ? 'tab-item-active'
                    : 'tab-item hover:text-text'
                }`}
              >
                <span className="relative inline-block text-[12px]">
                  {tab.label}
                  {/* 2px accent underline on active tab */}
                  {isActive && (
                    <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-accent rounded-full" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. Category chips: Academics (active), Career, Gaming, Campus Life, Marketplace. Horizontally scrollable. */}
        <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar border-t border-border/50">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`h-6 px-3 rounded-full text-[11px] whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer flex items-center justify-center active:scale-95 touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                  isSelected
                    ? 'chip-active shadow-xs'
                    : 'chip-inactive'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          {/* Location Filter Chip (24px tall) */}
          <button
            onClick={() => setIsLocationSheetOpen(true)}
            className={`h-6 flex items-center gap-1 px-3 text-[11px] rounded-full whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer border active:scale-95 touch-target-44 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              activeLocationFilter
                ? 'bg-accent text-white border-accent font-bold shadow-xs'
                : 'chip-inactive'
            }`}
          >
            <MapPin className="w-3 h-3 text-text-muted" strokeWidth={1.5} />
            <span>{activeLocationFilter || 'Campus Location'}</span>
            {activeLocationFilter && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLocationFilter(undefined);
                }}
                className="hover:opacity-80 p-0.5"
              >
                <X className="w-3 h-3 ml-0.5" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Feed Content Container (8px Spacing Grid) */}
      <div className="px-3 sm:px-4 pt-3">
        {/* 5. Composer Card */}
        <PostComposer
          quotePost={activeQuotePost}
          onClose={activeQuotePost ? () => setActiveQuotePost(null) : undefined}
        />

        {/* 6. Feed Posts Stream or Skeleton Loaders */}
        <div className="space-y-2.5">
          {isLoadingFeed ? (
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          ) : filteredPosts.length === 0 ? (
            <div className="card-theme py-14 px-4 text-center">
              <div className="w-10 h-10 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto mb-2.5">
                <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h4 className="text-[13px] font-bold text-text">
                No conversations in this feed yet
              </h4>
              <p className="text-[11px] text-text-muted max-w-xs mx-auto mt-1 leading-normal">
                Be the first to share an academic question, study guide, or campus gist!
              </p>
            </div>
          ) : (
            filteredPosts.map((post, idx) => (
              <React.Fragment key={post.id}>
                {/* 6. Post Card */}
                <PostCard
                  post={post}
                  onOpenComments={(p) => setActiveCommentsPost(p)}
                  onQuote={(p) => {
                    setActiveQuotePost(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Natural Sponsored Ads Placement */}
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
