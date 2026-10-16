import React, { useState } from 'react';
import { Post } from '../types';
import { useApp } from '../context/AppContext';
import { X, Send, Heart, CheckCircle2 } from 'lucide-react';

interface CommentsModalProps {
  post: Post;
  onClose: () => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ post, onClose }) => {
  const { getCommentsForPost, addComment, currentUser } = useApp();
  const [commentText, setCommentText] = useState('');

  const comments = getCommentsForPost(post.id);

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
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Campus Discussion ({post.comments_count})
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Original Post Summary */}
        <div className="p-4 bg-slate-50/50 dark:bg-[#0A0A0A]/50 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-white mb-1">
            <span>{post.author.full_name}</span>
            {post.author.is_verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9BF0]" />
            )}
            <span className="text-slate-400">@{post.author.username}</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No replies yet. Start the conversation!
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 text-[11px] border border-slate-200 dark:border-slate-700">
                  {comment.author.full_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0 bg-slate-50 dark:bg-[#0A0A0A] p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {comment.author.full_name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="mt-1 text-slate-700 dark:text-slate-300 leading-normal">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Composer Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Post your reply..."
            maxLength={280}
            className="flex-1 text-xs p-2.5 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1D9BF0]"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-2.5 rounded-xl bg-[#1D9BF0] text-white hover:bg-[#1A8CD8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
