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
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#16181C] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between">
          <span className="page-title text-[20px] font-extrabold text-[#0F1419] dark:text-[#E7E9EA]">
            Campus Discussion ({commentsCount})
          </span>
          <button
            onClick={onClose}
            className="p-2 -m-2 text-[#536471] dark:text-[#71767B] hover:text-[#0F1419] dark:hover:text-[#E7E9EA] rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Original Post Summary: 40px round avatar, 12px gap */}
        <div className="p-4 border-b border-[#EFF3F4] dark:border-[#2F3336] bg-slate-50/40 dark:bg-slate-900/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F1419] dark:text-[#E7E9EA] font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 text-[15px] select-none">
              {authorName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 min-w-0 overflow-hidden leading-tight">
                <span className="font-bold text-[15px] text-[#0F1419] dark:text-[#E7E9EA] truncate">
                  {authorName}
                </span>
                <VerifiedBadge type={postTier} size="small" />
                <span className="font-normal text-[15px] text-[#536471] dark:text-[#71767B] truncate">
                  @{post.username || post.author?.username}
                </span>
              </div>
              <p className="mt-1 post-text text-[#0F1419] dark:text-[#E7E9EA] break-words">
                {post.content}
              </p>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#EFF3F4] dark:divide-[#2F3336]">
          {comments.length === 0 ? (
            <div className="text-center py-12 text-[15px] text-[#536471] dark:text-[#71767B]">
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
                  {/* 40px round avatar */}
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F1419] dark:text-[#E7E9EA] font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 text-[15px] select-none">
                    {cInitial}
                  </div>
                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 min-w-0 overflow-hidden leading-tight">
                      <span className="display-name font-bold text-[15px] text-[#0F1419] dark:text-[#E7E9EA] truncate shrink-0 max-w-[140px] sm:max-w-[200px]">
                        {cName}
                      </span>
                      <VerifiedBadge type={cTier} size="small" />
                      <span className="handle-text font-normal text-[15px] text-[#536471] dark:text-[#71767B] truncate shrink min-w-0">
                        @{comment.username}
                      </span>
                      <span className="text-[#536471] dark:text-[#71767B] shrink-0" aria-hidden="true">·</span>
                      <span className="timestamp-text font-normal text-[15px] text-[#536471] dark:text-[#71767B] shrink-0 whitespace-nowrap">
                        {new Date(cDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {/* Comment text: 15px / 20px line-height, weight 400 */}
                    <p className="mt-1 comment-text text-[#0F1419] dark:text-[#E7E9EA] break-words whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Comment Composer Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-[#EFF3F4] dark:border-[#2F3336] flex items-center gap-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Post your reply..."
            className="flex-1 text-[15px] px-3.5 py-2 rounded-full bg-slate-100 dark:bg-[#16181C] border border-transparent focus:border-[#1D9BF0] text-[#0F1419] dark:text-[#E7E9EA] placeholder-[#536471] dark:placeholder-[#71767B] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="btn-pill px-4 py-2 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white disabled:opacity-40 transition-all cursor-pointer shadow-xs"
          >
            Reply
          </button>
        </form>
      </div>
    </div>
  );
};
