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
  AtSign,
  BarChart2,
  Plus,
  Trash2,
  Globe
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

  // Poll state
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [pollDuration, setPollDuration] = useState<'1h' | '1d' | '3d' | '7d'>('1d');

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

  const handleAddHashtag = (tag: string) => {
    const trimmed = content.trim();
    if (trimmed.includes(tag)) return;
    setContent(trimmed ? `${trimmed} ${tag}` : tag);
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

    let pollData = undefined;
    if (showPoll) {
      const validOptions = pollOptions.filter((o) => o.trim().length > 0);
      if (validOptions.length >= 2) {
        pollData = {
          question: content.trim(),
          options: validOptions.map((t) => ({ id: '', text: t.trim(), votes: 0 })),
          totalVotes: 0,
          duration: pollDuration,
          expiresAt: new Date(Date.now() + (pollDuration === '1h' ? 3600000 : pollDuration === '1d' ? 86400000 : pollDuration === '3d' ? 259200000 : 604800000)).toISOString()
        };
      }
    }

    createPost(
      content.trim(),
      category,
      universityId || undefined,
      quotePost || undefined,
      pollData,
      currentUser?.location || undefined
    );

    setContent('');
    setShowPoll(false);
    setPollOptions(['', '']);
    if (onClose) onClose();
    setIsComposerOpen(false);
  };

  const authorInitial = (currentUser?.fullName || currentUser?.full_name || 'S').charAt(0).toUpperCase();

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#121A30] border border-[#EFF3F4] dark:border-[#1E2846] rounded-[20px] p-4 shadow-sm mb-4 transition-colors duration-150">
      <div className="flex gap-3">
        {/* Requirement 4: Gradient Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4C8DFF] to-[#7B5CFF] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md shadow-[#4C8DFF]/25 select-none">
          {authorInitial}
        </div>

        {/* Composer Form */}
        <form onSubmit={handleSubmit} className="flex-1 min-w-0 relative">
          {/* Main Textarea */}
          <textarea
            ref={textareaRef}
            rows={3}
            placeholder="What's happening on your campus?"
            value={content}
            onChange={handleTextChange}
            className="w-full bg-transparent border-none text-[16px] leading-[1.5] text-[#0F1419] dark:text-[#F2F5FF] placeholder-[#8A94B3] focus:outline-none resize-none font-sans"
          />

          {/* Autocomplete mention popover */}
          {showMentionMenu && filteredMentions.length > 0 && (
            <div className="absolute z-30 left-0 top-16 w-72 rounded-xl bg-white dark:bg-[#121A30] border border-slate-200 dark:border-[#1E2846] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-slate-100 dark:border-[#1E2846] text-[10px] font-bold text-[#8A94B3] uppercase tracking-wider flex items-center justify-between">
                <span>Mention Account</span>
                <span className="text-[#4C8DFF] font-mono">@{mentionQuery}</span>
              </div>
              <div className="max-h-48 overflow-y-auto p-1 space-y-0.5">
                {filteredMentions.map((acc) => (
                  <button
                    type="button"
                    key={acc.username}
                    onClick={() => insertMention(acc.username)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E2846]/60 transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#1E2846] text-[#0F1419] dark:text-[#F2F5FF] font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {acc.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-[#0F1419] dark:text-[#F2F5FF] truncate">
                            {acc.name}
                          </span>
                          <VerifiedBadge type={acc.tier} size="small" showPopover={false} />
                        </div>
                        <div className="text-[10px] text-[#8A94B3] font-mono">
                          @{acc.username}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#8A94B3] group-hover:text-[#4C8DFF] font-medium shrink-0">
                      Insert
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quoted Post Preview */}
          {quotePost && (
            <div className="my-2 p-2.5 rounded-xl border border-slate-200 dark:border-[#1E2846] bg-slate-50 dark:bg-[#0A0F1E]/60 text-xs">
              <div className="flex items-center gap-1 font-medium text-slate-800 dark:text-[#F2F5FF] mb-0.5">
                <CornerDownRight className="w-3.5 h-3.5 text-[#8A94B3]" />
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
              <p className="text-[#536471] dark:text-[#8A94B3] line-clamp-2">
                {quotePost.content}
              </p>
            </div>
          )}

          {/* Interactive Poll Builder */}
          {showPoll && (
            <div className="my-2.5 p-3 rounded-2xl border border-[#4C8DFF]/40 bg-[#4C8DFF]/5 space-y-2.5 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#4C8DFF] flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                  <span>Campus Poll</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowPoll(false);
                    setPollOptions(['', '']);
                  }}
                  className="text-[#8A94B3] hover:text-red-400 transition-colors p-1 cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                  title="Remove poll"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      maxLength={45}
                      onChange={(e) => {
                        const next = [...pollOptions];
                        next[idx] = e.target.value;
                        setPollOptions(next);
                      }}
                      className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E2846] bg-white dark:bg-[#0A0F1E] text-[#0F1419] dark:text-[#F2F5FF] focus:outline-none focus:border-[#4C8DFF]"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))}
                        className="text-[#8A94B3] hover:text-red-400 p-1 cursor-pointer"
                        title="Remove option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                {pollOptions.length < 4 ? (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="text-[11px] font-bold text-[#4C8DFF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add option ({pollOptions.length}/4)</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-1.5 text-xs text-[#536471] dark:text-[#8A94B3]">
                  <span>Duration:</span>
                  <select
                    value={pollDuration}
                    onChange={(e) => setPollDuration(e.target.value as any)}
                    className="text-xs bg-white dark:bg-[#0A0F1E] border border-slate-200 dark:border-[#1E2846] rounded-lg px-2 py-1 text-[#0F1419] dark:text-[#F2F5FF] focus:outline-none cursor-pointer"
                  >
                    <option value="1h">1 hour</option>
                    <option value="1d">1 day</option>
                    <option value="3d">3 days</option>
                    <option value="7d">7 days</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Requirement 4: Small hashtag chips (@ Mention Scholar, #CampusLife, #Exams, #Tech) */}
          <div className="flex items-center gap-1.5 flex-wrap my-2.5">
            <button
              type="button"
              onClick={() => {
                setShowMentionMenu(true);
                setMentionQuery('');
                if (textareaRef.current) textareaRef.current.focus();
              }}
              className="text-xs font-medium text-[#4C8DFF] hover:text-[#7B5CFF] border border-[#1E2846] bg-[#0A0F1E]/50 hover:bg-[#4C8DFF]/10 py-1.5 px-3 rounded-full flex items-center gap-1 cursor-pointer transition-all duration-150 active:scale-95"
            >
              <AtSign className="w-3 h-3 text-[#4C8DFF]" strokeWidth={1.8} />
              <span>@ Mention Scholar</span>
            </button>

            <button
              type="button"
              onClick={() => handleAddHashtag('#CampusLife')}
              className="text-xs font-medium text-[#8A94B3] hover:text-[#4C8DFF] border border-[#1E2846] hover:border-[#4C8DFF]/40 bg-[#0A0F1E]/50 py-1.5 px-3 rounded-full transition-all duration-150 active:scale-95 cursor-pointer"
            >
              #CampusLife
            </button>

            <button
              type="button"
              onClick={() => handleAddHashtag('#Exams')}
              className="text-xs font-medium text-[#8A94B3] hover:text-[#4C8DFF] border border-[#1E2846] hover:border-[#4C8DFF]/40 bg-[#0A0F1E]/50 py-1.5 px-3 rounded-full transition-all duration-150 active:scale-95 cursor-pointer"
            >
              #Exams
            </button>

            <button
              type="button"
              onClick={() => handleAddHashtag('#Tech')}
              className="text-xs font-medium text-[#8A94B3] hover:text-[#4C8DFF] border border-[#1E2846] hover:border-[#4C8DFF]/40 bg-[#0A0F1E]/50 py-1.5 px-3 rounded-full transition-all duration-150 active:scale-95 cursor-pointer"
            >
              #Tech
            </button>

            {/* Poll trigger button */}
            <button
              type="button"
              onClick={() => setShowPoll(!showPoll)}
              className={`text-xs font-medium py-1.5 px-3 rounded-full flex items-center gap-1 cursor-pointer border transition-all duration-150 active:scale-95 ${
                showPoll
                  ? 'bg-[#4C8DFF] text-white border-[#4C8DFF]'
                  : 'text-[#8A94B3] hover:text-[#4C8DFF] border-[#1E2846] bg-[#0A0F1E]/50'
              }`}
            >
              <BarChart2 className="w-3 h-3" strokeWidth={1.8} />
              <span>Poll</span>
            </button>
          </div>

          {/* Requirement 4: Divider */}
          <div className="border-t border-slate-100 dark:border-[#1E2846] my-3" />

          {/* Requirement 4: "General" and audience dropdowns + 280 character counter on left and gradient Post button on right */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Left: General & Audience Dropdowns */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {/* Category Dropdown (default "General") */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PostCategory)}
                  aria-label="Post category"
                  className="bg-slate-100 dark:bg-[#0A0F1E] border border-slate-200 dark:border-[#1E2846] text-[#0F1419] dark:text-[#F2F5FF] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#4C8DFF] text-xs cursor-pointer font-medium"
                >
                  <option value="general" className="dark:bg-[#121A30]">General</option>
                  <option value="academics" className="dark:bg-[#121A30]">Academics</option>
                  <option value="career" className="dark:bg-[#121A30]">Career</option>
                  <option value="gaming" className="dark:bg-[#121A30]">Gaming</option>
                  <option value="campus_news" className="dark:bg-[#121A30]">Campus Life</option>
                  <option value="events" className="dark:bg-[#121A30]">Events</option>
                  <option value="marketplace" className="dark:bg-[#121A30]">Marketplace</option>
                </select>
              </div>

              {/* Audience Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#0A0F1E] border border-slate-200 dark:border-[#1E2846] rounded-xl px-3 py-1.5 text-[#0F1419] dark:text-[#F2F5FF]">
                <Globe className="w-3.5 h-3.5 text-[#4C8DFF] shrink-0" strokeWidth={1.8} />
                <select
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  aria-label="Target audience"
                  className="bg-transparent border-none text-xs focus:outline-none cursor-pointer text-[#0F1419] dark:text-[#F2F5FF] font-medium max-w-[140px] truncate"
                >
                  <option value="" className="dark:bg-[#121A30]">Network-wide</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id} className="dark:bg-[#121A30]">
                      {u.shortName || u.short_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bottom Row: 280 Character Counter on Left & Gradient Post Button on Right */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
              {/* Requirement 4: 280 character counter on the left */}
              <span
                className={`text-xs tabular-nums font-medium ${
                  isOverLimit
                    ? 'text-red-400 font-bold'
                    : charsRemaining <= 20
                    ? 'text-amber-400 font-semibold'
                    : 'text-[#8A94B3]'
                }`}
              >
                {charsRemaining}
              </span>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs font-semibold text-[#8A94B3] hover:text-[#F2F5FF] rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}

              {/* Requirement 4: Gradient Post button on the right */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="flex items-center justify-center gap-1.5 px-6 py-2 rounded-full bg-gradient-to-r from-[#4C8DFF] to-[#7B5CFF] text-white text-xs font-semibold shadow-md shadow-[#4C8DFF]/25 hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer min-h-[38px]"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={1.8} />
                <span>Post</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
