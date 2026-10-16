import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Post, PostCategory, VerificationTier } from '../types';
import { VerifiedBadge } from './VerifiedBadge';
import {
  X,
  Send,
  Building2,
  Tag,
  CornerDownRight,
  Sparkles,
  AtSign,
  Users
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
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const mentionableAccounts = [
    {
      name: 'Covenant University',
      username: 'covenant_official',
      tier: 'gold' as VerificationTier,
      university: 'Covenant University'
    },
    {
      name: 'CST Student Council',
      username: 'cst_council',
      tier: 'gold' as VerificationTier,
      university: 'Covenant University'
    },
    {
      name: 'Korede Balogun',
      username: 'korede_babcock',
      tier: 'blue' as VerificationTier,
      university: 'Babcock University'
    },
    {
      name: 'Tobi Adebayo',
      username: 'tobi_adebayo',
      tier: 'none' as VerificationTier,
      university: 'Babcock University'
    },
    {
      name: 'Zainab Al-Hassan',
      username: 'zainab_nile',
      tier: 'blue' as VerificationTier,
      university: 'Nile University of Nigeria'
    },
    {
      name: 'Adedamola Adeleke',
      username: 'damola_abuad',
      tier: 'blue' as VerificationTier,
      university: 'Afe Babalola University (ABUAD)'
    }
  ];

  const filteredMentions = mentionableAccounts.filter(
    (acc) =>
      acc.username.toLowerCase().includes(mentionQuery.toLowerCase()) ||
      acc.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);

    // Detect if typing a mention
    const cursorPos = e.target.selectionEnd || val.length;
    const textBeforeCursor = val.slice(0, cursorPos);
    const lastAtPos = textBeforeCursor.lastIndexOf('@');

    if (lastAtPos !== -1 && (lastAtPos === 0 || /\s/.test(textBeforeCursor[lastAtPos - 1]))) {
      const query = textBeforeCursor.slice(lastAtPos + 1);
      if (!/\s/.test(query)) {
        setMentionQuery(query);
        setShowMentionMenu(true);
        return;
      }
    }
    setShowMentionMenu(false);
  };

  const insertMention = (username: string) => {
    const cursorPos = textareaRef.current?.selectionEnd || content.length;
    const textBeforeCursor = content.slice(0, cursorPos);
    const textAfterCursor = content.slice(cursorPos);
    const lastAtPos = textBeforeCursor.lastIndexOf('@');

    let newContent = '';
    if (lastAtPos !== -1) {
      newContent = textBeforeCursor.slice(0, lastAtPos) + `@${username} ` + textAfterCursor;
    } else {
      newContent = content ? `${content} @${username} ` : `@${username} `;
    }

    setContent(newContent);
    setShowMentionMenu(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

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

        <form onSubmit={handleSubmit} className="flex-1 min-w-0 relative">
          {/* Post Textarea */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextChange}
            placeholder="What's happening on your campus? Type @ to mention scholars or accounts..."
            rows={3}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
          />

          {/* Interactive Mention Suggestions Dropdown */}
          {showMentionMenu && filteredMentions.length > 0 && (
            <div className="absolute z-30 left-0 top-16 w-72 rounded-xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Mention Account</span>
                <span className="text-[#1D9BF0] font-mono">@{mentionQuery}</span>
              </div>
              <div className="max-h-48 overflow-y-auto p-1 space-y-0.5">
                {filteredMentions.map((acc) => (
                  <button
                    type="button"
                    key={acc.username}
                    onClick={() => insertMention(acc.username)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {acc.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {acc.name}
                          </span>
                          <VerifiedBadge type={acc.tier} size="small" showPopover={false} />
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          @{acc.username}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-[#1D9BF0] font-medium shrink-0">
                      Insert
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quoted Post Preview */}
          {quotePost && (
            <div className="my-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#16181C] text-xs">
              <div className="flex items-center gap-1 font-medium text-slate-800 dark:text-slate-200 mb-0.5">
                <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Quoting @{quotePost.author?.username || quotePost.username}</span>
                <VerifiedBadge
                  type={
                    quotePost.verificationTier ||
                    quotePost.verification_tier ||
                    quotePost.author?.verificationTier ||
                    (quotePost.isVerified ? 'blue' : 'none')
                  }
                  size="small"
                />
              </div>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                {quotePost.content}
              </p>
            </div>
          )}

          {/* Quick Hashtag & Mention suggestions */}
          <div className="flex items-center gap-1.5 flex-wrap my-2">
            <button
              type="button"
              onClick={() => {
                setShowMentionMenu(true);
                setMentionQuery('');
              }}
              className="text-[11px] font-medium text-[#1D9BF0] hover:text-[#0284C7] bg-[#1D9BF0]/10 hover:bg-[#1D9BF0]/20 transition-colors py-0.5 px-2 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <AtSign className="w-3 h-3" />
              <span>Mention Scholar</span>
            </button>

            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3" />
            </span>
            {quickTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleAddHashtag(tag)}
                className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-[#1D9BF0] transition-colors py-0.5 px-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
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
