import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { PostComposer } from '../components/PostComposer';
import { PostCard } from '../components/PostCard';
import { PostCardSkeleton } from '../components/PostCardSkeleton';
import { AdCard } from '../components/AdCard';
import { LiveNowStrip } from '../components/LiveNowStrip';
import { LocationPickerSheet } from '../components/LocationPickerSheet';
import { Post } from '../types';
import { CommentsModal } from '../components/CommentsModal';
import { MessageSquare, MapPin, X, Building2 } from 'lucide-react';

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

  const isHeaderVisible = useScrollDirection();

  // Tabs: For You, Following, My University, Latest
  const [feedMode, setFeedMode] = useState<'for_you' | 'following' | 'my_university' | 'latest'>('for_you');

  // Category chips: Academics (active), Career, Gaming, Campus Life, Marketplace
  const [selectedCategory, setSelectedCategory] = useState<string>('academics');
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);

  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);
  const [activeQuotePost, setActiveQuotePost] = useState<Post | null>(null);
  const [activeLocationFilter, setActiveLocationFilter] = useState<string | undefined>(undefined);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);

  // "New posts" floating pill indicator
  const [newPostsCount, setNewPostsCount] = useState<number>(3);
  const [hasScrolledAwayFromTop, setHasScrolledAwayFromTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHasScrolledAwayFromTop(true);
      } else if (window.scrollY <= 30) {
        setHasScrolledAwayFromTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setNewPostsCount(0);
  };

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

  const userUniId = currentUser?.universityId || currentUser?.university_id;
  const isMyUniEmpty = feedMode === 'my_university' && !userUniId && selectedUniversityId === 'all';

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
      {/* 7. "New posts" floating pill: when new posts arrive, small floating gradient pill centered at top of feed */}
      {newPostsCount > 0 && hasScrolledAwayFromTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed top-[68px] left-1/2 -translate-x-1/2 z-30 btn-primary-gradient px-3.5 py-1.5 rounded-full text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5 active:scale-95 transition-all animate-in fade-in slide-in-from-top-2 cursor-pointer touch-target-44"
          aria-label="Scroll to new posts"
        >
          <span>↑ {newPostsCount} new posts</span>
        </button>
      )}

      {/* 2. Live gist rooms (the hero feature) */}
      <LiveNowStrip
        rooms={rooms}
        onJoinRoom={joinRoom}
        onViewAllRooms={() => setActiveTab('rooms')}
      />

      {/* 3. Tabs & 4. Category chips: Sticky below the header. On scroll down, the chips hide and the tabs stay! */}
      <div
        className={`sticky z-20 bg-surface/95 backdrop-blur-md border-b border-border transition-all duration-150 ${
          isHeaderVisible ? 'top-[56px]' : 'top-0'
        }`}
      >
        {/* 3. Tabs: For You, Following, My University, Latest. One line with 2px accent underline on active tab */}
        <div className="flex items-center overflow-x-auto no-scrollbar whitespace-nowrap px-1">
          {[
            { id: 'for_you', label: 'For You', unreadCount: 0 },
            { id: 'following', label: 'Following', unreadCount: 0 },
            { id: 'my_university', label: 'My University', unreadCount: 0 },
            { id: 'latest', label: 'Latest', unreadCount: 3 }
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
                <span className="relative inline-flex items-center gap-1 text-[12px]">
                  <span>{tab.label}</span>
                  {/* Unread count badge on tab when there is new content */}
                  {tab.unreadCount > 0 && !isActive && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-accent-soft text-accent leading-tight">
                      {tab.unreadCount}
                    </span>
                  )}
                  {/* 2px accent underline on active tab */}
                  {isActive && (
                    <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-accent rounded-full" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. Category chips: Academics (active), Career, Gaming, Campus Life, Marketplace. Horizontally scrollable row. Hides on scroll down while tabs stay. */}
        <div
          className={`flex items-center gap-1.5 px-3 overflow-x-auto no-scrollbar transition-all duration-150 ${
            isHeaderVisible
              ? 'max-h-12 py-2 opacity-100 border-t border-border/50'
              : 'max-h-0 py-0 opacity-0 overflow-hidden border-t-0 pointer-events-none'
          }`}
        >
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

      {/* Main Feed Content Container (12px gap between cards) */}
      <div className="px-3 sm:px-4 pt-3">
        {/* 5. Composer, collapsed by default into a 40px pill bar, expands in place */}
        <PostComposer
          quotePost={activeQuotePost}
          onClose={activeQuotePost ? () => setActiveQuotePost(null) : undefined}
        />

        {/* 6. Feed Posts Stream, Skeleton Loaders, or Empty State */}
        <div className="space-y-3">
          {isLoadingFeed ? (
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          ) : isMyUniEmpty ? (
            /* Empty state for My University when no school is selected, with a "Choose your university" button */
            <div className="card-theme py-14 px-6 text-center mb-3">
              <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-bold text-text">Choose your university</h3>
              <p className="text-[12px] text-text-muted max-w-xs mx-auto mt-1 leading-normal">
                Connect with students, course groups, study files, and campus announcements from your private institution.
              </p>
              <button
                onClick={() => setIsLocationSheetOpen(true)}
                className="mt-4 px-4 py-2 rounded-full btn-primary-gradient text-white text-[12px] font-bold shadow-xs active:scale-95 transition-transform cursor-pointer touch-target-44"
              >
                Choose your university
              </button>
            </div>
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
