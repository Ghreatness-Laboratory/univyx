import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostComposer } from '../components/PostComposer';
import { PostCard } from '../components/PostCard';
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

  const [feedMode, setFeedMode] = useState<
    'for_you' | 'following' | 'near_my_campus' | 'my_university' | 'latest'
  >('for_you');
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);
  const [activeQuotePost, setActiveQuotePost] = useState<Post | null>(null);
  const [activeLocationFilter, setActiveLocationFilter] = useState<string | undefined>(undefined);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);

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

  // Active sponsored ads to naturally interleave in feed
  const activeAds = ads.filter(
    (a) =>
      (a.status === 'Running' || a.status === 'Active') &&
      !hiddenAdIds.includes(a.id) &&
      (a.placement === 'home' || !a.placement || a.placement === 'all')
  );

  // Filter posts based on selected campus, feed mode, category, and location
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
    } else if (feedMode === 'near_my_campus') {
      // Near my campus: match user's campus or location tag
      const userLoc = currentUser?.location?.toLowerCase();
      const postLoc = post.location?.toLowerCase();
      if (userUniId && postUniId === userUniId) return true;
      if (userLoc && postLoc && (postLoc.includes(userLoc) || userLoc.includes(postLoc))) return true;
      if (post.location) return true; // show any geotagged campus post in near campus tab
      return false;
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
    }

    return true;
  });

  return (
    <div className="w-full min-w-0">
      {/* 1. GIST ROOMS: "Live Now" Voice Strip at Top of Home */}
      <LiveNowStrip
        rooms={rooms}
        onJoinRoom={joinRoom}
        onViewAllRooms={() => setActiveTab('rooms')}
      />

      {/* 2. Feed Tabs: For You, Following, Near My Campus, My University, Latest */}
      <div className="sticky top-14 z-20 bg-white/95 dark:bg-[#000000]/95 backdrop-blur-md border-b border-[#EFF3F4] dark:border-[#2F3336]">
        <div className="flex items-center justify-around border-b border-[#EFF3F4] dark:border-[#2F3336] overflow-x-auto no-scrollbar">
          {[
            { id: 'for_you', label: 'For You' },
            { id: 'following', label: 'Following' },
            { id: 'near_my_campus', label: 'Near my campus' },
            { id: 'my_university', label: 'My University' },
            { id: 'latest', label: 'Latest' }
          ].map((tab) => {
            const isActive = feedMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFeedMode(tab.id as any)}
                className={`tab-item flex-1 py-3.5 text-center transition-colors relative cursor-pointer whitespace-nowrap px-2 ${
                  isActive
                    ? 'tab-item-active text-[#0F1419] dark:text-[#E7E9EA] font-bold'
                    : 'text-[#536471] dark:text-[#71767B] font-semibold hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                }`}
              >
                <span className="relative inline-block px-1 text-[14px]">
                  {tab.label}
                  {isActive && (
                    <span className="absolute -bottom-3.5 left-0 right-0 h-1 bg-[#1D9BF0] rounded-full" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Filter Bar: Categories + Location Filter Chip */}
        <div className="flex items-center gap-2 px-3 py-2.5 overflow-x-auto no-scrollbar">
          {/* Location Filter Button */}
          <button
            onClick={() => setIsLocationSheetOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] rounded-full whitespace-nowrap transition-colors shrink-0 cursor-pointer border ${
              activeLocationFilter
                ? 'bg-[#1D9BF0] text-white border-[#1D9BF0] font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-[#16181C] text-[#536471] dark:text-[#71767B] border-slate-200 dark:border-slate-800 hover:border-slate-300 font-semibold'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{activeLocationFilter || 'Filter Location'}</span>
            {activeLocationFilter && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLocationFilter(undefined);
                }}
                className="hover:opacity-80"
              >
                <X className="w-3.5 h-3.5 ml-1" />
              </span>
            )}
          </button>

          {/* Category Horizontal Filter Buttons */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-[13px] rounded-full whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
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

      {/* Post Stream with Natural Sponsored Ads Insertion */}
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
          filteredPosts.map((post, idx) => (
            <React.Fragment key={post.id}>
              <PostCard
                post={post}
                onOpenComments={(p) => setActiveCommentsPost(p)}
                onQuote={(p) => {
                  setActiveQuotePost(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Natural Sponsored Ads Placement (one image ad after post 2, one video ad after post 5) */}
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
