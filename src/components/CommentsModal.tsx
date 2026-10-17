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
  const { comments: allComments, addComment, currentUser } = useApp();
  const [commentText, setCommentText] = useState('');

  const comments = allComments[post.id] || [];
  const commentsCount = comments.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  const authorName = post.authorName || post.author?.fullName || post.author?.full_name || 'Scholar';
  const postTier = post.verificationTier || post.verification_tier || post.author?.verificationTier || (post.isVerified ? 'blue' : 'none');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg card-theme shadow-2xl flex flex-col max-h-[85vh] overflow-hidden rounded-[14px]">
        {/* Header */}
        <div className="p-3.5 border-b border-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-text">
            Campus Discussion ({commentsCount})
          </span>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-text-muted hover:text-text rounded-full hover:bg-accent-soft/40 transition-colors cursor-pointer touch-target-44 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
          </button>
        </div>

        {/* Original Post Summary */}
        <div className="p-3 border-b border-border bg-bg/50">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full avatar-gradient font-bold text-[11px] text-white flex items-center justify-center shrink-0 shadow-xs select-none">
              {authorName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 min-w-0 overflow-hidden leading-tight">
                <span className="text-[13px] font-bold text-text truncate">
                  {authorName}
                </span>
                <VerifiedBadge type={postTier} size="small" />
                <span className="text-[10.5px] text-text-muted truncate">
                  @{post.username || post.author?.username}
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-[1.5] text-text break-words">
                {post.content}
              </p>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-[12px] text-text-muted">
              No replies yet. Start the conversation!
            </div>
          ) : (
            comments.map((comment) => {
              const cName = comment.authorName || comment.author?.fullName || comment.author?.full_name || 'Scholar';
              const cInitial = cName.charAt(0).toUpperCase();
              const cDate = comment.createdAt || comment.created_at || new Date().toISOString();
              const cTier = comment.verificationTier || comment.verification_tier || comment.author?.verificationTier || comment.author?.verification_tier || 'none';
              return (
                <div key={comment.id} className="p-3 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full avatar-gradient font-bold text-[11px] text-white flex items-center justify-center shrink-0 select-none shadow-xs mt-0.5">
                    {cInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 min-w-0 overflow-hidden leading-tight">
                      <span className="text-[13px] font-bold text-text truncate shrink-0 max-w-[130px] sm:max-w-[180px]">
                        {cName}
                      </span>
                      <VerifiedBadge type={cTier} size="small" />
                      <span className="text-[10.5px] text-text-muted truncate shrink min-w-0">
                        @{comment.username}
                      </span>
                      <span className="text-[10.5px] text-text-muted shrink-0" aria-hidden="true">·</span>
                      <span className="text-[10.5px] text-text-muted shrink-0 whitespace-nowrap">
                        {new Date(cDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] leading-[1.5] text-text break-words whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Comment Composer Input */}
        <form onSubmit={handleSubmit} className="p-2.5 border-t border-border flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Post your reply..."
            className="flex-1 text-[12px] px-3 py-1.5 rounded-full bg-bg border border-border focus:border-accent text-text placeholder:text-text-muted focus:outline-none"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="h-7 px-3.5 rounded-full btn-primary-gradient text-white text-[11px] font-bold shrink-0 hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer shadow-xs active:scale-95 touch-target-44 flex items-center gap-1"
          >
            <Send className="w-3 h-3 text-white" strokeWidth={1.5} />
            <span>Reply</span>
          </button>
        </form>
      </div>
    </div>
  );
};
