import React, { useState } from 'react';
import { Post } from '../types';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MessageCircle,
  Repeat2,
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
      return 'now';
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

  // Render body text with accent hashtags and mentions
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <span key={i} className="text-accent font-medium hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      if (part.startsWith('@')) {
        return (
          <span key={i} className="text-accent font-medium hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article className="card-theme p-3.5 mb-2.5 transition-colors duration-150">
      {/* Pinned Announcement */}
      {isPinned && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-muted mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Pinned Announcement</span>
        </div>
      )}

      {/* Repost Indicator */}
      {isReposted && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-muted mb-2">
          <Repeat2 className="w-3 h-3 text-success" strokeWidth={1.5} />
          <span>You reposted</span>
        </div>
      )}

      {/* Post Layout: Avatar + Content */}
      <div className="flex items-start gap-2.5">
        {/* Gradient avatar with white initials (around 32px) */}
        <div className="w-8 h-8 rounded-full avatar-gradient font-bold text-[12px] text-white flex items-center justify-center shrink-0 select-none shadow-xs mt-0.5">
          {authorInitial}
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Header line: bold name (13px), verified badge, @handle · time (10.5px muted), "..." menu */}
          <div className="flex items-center justify-between gap-1 leading-tight">
            <div className="flex items-center gap-1 min-w-0 overflow-hidden">
              {/* Names: 13px bold */}
              <span className="text-[13px] font-bold text-text truncate">
                {authorName}
              </span>

              {/* Verified Badge */}
              <VerifiedBadge type={authorTier} size="small" />

              {/* Handle and time: 10.5px muted */}
              <span className="text-[10.5px] text-text-muted font-normal truncate">
                @{authorUsername}
              </span>

              <span className="text-[10.5px] text-text-muted shrink-0">·</span>

              <span className="text-[10.5px] text-text-muted font-normal shrink-0 whitespace-nowrap">
                {formatTime(createdAtTime)}
              </span>

              {universityName && (
                <>
                  <span className="hidden sm:inline text-[10.5px] text-text-muted shrink-0">·</span>
                  <span className="hidden sm:inline text-[10.5px] text-text-muted truncate font-normal">
                    {universityName}
                  </span>
                </>
              )}
            </div>

            {/* "..." menu */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Post options"
                className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-full transition-colors duration-150 active:scale-95 cursor-pointer touch-target-44 -mr-1"
              >
                <MoreHorizontal className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-8 z-30 w-40 rounded-[14px] bg-surface border border-border shadow-xl py-1 text-[11px] animate-in fade-in zoom-in-95 duration-150">
                  {onQuote && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onQuote(post);
                      }}
                      className="w-full text-left px-3 py-2 text-text hover:bg-accent-soft/40 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <CornerDownRight className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                      <span>Quote Post</span>
                    </button>
                  )}

                  {isOwner && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setIsEditing(true);
                      }}
                      className="w-full text-left px-3 py-2 text-text hover:bg-accent-soft/40 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                      <span>Edit Post</span>
                    </button>
                  )}

                  {(isOwner || isAdmin) && (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        deletePost(post.id);
                      }}
                      className="w-full text-left px-3 py-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.5} />
                      <span>Delete Post</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowReportModal(true);
                    }}
                    className="w-full text-left px-3 py-2 text-text-muted hover:text-rose-500 hover:bg-accent-soft/40 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Flag className="w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
                    <span>Report Post</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Body text: 13px, line-height 1.5, regular, accent hashtags */}
          {isEditing ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                maxLength={320}
                rows={3}
                className="w-full text-[13px] leading-[1.5] p-2.5 rounded-xl border border-border bg-bg text-text focus:outline-none focus:border-accent"
              />
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-muted">{320 - editContent.length} chars left</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-2.5 py-1 text-text-muted hover:text-text rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="btn-primary-gradient px-3 py-1 rounded-full cursor-pointer shadow-xs text-[11px] font-bold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-[13px] leading-[1.5] font-normal text-text break-words whitespace-pre-wrap">
              {renderFormattedText(post.content)}
            </p>
          )}

          {/* Interactive Poll Card (if present) */}
          {post.poll && (
            <div className="mt-2.5 p-3 rounded-[12px] border border-border bg-bg/60 space-y-2 text-xs">
              {post.poll.question && post.poll.question !== post.content && (
                <div className="font-semibold text-text mb-1 text-[12px]">
                  {post.poll.question}
                </div>
              )}

              <div className="space-y-1.5">
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
                        className={`relative overflow-hidden rounded-lg border p-2 flex items-center justify-between text-[11px] transition-all ${
                          isMyVote
                            ? 'border-accent bg-surface font-semibold'
                            : 'border-border bg-surface/50'
                        }`}
                      >
                        <div
                          className={`absolute inset-y-0 left-0 transition-all duration-700 ease-out ${
                            isMyVote
                              ? 'bg-accent/20'
                              : 'bg-border/60'
                          }`}
                          style={{ width: `${percent}%` }}
                        />

                        <div className="relative z-10 flex items-center gap-1.5 min-w-0 pr-2">
                          <span className="text-text truncate">
                            {option.text}
                          </span>
                          {isMyVote && (
                            <CheckCircle2 className="w-3 h-3 text-accent shrink-0" strokeWidth={1.5} />
                          )}
                        </div>

                        <span className="relative z-10 font-mono text-[10.5px] font-bold text-text-muted shrink-0 tabular-nums">
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
                      className="w-full py-1.5 px-3 rounded-full border border-border hover:border-accent bg-surface hover:bg-accent-soft/30 text-text font-medium text-[11px] text-left transition-colors cursor-pointer flex items-center justify-between group touch-target-44"
                    >
                      <span className="group-hover:text-accent transition-colors">{option.text}</span>
                      <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                        Vote
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 pt-0.5 text-[10.5px] text-text-muted">
                <BarChart2 className="w-3 h-3 text-accent" strokeWidth={1.5} />
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

          {/* Location Pin */}
          {post.location && (
            <div className="mt-2 flex items-center">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-muted bg-bg px-2 py-0.5 rounded-full border border-border">
                <MapPin className="w-3 h-3 text-accent" strokeWidth={1.5} />
                <span>{post.location}</span>
              </span>
            </div>
          )}

          {/* Quoted Post Card */}
          {quotedPost && (
            <div className="mt-2.5 p-2.5 rounded-[12px] border border-border bg-bg/80 text-xs">
              <div className="flex items-center gap-1 font-semibold text-text mb-0.5">
                <CornerDownRight className="w-3 h-3 text-text-muted" strokeWidth={1.5} />
                <span className="text-[11px]">{(quotedPost as any).authorName || (quotedPost as any).author_name || 'Scholar'}</span>
                <VerifiedBadge
                  type={(quotedPost as any).verificationTier || (quotedPost as any).verification_tier || 'none'}
                  size="small"
                />
                <span className="font-normal text-[10.5px] text-text-muted">@{(quotedPost as any).username || (quotedPost as any).author_username || ''}</span>
              </div>
              <p className="text-text-muted text-[11px] line-clamp-3">
                {quotedPost.content}
              </p>
            </div>
          )}

          {/* Hairline Divider above the action row */}
          <div className="border-t border-border mt-2.5 pt-0.5" />

          {/* Action Row: comment, repost, like, views, share. Evenly spaced and muted, with counts at 11px */}
          <div className="flex items-center justify-between w-full text-text-muted select-none pt-0.5">
            {/* Comment */}
            <button
              onClick={() => onOpenComments && onOpenComments(post)}
              title="Reply"
              aria-label="Reply to post"
              className="flex items-center gap-1 text-text-muted hover:text-accent transition-colors duration-150 active:scale-95 cursor-pointer group touch-target-44 py-1"
            >
              <div className="p-1 rounded-full group-hover:bg-accent-soft/40 transition-colors">
                <MessageCircle className="w-4 h-4 text-text-muted group-hover:text-accent" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] tabular-nums font-normal group-hover:text-accent">
                {commentsCount}
              </span>
            </button>

            {/* Repost */}
            <button
              onClick={() => repostPost(post.id)}
              title="Repost"
              aria-label="Repost"
              className={`flex items-center gap-1 transition-colors duration-150 active:scale-95 cursor-pointer group touch-target-44 py-1 ${
                isReposted ? 'text-success font-semibold' : 'text-text-muted hover:text-success'
              }`}
            >
              <div className="p-1 rounded-full group-hover:bg-success/10 transition-colors">
                <Repeat2 className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <span className={`text-[11px] tabular-nums font-normal ${isReposted ? 'text-success' : 'group-hover:text-success'}`}>
                {repostsCount}
              </span>
            </button>

            {/* Like */}
            <button
              onClick={() => toggleLikePost(post.id)}
              title="Like"
              aria-label="Like post"
              className={`flex items-center gap-1 transition-colors duration-150 active:scale-95 cursor-pointer group touch-target-44 py-1 ${
                isLiked ? 'text-live font-semibold' : 'text-text-muted hover:text-live'
              }`}
            >
              <div className="p-1 rounded-full group-hover:bg-live/10 transition-colors">
                <Heart
                  className={`w-4 h-4 transition-transform ${
                    isLiked ? 'fill-live text-live scale-105' : 'text-text-muted group-hover:text-live'
                  }`}
                  strokeWidth={1.5}
                />
              </div>
              <span className={`text-[11px] tabular-nums font-normal ${isLiked ? 'text-live' : 'group-hover:text-live'}`}>
                {likesCount}
              </span>
            </button>

            {/* Views */}
            <div
              title="Views"
              className="flex items-center gap-1 text-text-muted cursor-default py-1"
            >
              <div className="p-1 rounded-full">
                <BarChart2 className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] tabular-nums font-normal text-text-muted">
                {(likesCount * 8 + commentsCount * 12 + 24).toLocaleString()}
              </span>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              title="Share post"
              aria-label="Share post"
              className="flex items-center text-text-muted hover:text-accent transition-colors duration-150 active:scale-95 cursor-pointer group touch-target-44 py-1"
            >
              <div className="p-1 rounded-full group-hover:bg-accent-soft/40 transition-colors">
                <Share2 className="w-4 h-4 text-text-muted group-hover:text-accent" strokeWidth={1.5} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Report Content Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-[14px] bg-surface p-4 shadow-2xl border border-border">
            <h3 className="text-[13px] font-bold text-text">Report Content</h3>
            <p className="text-[11px] text-text-muted mt-0.5">
              Help us maintain campus community integrity. Why are you reporting this post?
            </p>
            <form onSubmit={handleReportSubmit} className="mt-3 space-y-2.5">
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                required
                className="w-full text-[11px] p-2 rounded-lg border border-border bg-bg text-text focus:outline-none focus:border-accent"
              >
                <option value="" disabled className="bg-surface text-text">Select a reason</option>
                <option value="Targeted harassment or bullying" className="bg-surface text-text">Targeted harassment or bullying</option>
                <option value="Doxxing or non-consensual private info" className="bg-surface text-text">Doxxing or private info</option>
                <option value="Academic dishonesty or scam" className="bg-surface text-text">Academic dishonesty or exam scam</option>
                <option value="Spam or fraudulent advertisement" className="bg-surface text-text">Spam or fraudulent ad</option>
                <option value="Misinformation or impersonation" className="bg-surface text-text">Misinformation or fake identity</option>
              </select>

              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 text-[11px] font-medium text-text-muted hover:text-text rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-gradient px-4 py-1.5 rounded-full text-[11px] font-bold text-white shadow-xs cursor-pointer"
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
