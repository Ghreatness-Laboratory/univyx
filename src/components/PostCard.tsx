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
  BarChart2
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
    showToast
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
  const isVerified = post.author?.isVerified ?? post.author?.is_verified ?? true;
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

  // Render text with clickable #hashtags and @mentions
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <span key={i} className="text-[#1D9BF0] font-medium hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      if (part.startsWith('@')) {
        return (
          <span key={i} className="text-[#1D9BF0] font-medium hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article className="p-3.5 sm:p-4 border-b border-[#EFF3F4] dark:border-[#2F3336] bg-white dark:bg-[#000000] hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors relative">
      {/* Pinned note if pinned */}
      {isPinned && (
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#536471] dark:text-[#71767B] mb-1.5 pl-13">
          <span>Pinned Announcement</span>
        </div>
      )}

      {/* Repost indicator with VerifiedBadge */}
      {isReposted && (
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#536471] dark:text-[#71767B] mb-1.5 pl-13">
          <Repeat2 className="w-4 h-4 text-emerald-500" />
          <span>You reposted</span>
          <VerifiedBadge
            type={currentUser?.verificationTier || currentUser?.verification_tier || 'none'}
            size="small"
          />
        </div>
      )}

      {/* 40px round avatar + 12px gap (gap-3 = 12px) */}
      <div className="flex items-start gap-3">
        {/* Author Avatar: exactly 40px round (w-10 h-10 = 40px) */}
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F1419] dark:text-[#E7E9EA] font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 text-[15px] select-none">
          {authorInitial}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          {/* Header Metadata: Name and handle on ONE line with ellipsis */}
          <div className="flex items-center justify-between gap-1 min-w-0 leading-tight">
            <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
              {/* Display name: 15px, weight 700 */}
              <span className="display-name font-bold text-[15px] text-[#0F1419] dark:text-[#E7E9EA] truncate shrink-0 max-w-[140px] sm:max-w-[200px] hover:underline cursor-pointer">
                {authorName}
              </span>

              {/* Verified Badge */}
              <VerifiedBadge
                type={
                  post.verificationTier ||
                  post.verification_tier ||
                  post.author?.verificationTier ||
                  post.author?.verification_tier ||
                  (isVerified ? 'blue' : 'none')
                }
                size="small"
              />

              {/* @handle: 15px, weight 400, secondary color */}
              <span className="handle-text font-normal text-[15px] text-[#536471] dark:text-[#71767B] truncate shrink min-w-0">
                @{authorUsername}
              </span>

              <span className="text-[#536471] dark:text-[#71767B] shrink-0" aria-hidden="true">·</span>

              {/* Timestamp: 15px, weight 400, secondary color */}
              <span className="timestamp-text font-normal text-[15px] text-[#536471] dark:text-[#71767B] shrink-0 whitespace-nowrap">
                {formatTime(createdAtTime)}
              </span>
            </div>

            {/* Menu Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Post actions"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMenu && (
                <div
                  className="absolute right-0 top-6 w-44 bg-white dark:bg-[#16181C] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-20 text-xs text-slate-700 dark:text-slate-300"
                  onMouseLeave={() => setShowMenu(false)}
                >
                  {isOwner && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setIsEditing(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Post</span>
                    </button>
                  )}
                  {(isOwner || isAdmin) && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        deletePost(post.id);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 text-left"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Post</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowReportModal(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                  >
                    <Flag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Report Post</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Text or Inline Editor */}
          {isEditing ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                maxLength={320}
                rows={3}
                className="w-full text-sm p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{320 - editContent.length} chars left</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-[#1D9BF0] text-white rounded font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Post text underneath: 15px / 20px line-height, weight 400 */
            <p className="mt-1 post-text text-[#0F1419] dark:text-[#E7E9EA] break-words whitespace-pre-wrap">
              {renderFormattedText(post.content)}
            </p>
          )}

          {/* Quoted Post Card (if quote-post) */}
          {quotedPost && (
            <div className="mt-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#16181C]/60 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white mb-1">
                <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                <span>{(quotedPost as any).authorName || (quotedPost as any).author_name || 'Scholar'}</span>
                <VerifiedBadge
                  type={(quotedPost as any).verificationTier || (quotedPost as any).verification_tier || 'none'}
                  size="small"
                />
                <span className="font-normal text-slate-500">@{(quotedPost as any).username || (quotedPost as any).author_username || ''}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 line-clamp-3">
                {quotedPost.content}
              </p>
            </div>
          )}

          {/* Action Row: Evenly spaced row, action counts in 13px secondary color */}
          <div className="mt-3 flex items-center justify-between w-full max-w-md text-[#536471] dark:text-[#71767B]">
            {/* Reply / Comment */}
            <button
              onClick={() => onOpenComments && onOpenComments(post)}
              className="flex items-center gap-1 hover:text-[#1D9BF0] transition-colors group cursor-pointer"
            >
              <div className="p-2 -m-2 rounded-full group-hover:bg-[#1D9BF0]/10 transition-colors">
                <MessageCircle className="w-4.5 h-4.5" />
              </div>
              <span className="action-count tabular-nums ml-1.5">{commentsCount}</span>
            </button>

            {/* Repost / Quote */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => repostPost(post.id)}
                title="Repost"
                className={`flex items-center gap-1 transition-colors group cursor-pointer ${
                  isReposted ? 'text-green-500 font-semibold' : 'hover:text-green-500'
                }`}
              >
                <div className="p-2 -m-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                  <Repeat2 className="w-4.5 h-4.5" />
                </div>
                <span className={`action-count tabular-nums ml-1.5 ${isReposted ? '!text-green-500 font-semibold' : ''}`}>
                  {repostsCount}
                </span>
              </button>
            </div>

            {/* Like */}
            <button
              onClick={() => toggleLikePost(post.id)}
              className={`flex items-center gap-1 transition-colors group cursor-pointer ${
                isLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-500'
              }`}
            >
              <div className="p-2 -m-2 rounded-full group-hover:bg-rose-500/10 transition-colors">
                <Heart
                  className={`w-4.5 h-4.5 transition-transform ${
                    isLiked ? 'fill-rose-500 scale-110 text-rose-500' : ''
                  }`}
                />
              </div>
              <span className={`action-count tabular-nums ml-1.5 ${isLiked ? '!text-rose-500 font-semibold' : ''}`}>
                {likesCount}
              </span>
            </button>

            {/* Views Count: 13px, secondary color */}
            <div className="flex items-center gap-1 hover:text-[#1D9BF0] transition-colors group cursor-default select-none">
              <div className="p-2 -m-2 rounded-full group-hover:bg-[#1D9BF0]/10 transition-colors">
                <BarChart2 className="w-4.5 h-4.5" />
              </div>
              <span className="action-count tabular-nums ml-1.5">
                {(likesCount * 8 + commentsCount * 12 + 14).toLocaleString()}
              </span>
            </div>

            {/* Bookmark & Share */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleBookmarkPost(post.id)}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Post'}
                className={`p-2 -m-2 rounded-full transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'text-[#1D9BF0] bg-[#1D9BF0]/10'
                    : 'hover:text-[#1D9BF0] hover:bg-[#1D9BF0]/10'
                }`}
              >
                <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-[#1D9BF0]' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                title="Share post"
                className="p-2 -m-2 ml-1 rounded-full hover:text-[#1D9BF0] hover:bg-[#1D9BF0]/10 transition-colors cursor-pointer"
              >
                <Share2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Report Content</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Help us maintain community guidelines. Why are you reporting this post?
            </p>
            <form onSubmit={handleReportSubmit} className="mt-3 space-y-3">
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
              >
                <option value="" disabled className="dark:bg-[#16181C]">Select a reason</option>
                <option value="Targeted harassment or bullying" className="dark:bg-[#16181C]">Targeted harassment or bullying</option>
                <option value="Doxxing or non-consensual private info" className="dark:bg-[#16181C]">Doxxing or private information</option>
                <option value="Academic dishonesty or scam" className="dark:bg-[#16181C]">Academic dishonesty or scam</option>
                <option value="Spam or fraudulent advertisement" className="dark:bg-[#16181C]">Spam or fraudulent advertisement</option>
                <option value="Misinformation or impersonation" className="dark:bg-[#16181C]">Misinformation or impersonation</option>
              </select>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
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
