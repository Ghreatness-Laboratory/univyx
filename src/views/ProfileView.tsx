import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';
import { CommentsModal } from '../components/CommentsModal';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { Post, VerificationTier } from '../types';
import {
  User,
  Building2,
  Calendar,
  Bookmark,
  MessageSquare,
  Settings,
  Sparkles,
  Award,
  Users,
  X,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Mail
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    posts,
    setActiveTab,
    gainFollowers,
    showToast,
    setActiveConversationId,
    startConversation
  } = useApp();
  const [profileTab, setProfileTab] = useState<'posts' | 'bookmarks'>('posts');
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);
  const [showFollowModal, setShowFollowModal] = useState<'followers' | 'following' | null>(null);

  if (!currentUser) {
    return (
      <div className="p-12 text-center text-xs text-slate-400">
        Please sign in or configure your profile in Settings.
      </div>
    );
  }

  const currentTier: VerificationTier =
    currentUser.verificationTier ||
    currentUser.verification_tier ||
    (currentUser.isVerified || currentUser.is_verified ? 'blue' : 'none');

  const followersCount = currentUser.followersCount ?? currentUser.followers_count ?? 742;
  const followingCount = currentUser.followingCount ?? currentUser.following_count ?? 185;
  const targetFollowers = 1000;
  const progressPercent = Math.min(100, Math.round((followersCount / targetFollowers) * 100));
  const remainingFollowers = Math.max(0, targetFollowers - followersCount);

  const userPosts = posts.filter((p) => p.authorId === currentUser.id || p.author_id === currentUser.id || p.username === currentUser.username);
  const bookmarkedPosts = posts.filter((p) => p.isBookmarked || p.is_bookmarked);
  const displayedPosts = profileTab === 'posts' ? userPosts : bookmarkedPosts;

  // Mock scholars for Follower/Following List modal
  const mockFollowAccounts = [
    {
      id: 'usr-korede',
      name: 'Korede Balogun',
      username: 'korede_babcock',
      university: 'Babcock University',
      tier: 'blue' as VerificationTier,
      bio: 'Music & Arts scholar · Just hit 1,000 followers and earned Blue Tick!'
    },
    {
      id: 'usr-covenant-admin',
      name: 'Covenant University',
      username: 'covenant_official',
      university: 'Covenant University',
      tier: 'gold' as VerificationTier,
      bio: 'Official Covenant University senate, admissions, and campus communications.'
    },
    {
      id: 'usr-cst-council',
      name: 'CST Student Council',
      username: 'cst_council',
      university: 'Covenant University',
      tier: 'gold' as VerificationTier,
      bio: 'College of Science & Technology student representative council.'
    },
    {
      id: 'usr-tobi',
      name: 'Tobi Adebayo',
      username: 'tobi_adebayo',
      university: 'Babcock University',
      tier: 'none' as VerificationTier,
      bio: '300L Pre-med scholar · 999 followers (1 follower away from Blue Tick!)'
    },
    {
      id: 'usr-zainab',
      name: 'Zainab Al-Hassan',
      username: 'zainab_nile',
      university: 'Nile University of Nigeria',
      tier: 'blue' as VerificationTier,
      bio: 'Cybersecurity team captain · Inter-collegiate arena competitor.'
    },
    {
      id: 'usr-damola',
      name: 'Adedamola Adeleke',
      username: 'damola_abuad',
      university: 'Afe Babalola University (ABUAD)',
      tier: 'blue' as VerificationTier,
      bio: '400L Law undergraduate · ABUAD Law Clinic lead.'
    }
  ];

  return (
    <div className="w-full min-w-0">
      {/* Profile Header Banner & Info */}
      <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1D9BF0]/15 text-[#1D9BF0] font-bold text-2xl flex items-center justify-center border-2 border-[#1D9BF0]/30 shrink-0">
              {(currentUser.fullName || currentUser.full_name || 'U').charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="page-title text-[20px] font-extrabold text-[#0F1419] dark:text-[#E7E9EA]">
                  {currentUser.fullName || currentUser.full_name}
                </h2>
                <VerifiedBadge type={currentTier} size="large" />
                <span className="handle-text font-normal text-[15px] text-[#536471] dark:text-[#71767B]">
                  @{currentUser.username}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-[#536471] dark:text-[#71767B] mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#1D9BF0]" />
                  <span>{currentUser.universityName || currentUser.university_name || 'Campus Scholar'}</span>
                </span>
                {currentUser.department && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{currentUser.department}</span>
                  </>
                )}
                {(currentUser.academicLevel || currentUser.academic_level) && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{currentUser.academicLevel || currentUser.academic_level}</span>
                  </>
                )}
              </div>

              {currentUser.bio && (
                <p className="post-text text-[15px] leading-[20px] text-[#0F1419] dark:text-[#E7E9EA] mt-2.5 max-w-lg">
                  {currentUser.bio}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setActiveConversationId('conv-self');
                setActiveTab('messages');
              }}
              className="btn-pill flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1D9BF0] text-white text-[15px] font-bold hover:bg-[#1A8CD8] transition-colors cursor-pointer shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Message</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className="btn-pill flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-[15px] font-bold hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 text-[#0F1419] dark:text-[#E7E9EA] transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#536471] dark:text-[#71767B]" />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Following & Followers Stats (Clickable to open Follower List modal) */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setShowFollowModal('following')}
            className="hover:underline flex items-center gap-1 text-left cursor-pointer"
          >
            <strong className="text-slate-900 dark:text-white font-semibold">{followingCount}</strong>
            <span>Following</span>
          </button>
          <button
            onClick={() => setShowFollowModal('followers')}
            className="hover:underline flex items-center gap-1 text-left cursor-pointer"
          >
            <strong className="text-slate-900 dark:text-white font-semibold">{followersCount}</strong>
            <span>Followers</span>
          </button>
          <div>
            <strong className="text-slate-900 dark:text-white font-semibold">{userPosts.length}</strong> Posts
          </div>
        </div>

        {/* Friendly Verification Progress Card for Unverified Users */}
        {currentTier === 'none' ? (
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-blue-50/60 dark:from-[#0c1929] dark:via-[#111827] dark:to-[#0f172a] border border-[#1D9BF0]/30 shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1D9BF0]/15 dark:bg-[#1D9BF0]/25 flex items-center justify-center shrink-0 border border-[#1D9BF0]/30 text-[#1D9BF0]">
                  <VerifiedBadge type="blue" size="medium" showPopover={false} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                    <span>Earn Your Univyx Blue Tick</span>
                    <span className="text-[10px] font-semibold text-[#1D9BF0] bg-[#1D9BF0]/10 px-2 py-0.5 rounded-full">
                      Automatic
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {followersCount.toLocaleString()} / {targetFollowers.toLocaleString()} followers to earn your blue tick
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-[#1D9BF0] tabular-nums">
                {progressPercent}%
              </span>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="mt-3 w-full bg-slate-200 dark:bg-slate-700/80 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1D9BF0] to-[#0284C7] h-full rounded-full transition-all duration-500 ease-out shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 flex-wrap gap-2">
              <span>
                {remainingFollowers > 0
                  ? `${remainingFollowers.toLocaleString()} more followers needed to automatically unlock verification.`
                  : 'Milestone reached! Processing automated verification...'}
              </span>

              {/* Interactive Demo Simulation Button so user/reviewer can test milestone transition */}
              <button
                type="button"
                onClick={() => {
                  const toAdd = remainingFollowers <= 100 ? remainingFollowers : 100;
                  gainFollowers(toAdd);
                  showToast(`+${toAdd} followers gained! Check your notification.`);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1D9BF0] hover:text-[#0284C7] bg-white dark:bg-[#16181C] px-2.5 py-1 rounded-lg border border-[#1D9BF0]/30 hover:border-[#1D9BF0] transition-all cursor-pointer shadow-2xs"
              >
                <TrendingUp className="w-3 h-3" />
                <span>Simulate +{remainingFollowers <= 100 ? remainingFollowers : 100} Followers</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Verification Badge Banner */
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <VerifiedBadge type={currentTier} size="medium" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {currentTier === 'gold' ? 'Official Gold Verified Account' : 'Collegiate Blue Verified Scholar'}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentTier === 'gold'
                    ? 'Granted manually by Univyx Administration to official university & partner organizations.'
                    : 'Earned automatically by reaching the 1,000 follower milestone on Univyx.'}
                </p>
              </div>
            </div>

            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                currentTier === 'gold'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                  : 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
              }`}
            >
              {currentTier === 'gold' ? 'Admin Granted' : 'Auto Earned'}
            </span>
          </div>
        )}
      </div>

      {/* Profile Navigation Tabs: My Posts vs Saved Items (15px, weight 600, active 700) */}
      <div className="flex border-b border-[#EFF3F4] dark:border-[#2F3336] bg-white dark:bg-[#000000]">
        <button
          onClick={() => setProfileTab('posts')}
          className={`tab-item flex-1 py-3.5 text-center transition-colors relative cursor-pointer ${
            profileTab === 'posts'
              ? 'tab-item-active text-[#0F1419] dark:text-[#E7E9EA] font-bold'
              : 'text-[#536471] dark:text-[#71767B] font-semibold hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
          }`}
        >
          <span className="relative inline-block px-1">
            My Posts ({userPosts.length})
            {profileTab === 'posts' && (
              <span className="absolute -bottom-3.5 left-0 right-0 h-1 bg-[#1D9BF0] rounded-full" />
            )}
          </span>
        </button>

        <button
          onClick={() => setProfileTab('bookmarks')}
          className={`tab-item flex-1 py-3.5 text-center transition-colors relative cursor-pointer ${
            profileTab === 'bookmarks'
              ? 'tab-item-active text-[#0F1419] dark:text-[#E7E9EA] font-bold'
              : 'text-[#536471] dark:text-[#71767B] font-semibold hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
          }`}
        >
          <span className="relative inline-block px-1">
            Saved Posts ({bookmarkedPosts.length})
            {profileTab === 'bookmarks' && (
              <span className="absolute -bottom-3.5 left-0 right-0 h-1 bg-[#1D9BF0] rounded-full" />
            )}
          </span>
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

      {/* Comments Modal */}
      {activeCommentsPost && (
        <CommentsModal
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
        />
      )}

      {/* Follower / Following List Modal */}
      {showFollowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#16181C] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1D9BF0]" />
                <h3 className="font-bold text-slate-900 dark:text-white capitalize">
                  {showFollowModal} ({showFollowModal === 'followers' ? followersCount : followingCount})
                </h3>
              </div>
              <button
                onClick={() => setShowFollowModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {mockFollowAccounts.map((account) => (
                <div
                  key={account.id}
                  className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1f2329] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F1419] dark:text-[#E7E9EA] font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 text-[15px]">
                      {account.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 min-w-0 overflow-hidden leading-tight">
                        <span className="display-name font-bold text-[15px] text-[#0F1419] dark:text-[#E7E9EA] truncate shrink-0 max-w-[130px] sm:max-w-[160px]">
                          {account.name}
                        </span>
                        <VerifiedBadge type={account.tier} size="small" />
                        <span className="handle-text font-normal text-[15px] text-[#536471] dark:text-[#71767B] truncate shrink min-w-0">
                          @{account.username}
                        </span>
                      </div>
                      <div className="text-[13px] text-[#536471] dark:text-[#71767B] mt-0.5 truncate">
                        {account.university}
                      </div>
                      <p className="post-text text-[15px] leading-[20px] text-[#0F1419] dark:text-[#E7E9EA] mt-1 line-clamp-1">
                        {account.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setShowFollowModal(null);
                        startConversation({
                          id: account.id,
                          fullName: account.name,
                          username: account.username,
                          universityName: account.university,
                          universityId: account.id.replace('usr-', ''),
                          verificationTier: account.tier,
                          bio: account.bio
                        });
                      }}
                      className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-[#1D9BF0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title={`Message @${account.username}`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => showToast(`Updated following state for @${account.username}`)}
                      className="btn-pill shrink-0 text-[14px] font-bold px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F1419] dark:text-[#E7E9EA] transition-colors cursor-pointer"
                    >
                      {showFollowModal === 'followers' ? 'Follow Back' : 'Following'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

