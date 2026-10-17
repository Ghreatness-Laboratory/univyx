import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Post, PostCategory, VerificationTier } from '../types';
import { VerifiedBadge } from './VerifiedBadge';
import {
  X,
  Send,
  CornerDownRight,
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

  // Find short name for current university or fallback to CU
  const matchedUni = universities.find((u) => u.id === universityId);
  const uniShortCode = matchedUni?.shortName || matchedUni?.short_name || 'CU';

  return (
    <div className="w-full card-theme p-3 mb-3">
      {/* Top row: 28px gradient avatar + Textarea */}
      <div className="flex items-start gap-2.5">
        {/* Requirement 5: Gradient avatar (28px) */}
        <div className="w-7 h-7 rounded-full avatar-gradient font-bold text-[11px] text-white flex items-center justify-center shrink-0 shadow-xs select-none mt-0.5">
          {authorInitial}
        </div>

        {/* Composer Form */}
        <form onSubmit={handleSubmit} className="flex-1 min-w-0 relative">
          {/* Main Textarea: 13px, line-height 1.5, placeholder at 13px muted */}
          <textarea
            ref={textareaRef}
            rows={2}
            placeholder="What's happening on your campus?"
            value={content}
            onChange={handleTextChange}
            className="w-full bg-transparent border-none text-[13px] leading-[1.5] text-text placeholder:text-text-muted focus:outline-none resize-none font-sans"
          />

          {/* Autocomplete mention popover */}
          {showMentionMenu && filteredMentions.length > 0 && (
            <div className="absolute z-30 left-0 top-14 w-72 rounded-[14px] bg-surface border border-border shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-border text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center justify-between">
                <span>Mention Account</span>
                <span className="text-accent font-mono">@{mentionQuery}</span>
              </div>
              <div className="max-h-48 overflow-y-auto p-1 space-y-0.5">
                {filteredMentions.map((acc) => (
                  <button
                    type="button"
                    key={acc.username}
                    onClick={() => insertMention(acc.username)}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-accent-soft/40 transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-full avatar-gradient font-bold flex items-center justify-center shrink-0 text-[10px] text-white">
                        {acc.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] font-semibold text-text truncate">
                            {acc.name}
                          </span>
                          <VerifiedBadge type={acc.tier} size="small" showPopover={false} />
                        </div>
                        <div className="text-[10px] text-text-muted font-mono">
                          @{acc.username}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-text-muted group-hover:text-accent font-medium shrink-0">
                      Insert
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quoted Post Preview */}
          {quotePost && (
            <div className="my-2 p-2 rounded-[10px] border border-border bg-bg/60 text-xs">
              <div className="flex items-center gap-1 font-medium text-text mb-0.5">
                <CornerDownRight className="w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
                <span className="text-[11px]">Quoting @{quotePost.author?.username || quotePost.username}</span>
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
              <p className="text-text-muted text-[11px] line-clamp-2">
                {quotePost.content}
              </p>
            </div>
          )}

          {/* Interactive Poll Builder */}
          {showPoll && (
            <div className="my-2 p-2.5 rounded-[12px] border border-accent/40 bg-accent-soft/30 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-accent flex items-center gap-1 text-[11px]">
                  <BarChart2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Campus Poll</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowPoll(false);
                    setPollOptions(['', '']);
                  }}
                  className="text-text-muted hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                  title="Remove poll"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
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
                      className="flex-1 text-[11px] px-2.5 py-1.5 rounded-lg border border-border bg-surface text-text focus:outline-none focus:border-accent"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))}
                        className="text-text-muted hover:text-red-500 p-1 cursor-pointer"
                        title="Remove option"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-0.5 text-xs">
                {pollOptions.length < 4 ? (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add option ({pollOptions.length}/4)</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-1 text-[11px] text-text-muted">
                  <span>Duration:</span>
                  <select
                    value={pollDuration}
                    onChange={(e) => setPollDuration(e.target.value as any)}
                    className="text-[11px] bg-surface border border-border rounded px-1.5 py-0.5 text-text focus:outline-none cursor-pointer"
                  >
                    <option value="1h">1h</option>
                    <option value="1d">1d</option>
                    <option value="3d">3d</option>
                    <option value="7d">7d</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Chips: an accent-soft "@ Mention Scholar" (no duplicate @ icon), #CampusLife, #Exams, #Tech and a Poll chip with a small bars icon. In at most two rows. 24px tall, 11px font. */}
          <div className="flex items-center gap-1.5 flex-wrap max-h-14 overflow-hidden mt-2 mb-1">
            {/* Accent-soft "@ Mention Scholar" chip (removed duplicate @ icon) */}
            <button
              type="button"
              onClick={() => {
                setShowMentionMenu(true);
                setMentionQuery('');
                if (textareaRef.current) textareaRef.current.focus();
              }}
              className="h-6 px-3 rounded-full text-[11px] font-medium bg-accent-soft text-accent border border-accent/20 hover:opacity-90 transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 shrink-0 flex items-center"
            >
              @ Mention Scholar
            </button>

            {/* #CampusLife */}
            <button
              type="button"
              onClick={() => handleAddHashtag('#CampusLife')}
              className="h-6 px-3 rounded-full text-[11px] font-medium bg-surface text-text-muted hover:text-accent border border-border hover:border-accent transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 shrink-0 flex items-center"
            >
              #CampusLife
            </button>

            {/* #Exams */}
            <button
              type="button"
              onClick={() => handleAddHashtag('#Exams')}
              className="h-6 px-3 rounded-full text-[11px] font-medium bg-surface text-text-muted hover:text-accent border border-border hover:border-accent transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 shrink-0 flex items-center"
            >
              #Exams
            </button>

            {/* #Tech */}
            <button
              type="button"
              onClick={() => handleAddHashtag('#Tech')}
              className="h-6 px-3 rounded-full text-[11px] font-medium bg-surface text-text-muted hover:text-accent border border-border hover:border-accent transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 shrink-0 flex items-center"
            >
              #Tech
            </button>

            {/* Poll chip with small bars icon */}
            <button
              type="button"
              onClick={() => setShowPoll(!showPoll)}
              className={`h-6 px-3 rounded-full text-[11px] font-medium transition-all duration-150 active:scale-95 cursor-pointer touch-target-44 shrink-0 flex items-center gap-1 border ${
                showPoll
                  ? 'bg-accent text-white border-accent'
                  : 'bg-surface text-text-muted hover:text-accent border-border'
              }`}
            >
              <BarChart2 className="w-3 h-3" strokeWidth={1.5} />
              <span>Poll</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-2" />

          {/* Two dropdowns side by side on one row: General and a globe + CU audience selector */}
          <div className="flex items-center gap-2">
            {/* General Dropdown */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PostCategory)}
                aria-label="Post category"
                className="h-6 px-2.5 rounded-full border border-border bg-surface text-text text-[11px] font-medium focus:outline-none focus:border-accent cursor-pointer touch-target-44"
              >
                <option value="general" className="bg-surface text-text">General</option>
                <option value="academics" className="bg-surface text-text">Academics</option>
                <option value="career" className="bg-surface text-text">Career</option>
                <option value="gaming" className="bg-surface text-text">Gaming</option>
                <option value="campus_news" className="bg-surface text-text">Campus Life</option>
                <option value="events" className="bg-surface text-text">Events</option>
                <option value="marketplace" className="bg-surface text-text">Marketplace</option>
              </select>
            </div>

            {/* Globe + CU audience selector */}
            <div className="h-6 px-2 rounded-full border border-border bg-surface text-text text-[11px] font-medium flex items-center gap-1 touch-target-44">
              <Globe className="w-3 h-3 text-accent shrink-0" strokeWidth={1.5} />
              <select
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value)}
                aria-label="Audience selector"
                className="bg-transparent border-none text-[11px] font-medium text-text focus:outline-none cursor-pointer pr-1"
              >
                <option value="" className="bg-surface text-text">Network-wide</option>
                {universities.map((u) => (
                  <option key={u.id} value={u.id} className="bg-surface text-text">
                    {u.shortName || u.short_name || u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-2" />

          {/* Last row: the 280 character counter on the left and the Post button on the right (24px tall, send icon + "Post", with a dimmed gradient when disabled) */}
          <div className="flex items-center justify-between pt-0.5">
            <span
              className={`text-[11px] tabular-nums font-medium ${
                isOverLimit
                  ? 'text-red-500 font-bold'
                  : charsRemaining <= 20
                  ? 'text-amber-500 font-semibold'
                  : 'text-text-muted'
              }`}
            >
              {charsRemaining}
            </span>

            <div className="flex items-center gap-2">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="h-6 px-2.5 text-[11px] font-medium text-text-muted hover:text-text rounded-full transition-colors cursor-pointer touch-target-44"
                >
                  Cancel
                </button>
              )}

              {/* 24px tall Post button: send icon + "Post", with dimmed gradient when disabled */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="h-6 px-3 rounded-full btn-primary-gradient text-white text-[11px] font-bold flex items-center gap-1 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer touch-target-44 active:scale-95 transition-transform duration-150"
              >
                <Send className="w-3 h-3 text-white" strokeWidth={1.5} />
                <span>Post</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
