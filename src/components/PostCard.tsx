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
  CornerDownRight
} from 'lucide-react';

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

  const isOwner = currentUser?.id === post.author_id;
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'superadmin' || currentUser?.role === 'moderator';

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
      title: `Post by @${post.author.username} on univyX`,
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
    <article className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0A] hover:bg-slate-50/50 dark:hover:bg-[#111316] transition-colors relative">
      {/* Pinned note if pinned */}
      {post.is_pinned && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 pl-12 font-medium">
          <span>Pinned Announcement</span>
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Author Avatar Initial */}
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
          {post.author.full_name.charAt(0)}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          {/* Header Metadata (Unboxed text with · separators, Anti-pill discipline) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="font-semibold text-slate-900 dark:text-white text-sm hover:underline cursor-pointer">
                {post.author.full_name}
              </span>
              {post.author.is_verified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9BF0] shrink-0" />
              )}
              <span className="text-slate-500 dark:text-slate-400">
                @{post.author.username}
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              {post.university_name && (
                <>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {post.university_name}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
                </>
              )}
              <span className="text-slate-400 dark:text-slate-500">
                {formatTime(post.created_at)}
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <span className="text-slate-500 dark:text-slate-400 capitalize">
                {post.category.replace('_', ' ')}
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
            <p className="mt-1.5 text-sm text-slate-800 dark:text-slate-200 leading-relaxed break-words whitespace-pre-wrap">
              {renderFormattedText(post.content)}
            </p>
          )}

          {/* Quoted Post Card (if quote-post) */}
          {post.quoted_post && (
            <div className="mt-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#16181C]/60 text-xs">
              <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white mb-1">
                <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.quoted_post.author_name}</span>
                <span className="font-normal text-slate-500">@{post.quoted_post.author_username}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 line-clamp-3">
                {post.quoted_post.content}
              </p>
            </div>
          )}

          {/* Action Row: Comments, Repost/Quote, Like, Bookmark, Share */}
          <div className="mt-3.5 flex items-center justify-between max-w-md text-slate-500 dark:text-slate-400 text-xs">
            {/* Comment */}
            <button
              onClick={() => onOpenComments && onOpenComments(post)}
              className="flex items-center gap-1.5 hover:text-[#1D9BF0] transition-colors group"
            >
              <div className="p-1.5 rounded-full group-hover:bg-[#1D9BF0]/10 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="tabular-nums font-medium">{post.comments_count}</span>
            </button>

            {/* Repost / Quote */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => repostPost(post.id)}
                title="Repost"
                className={`flex items-center gap-1.5 transition-colors group ${
                  post.is_reposted ? 'text-green-500 font-semibold' : 'hover:text-green-500'
                }`}
              >
                <div className="p-1.5 rounded-full group-hover:bg-green-500/10 transition-colors">
                  <Repeat2 className="w-4 h-4" />
                </div>
                <span className="tabular-nums font-medium">{post.reposts_count}</span>
              </button>
              {onQuote && (
                <button
                  onClick={() => onQuote(post)}
                  title="Quote post"
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 pl-0.5"
                >
                  Quote
                </button>
              )}
            </div>

            {/* Like */}
            <button
              onClick={() => toggleLikePost(post.id)}
              className={`flex items-center gap-1.5 transition-colors group ${
                post.is_liked ? 'text-rose-500 font-semibold' : 'hover:text-rose-500'
              }`}
            >
              <div className="p-1.5 rounded-full group-hover:bg-rose-500/10 transition-colors">
                <Heart
                  className={`w-4 h-4 transition-transform ${
                    post.is_liked ? 'fill-rose-500 scale-110' : ''
                  }`}
                />
              </div>
              <span className="tabular-nums font-medium">{post.likes_count}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmarkPost(post.id)}
              title={post.is_bookmarked ? 'Remove Bookmark' : 'Bookmark Post'}
              className={`p-1.5 rounded-full transition-colors ${
                post.is_bookmarked
                  ? 'text-[#1D9BF0] bg-[#1D9BF0]/10'
                  : 'hover:text-[#1D9BF0] hover:bg-[#1D9BF0]/10'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${post.is_bookmarked ? 'fill-[#1D9BF0]' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              title="Share post"
              className="p-1.5 rounded-full hover:text-[#1D9BF0] hover:bg-[#1D9BF0]/10 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
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
