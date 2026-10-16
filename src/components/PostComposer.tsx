import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Post, PostCategory } from '../types';
import {
  X,
  Send,
  Building2,
  Tag,
  CornerDownRight,
  Sparkles
} from 'lucide-react';

interface PostComposerProps {
  quotePost?: Post | null;
  onClose?: () => void;
  defaultCategory?: PostCategory;
}

export const PostComposer: React.FC<PostComposerProps> = ({
  quotePost,
  onClose,
  defaultCategory = 'general'
}) => {
  const {
    currentUser,
    createPost,
    universities,
    selectedUniversityId,
    setIsComposerOpen
  } = useApp();

  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>(defaultCategory);
  const [universityId, setUniversityId] = useState<string>(
    selectedUniversityId !== 'all' ? selectedUniversityId : currentUser?.universityId || currentUser?.university_id || ''
  );

  const MAX_CHARS = 280;
  const charsRemaining = MAX_CHARS - content.length;
  const isOverLimit = charsRemaining < 0;
  const canSubmit = content.trim().length > 0 && !isOverLimit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    createPost(content, category, universityId || undefined, quotePost || undefined);
    setContent('');
    if (onClose) {
      onClose();
    } else {
      setIsComposerOpen(false);
    }
  };

  const handleAddHashtag = (tag: string) => {
    if (content.includes(tag)) return;
    setContent((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  const quickTags = ['#CampusLife', '#Exams', '#Tech', '#Gist', '#Marketplace'];

  return (
    <div className="p-4 bg-white dark:bg-[#0A0A0A] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-start gap-3">
        {/* User Initial Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#1D9BF0]/15 text-[#1D9BF0] font-bold flex items-center justify-center shrink-0 border border-[#1D9BF0]/30">
          {(currentUser?.fullName || currentUser?.full_name || 'U').charAt(0).toUpperCase()}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 min-w-0">
          {/* Post Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening on your campus?"
            rows={3}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
          />

          {/* Quoted Post Preview */}
          {quotePost && (
            <div className="my-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#16181C] text-xs">
              <div className="flex items-center gap-1 font-medium text-slate-800 dark:text-slate-200 mb-0.5">
                <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Quoting @{quotePost.author.username}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                {quotePost.content}
              </p>
            </div>
          )}

          {/* Quick Hashtag suggestions */}
          <div className="flex items-center gap-1.5 flex-wrap my-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3" />
            </span>
            {quickTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleAddHashtag(tag)}
                className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-[#1D9BF0] transition-colors py-0.5 px-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Controls Bar: Category, University, Character Counter, Submit */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {/* Category selector */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PostCategory)}
                className="bg-slate-100 dark:bg-[#16181C] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-2 py-1 focus:outline-none text-xs cursor-pointer"
              >
                <option value="general">General</option>
                <option value="entertainment">Entertainment</option>
                <option value="academics">Academics</option>
                <option value="career">Career / Jobs</option>
                <option value="gaming">Gaming & Arena</option>
                <option value="campus_news">Campus News</option>
                <option value="events">Events</option>
                <option value="marketplace">Marketplace</option>
              </select>

              {/* University Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#16181C] border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300">
                <Building2 className="w-3 h-3 text-[#1D9BF0]" />
                <select
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  className="bg-transparent border-none text-xs focus:outline-none cursor-pointer text-slate-700 dark:text-slate-300"
                >
                  <option value="" className="dark:bg-[#16181C]">Network-wide</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id} className="dark:bg-[#16181C]">
                      {u.shortName || u.short_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text-only policy badge */}
              <span className="hidden sm:inline text-[11px] text-slate-400">
                Text-first platform
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Character Counter */}
              <span
                className={`text-xs tabular-nums font-medium ${
                  isOverLimit
                    ? 'text-red-500 font-bold'
                    : charsRemaining <= 20
                    ? 'text-amber-500'
                    : 'text-slate-400'
                }`}
              >
                {charsRemaining}
              </span>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1D9BF0] text-white text-xs font-semibold hover:bg-[#1A8CD8] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-xs"
              >
                <Send className="w-3 h-3" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
