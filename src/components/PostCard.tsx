import React, { useState } from 'react';
import { Post } from '../types';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Share2,
  MoreHorizontal,
  CheckCircle2,
  Trash2,
  Edit2,
  Flag,
  CornerDownRight,
  BarChart2,
  MapPin
} from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';

interface PostCardProps {
  post: Post;
  onOpenComments?: (post: Post) => void;
  onQuote?: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onOpenComments, onQuote }) => {
  const {
    currentUser,
    toggleLikePost,
    toggleBookmarkPost,
    repostPost,
    deletePost,
    editPost,
    submitReport,
    showToast,
    votePoll
  } = useApp();

  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const authorName = post.authorName || post.author?.fullName || post.author?.full_name || 'Scholar';
  const authorUsername = post.username || post.author?.username || 'user';
  const authorInitial = authorName.charAt(0).toUpperCase();
  const authorId = post.authorId || post.author_id || post.author?.id;
  const authorTier =
    post.verificationTier ||
    post.verification_tier ||
    post.author?.verificationTier ||
    post.author?.verification_tier ||
    (post.isVerified ? 'blue' : 'none');
  const universityName = post.universityName || post.university_name || post.author?.universityName || post.author?.university_name;
  const createdAtTime = post.createdAt || post.created_at || new Date().toISOString();
  const isOwner = currentUser?.id === authorId;
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'superadmin' || currentUser?.role === 'moderator';

  const likesCount = post.likesCount ?? post.likes_count ?? 0;
  const commentsCount = post.commentsCount ?? post.comments_count ?? 0;
  const repostsCount = post.repostsCount ?? post.reposts_count ?? 0;
  const isLiked = post.isLiked ?? post.is_liked ?? false;
  const isBookmarked = post.isBookmarked ?? post.is_bookmarked ?? false;
  const isReposted = post.isReposted ?? post.is_reposted ?? false;
  const isPinned = post.isPinned ?? post.is_pinned ?? false;

  const quotedPost = post.quotedPost || (post as unknown as { quoted_post?: { id?: string; author_name?: string; author_username?: string; content?: string } }).quoted_post;

  // Format relative timestamp
  const formatTime = (isoString: string) => {
    try {
      const diffSecs = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
      if (diffSecs < 60) return `${Math.max(1, diffSecs)}s`;
      const diffMins = Math.floor(diffSecs / 60);
      if (diffMins < 60) return `${diffMins}m`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d`;
    } catch {
      return 'recent';
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Post by @${authorUsername} on Univyx`,
      text: post.content,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#post-${post.id}`);
      showToast('Post link copied to clipboard');
    }
  };

  const handleSaveEdit = () => {
    if (!editContent.trim()) return;
    editPost(post.id, editContent);
    setIsEditing(false);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    submitReport(post.id, 'post', reportReason, post.content);
    setShowReportModal(false);
    setReportReason('');
  };

  // Render body text with blue hashtags and mentions
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <span key={i} className="text-[#4C8DFF] font-medium hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      if (part.startsWith('@')) {
        return (
          <span key={i} className="text-[#4C8DFF] font-medium hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article className="p-4 border border-[#EFF3F4] dark:border-[#1E2846] bg-white dark:bg-[#121A30] rounded-[20px] mb-3 transition-colors duration-150 relative">
      {/* Pinned note if pinned */}
      {isPinned && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8A94B3] mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4C8DFF]" />
          <span>Pinned Announcement</span>
        </div>
      )}

      {/* Repost indicator */}
      {isReposted && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8A94B3] mb-2.5">
          <Repeat2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.8} />
          <span>You reposted</span>
        </div>
      )}

      {/* Header Row: Avatar, Name, Verified Badge, Muted @handle · time, and "..." menu */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar: gradient avatar with initial */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4C8DFF] to-[#7B5CFF] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md shadow-[#4C8DFF]/20 select-none">
            {authorInitial}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Bold Name */}
              <span className="font-bold text-[15px] text-[#0F1419] dark:text-[#F2F5FF] truncate leading-tight">
                {authorName}
              </span>
              {/* Blue Verified Badge */}
              <VerifiedBadge type={authorTier} size="small" />
            </div>

            {/* Muted @handle · time */}
            <div className="text-xs text-[#536471] dark:text-[#8A94B3] flex items-center gap-1.5 mt-0.5 truncate">
              <span className="truncate">@{authorUsername}</span>
              <span className="text-[#8A94B3]">·</span>
              <span className="shrink-0">{formatTime(createdAtTime)}</span>
              {universityName && (
                <>
                  <span className="hidden sm:inline text-[#8A94B3]">·</span>
                  <span className="hidden sm:inline text-[#8A94B3] truncate">{universityName}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Requirement 5: "..." menu */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Post options"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#536471] dark:text-[#8A94B3] hover:text-[#0F1419] dark:hover:text-[#F2F5FF] hover:bg-slate-100 dark:hover:bg-[#1E2846]/60 rounded-full transition-colors duration-150 active:scale-95 cursor-pointer -mr-1"
          >
            <MoreHorizontal className="w-5 h-5" strokeWidth={1.8} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 z-30 w-44 rounded-xl bg-white dark:bg-[#121A30] border border-slate-200 dark:border-[#1E2846] shadow-xl py-1 text-xs animate-in fade-in zoom-in-95 duration-150">
              {onQuote && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onQuote(post);
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-[#536471] dark:text-[#F2F5FF] hover:bg-slate-100 dark:hover:bg-[#1E2846]/60 flex items-center gap-2 cursor-pointer"
                >
                  <CornerDownRight className="w-4 h-4 text-[#4C8DFF]" strokeWidth={1.8} />
                  <span>Quote Post</span>
                </button>
              )}

              {isOwner && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setIsEditing(true);
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-[#536471] dark:text-[#F2F5FF] hover:bg-slate-100 dark:hover:bg-[#1E2846]/60 flex items-center gap-2 cursor-pointer"
                >
                  <Edit2 className="w-4 h-4 text-[#4C8DFF]" strokeWidth={1.8} />
                  <span>Edit Post</span>
                </button>
              )}

              {(isOwner || isAdmin) && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    deletePost(post.id);
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-rose-500" strokeWidth={1.8} />
                  <span>Delete Post</span>
                </button>
              )}

              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowReportModal(true);
                }}
                className="w-full text-left px-3.5 py-2.5 text-[#536471] dark:text-[#8A94B3] hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-[#1E2846]/60 flex items-center gap-2 cursor-pointer"
              >
                <Flag className="w-4 h-4" strokeWidth={1.8} />
                <span>Report Post</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Requirement 5: Body text at 17px with a 1.5 line height, blue hashtags */}
      {isEditing ? (
        <div className="mt-3 space-y-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            maxLength={320}
            rows={3}
            className="w-full text-[17px] leading-[1.5] p-3 rounded-xl border border-slate-300 dark:border-[#1E2846] bg-white dark:bg-[#0A0F1E] text-[#0F1419] dark:text-[#F2F5FF] focus:outline-none focus:border-[#4C8DFF]"
          />
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8A94B3]">{320 - editContent.length} chars left</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-[#8A94B3] hover:text-[#F2F5FF] rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 bg-gradient-to-r from-[#4C8DFF] to-[#7B5CFF] text-white rounded-lg font-medium cursor-pointer shadow-sm shadow-[#4C8DFF]/25"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-2.5 text-[17px] leading-[1.5] text-[#0F1419] dark:text-[#F2F5FF] break-words whitespace-pre-wrap font-normal">
          {renderFormattedText(post.content)}
        </p>
      )}

      {/* Interactive Poll Card (if present) */}
      {post.poll && (
        <div className="mt-3 p-3.5 rounded-2xl border border-slate-200 dark:border-[#1E2846] bg-slate-50/70 dark:bg-[#0A0F1E]/80 space-y-2 text-xs">
          {post.poll.question && post.poll.question !== post.content && (
            <div className="font-semibold text-slate-800 dark:text-[#F2F5FF] mb-1 text-[13px]">
              {post.poll.question}
            </div>
          )}

          <div className="space-y-2">
            {post.poll.options.map((option) => {
              const hasVoted = Boolean(post.poll?.userVotedOptionId);
              const isClosed = Boolean(post.poll?.isClosed || (post.poll?.expiresAt && new Date(post.poll.expiresAt).getTime() < Date.now()));
              const showResults = hasVoted || isClosed;
              const isMyVote = post.poll?.userVotedOptionId === option.id;
              const total = post.poll?.totalVotes || 0;
              const percent = total > 0 ? Math.round((option.votes / total) * 100) : 0;

              if (showResults) {
                return (
                  <div
                    key={option.id}
                    className={`relative overflow-hidden rounded-xl border p-2.5 flex items-center justify-between text-xs transition-all ${
                      isMyVote
                        ? 'border-[#4C8DFF] bg-white dark:bg-[#121A30] font-semibold'
                        : 'border-slate-200 dark:border-[#1E2846] bg-white dark:bg-[#121A30]/50'
                    }`}
                  >
                    {/* Fill Progress Bar */}
                    <div
                      className={`absolute inset-y-0 left-0 transition-all duration-700 ease-out ${
                        isMyVote
                          ? 'bg-[#4C8DFF]/25 dark:bg-[#4C8DFF]/30'
                          : 'bg-slate-200/60 dark:bg-[#1E2846]/60'
                      }`}
                      style={{ width: `${percent}%` }}
                    />

                    <div className="relative z-10 flex items-center gap-1.5 min-w-0 pr-2">
                      <span className="text-[#0F1419] dark:text-[#F2F5FF] truncate">
                        {option.text}
                      </span>
                      {isMyVote && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4C8DFF] shrink-0" strokeWidth={1.8} />
                      )}
                    </div>

                    <span className="relative z-10 font-mono text-[11px] font-bold text-[#536471] dark:text-[#8A94B3] shrink-0 tabular-nums">
                      {percent}% ({option.votes})
                    </span>
                  </div>
                );
              }

              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => votePoll(post.id, option.id)}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-[#1E2846] hover:border-[#4C8DFF] bg-white dark:bg-[#121A30] hover:bg-[#4C8DFF]/10 text-[#0F1419] dark:text-[#F2F5FF] font-medium text-xs text-left transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span className="group-hover:text-[#4C8DFF] transition-colors">{option.text}</span>
                  <span className="text-[10px] text-[#8A94B3] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    Vote
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-[#536471] dark:text-[#8A94B3]">
            <BarChart2 className="w-3 h-3 text-[#4C8DFF]" strokeWidth={1.8} />
            <span className="font-medium">{post.poll.totalVotes} votes</span>
            <span>·</span>
            <span>
              {post.poll.isClosed || (post.poll.expiresAt && new Date(post.poll.expiresAt).getTime() < Date.now())
                ? 'Final results'
                : `${post.poll.duration || '24h'} left`}
            </span>
          </div>
        </div>
      )}

      {/* Optional Location Pin Tag */}
      {post.location && (
        <div className="mt-2.5 flex items-center">
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#536471] dark:text-[#8A94B3] bg-slate-100 dark:bg-[#0A0F1E] px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-[#1E2846]">
            <MapPin className="w-3 h-3 text-[#4C8DFF]" strokeWidth={1.8} />
            <span>{post.location}</span>
          </span>
        </div>
      )}

      {/* Quoted Post Card */}
      {quotedPost && (
        <div className="mt-3 p-3 rounded-xl border border-slate-200 dark:border-[#1E2846] bg-slate-50 dark:bg-[#0A0F1E] text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-[#F2F5FF] mb-1">
            <CornerDownRight className="w-3.5 h-3.5 text-[#8A94B3]" strokeWidth={1.8} />
            <span>{(quotedPost as any).authorName || (quotedPost as any).author_name || 'Scholar'}</span>
            <VerifiedBadge
              type={(quotedPost as any).verificationTier || (quotedPost as any).verification_tier || 'none'}
              size="small"
            />
            <span className="font-normal text-[#8A94B3]">@{(quotedPost as any).username || (quotedPost as any).author_username || ''}</span>
          </div>
          <p className="text-slate-700 dark:text-[#8A94B3] line-clamp-3">
            {quotedPost.content}
          </p>
        </div>
      )}

      {/* Requirement 5: Divider above the action row */}
      <div className="border-t border-slate-100 dark:border-[#1E2846] mt-3.5 pt-1" />

      {/* Requirement 5: Action row: comment, repost, like, views, share. Evenly spaced, muted, with counts */}
      <div className="flex items-center justify-between w-full text-[#536471] dark:text-[#8A94B3] text-xs select-none">
        {/* Comment Action */}
        <button
          onClick={() => onOpenComments && onOpenComments(post)}
          title="Reply"
          aria-label="Reply to post"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 hover:text-[#4C8DFF] transition-colors duration-150 active:scale-95 cursor-pointer group"
        >
          <div className="p-1.5 rounded-full group-hover:bg-[#4C8DFF]/10 transition-colors">
            <MessageCircle className="w-4.5 h-4.5" strokeWidth={1.8} />
          </div>
          <span className="tabular-nums font-medium text-xs text-[#8A94B3] group-hover:text-[#4C8DFF]">
            {commentsCount}
          </span>
        </button>

        {/* Repost Action */}
        <button
          onClick={() => repostPost(post.id)}
          title="Repost"
          aria-label="Repost"
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 transition-colors duration-150 active:scale-95 cursor-pointer group ${
            isReposted ? 'text-emerald-400 font-semibold' : 'hover:text-emerald-400'
          }`}
        >
          <div className="p-1.5 rounded-full group-hover:bg-emerald-500/10 transition-colors">
            <Repeat2 className="w-4.5 h-4.5" strokeWidth={1.8} />
          </div>
          <span className={`tabular-nums font-medium text-xs ${isReposted ? 'text-emerald-400' : 'text-[#8A94B3] group-hover:text-emerald-400'}`}>
            {repostsCount}
          </span>
        </button>

        {/* Like Action */}
        <button
          onClick={() => toggleLikePost(post.id)}
          title="Like"
          aria-label="Like post"
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 transition-colors duration-150 active:scale-95 cursor-pointer group ${
            isLiked ? 'text-rose-400 font-semibold' : 'hover:text-rose-400'
          }`}
        >
          <div className="p-1.5 rounded-full group-hover:bg-rose-500/10 transition-colors">
            <Heart
              className={`w-4.5 h-4.5 transition-transform ${
                isLiked ? 'fill-rose-400 text-rose-400 scale-105' : ''
              }`}
              strokeWidth={1.8}
            />
          </div>
          <span className={`tabular-nums font-medium text-xs ${isLiked ? 'text-rose-400' : 'text-[#8A94B3] group-hover:text-rose-400'}`}>
            {likesCount}
          </span>
        </button>

        {/* Views Action (non-interactive metric) */}
        <div
          title="Views"
          className="min-h-[44px] flex items-center justify-center gap-1.5 text-[#536471] dark:text-[#8A94B3] cursor-default"
        >
          <div className="p-1.5 rounded-full">
            <BarChart2 className="w-4.5 h-4.5 text-[#8A94B3]" strokeWidth={1.8} />
          </div>
          <span className="tabular-nums font-medium text-xs text-[#8A94B3]">
            {(likesCount * 8 + commentsCount * 12 + 24).toLocaleString()}
          </span>
        </div>

        {/* Share Action */}
        <button
          onClick={handleShare}
          title="Share post"
          aria-label="Share post"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#536471] dark:text-[#8A94B3] hover:text-[#4C8DFF] transition-colors duration-150 active:scale-95 cursor-pointer group"
        >
          <div className="p-1.5 rounded-full group-hover:bg-[#4C8DFF]/10 transition-colors">
            <Share2 className="w-4.5 h-4.5" strokeWidth={1.8} />
          </div>
        </button>
      </div>

      {/* Report Content Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-[20px] bg-white p-5 shadow-2xl dark:bg-[#121A30] border border-slate-200 dark:border-[#1E2846]">
            <h3 className="text-sm font-bold text-slate-900 dark:text-[#F2F5FF]">Report Content</h3>
            <p className="text-xs text-[#536471] dark:text-[#8A94B3] mt-1">
              Help us maintain campus community integrity. Why are you reporting this post?
            </p>
            <form onSubmit={handleReportSubmit} className="mt-3 space-y-3">
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-[#1E2846] bg-transparent text-slate-900 dark:text-[#F2F5FF] focus:outline-none focus:border-[#4C8DFF]"
              >
                <option value="" disabled className="dark:bg-[#121A30]">Select a reason</option>
                <option value="Targeted harassment or bullying" className="dark:bg-[#121A30]">Targeted harassment or bullying</option>
                <option value="Doxxing or non-consensual private info" className="dark:bg-[#121A30]">Doxxing or private info</option>
                <option value="Academic dishonesty or scam" className="dark:bg-[#121A30]">Academic dishonesty or exam scam</option>
                <option value="Spam or fraudulent advertisement" className="dark:bg-[#121A30]">Spam or fraudulent ad</option>
                <option value="Misinformation or impersonation" className="dark:bg-[#121A30]">Misinformation or fake identity</option>
              </select>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 text-xs text-[#8A94B3] hover:text-[#F2F5FF] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer shadow-sm"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </article>
  );
};
