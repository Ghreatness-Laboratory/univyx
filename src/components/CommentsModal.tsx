import React, { useState } from 'react';
import { Post } from '../types';
import { useApp } from '../context/AppContext';
import { X, Send } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';

interface CommentsModalProps {
  post: Post;
  onClose: () => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ post, onClose }) => {
  const { getCommentsForPost, addComment, currentUser } = useApp();
  const [commentText, setCommentText] = useState('');

  const comments = getCommentsForPost(post.id);
  const commentsCount = post.commentsCount ?? post.comments_count ?? comments.length;
  const authorName = post.authorName || post.author?.fullName || post.author?.full_name || 'Scholar';
  const postTier = post.verificationTier || post.verification_tier || post.author?.verificationTier || post.author?.verification_tier || 'none';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg card-theme shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="text-base font-bold text-text">
            Campus Discussion ({commentsCount})
          </span>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 -m-2 text-text-muted hover:text-text rounded-full hover:bg-accent-soft/40 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
          </button>
        </div>

        {/* Original Post Summary */}
        <div className="p-4 border-b border-border bg-bg/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full avatar-gradient font-bold text-sm flex items-center justify-center shrink-0 shadow-sm select-none">
              {authorName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 min-w-0 overflow-hidden leading-tight">
                <span className="font-bold text-[15px] text-text truncate">
                  {authorName}
                </span>
                <VerifiedBadge type={postTier} size="small" />
                <span className="font-normal text-xs text-text-muted truncate">
                  @{post.username || post.author?.username}
                </span>
              </div>
              <p className="mt-1 text-[15px] leading-[1.5] text-text break-words">
                {post.content}
              </p>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {comments.length === 0 ? (
            <div className="text-center py-12 text-sm text-text-muted">
              No replies yet. Start the conversation!
            </div>
          ) : (
            comments.map((comment) => {
              const cName = comment.authorName || comment.author?.fullName || comment.author?.full_name || 'Scholar';
              const cInitial = cName.charAt(0).toUpperCase();
              const cDate = comment.createdAt || comment.created_at || new Date().toISOString();
              const cTier = comment.verificationTier || comment.verification_tier || comment.author?.verificationTier || comment.author?.verification_tier || 'none';
              return (
                <div key={comment.id} className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full avatar-gradient font-bold flex items-center justify-center shrink-0 text-sm select-none">
                    {cInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0 overflow-hidden leading-tight">
                      <span className="font-bold text-[14px] text-text truncate shrink-0 max-w-[140px] sm:max-w-[200px]">
                        {cName}
                      </span>
                      <VerifiedBadge type={cTier} size="small" />
                      <span className="font-normal text-xs text-text-muted truncate shrink min-w-0">
                        @{comment.username}
                      </span>
                      <span className="text-text-muted shrink-0" aria-hidden="true">·</span>
                      <span className="font-normal text-xs text-text-muted shrink-0 whitespace-nowrap">
                        {new Date(cDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-[1.5] text-text break-words whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Comment Composer Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-border flex items-center gap-2.5">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Post your reply..."
            className="flex-1 text-sm px-4 py-2.5 rounded-full bg-bg border border-border focus:border-accent text-text placeholder:text-text-muted focus:outline-none"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="btn-primary-gradient px-5 py-2.5 rounded-full text-xs font-semibold hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Reply
          </button>
        </form>
      </div>
    </div>
  );
};
