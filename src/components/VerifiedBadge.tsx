import React, { useState, useRef, useEffect, useId } from 'react';

export type VerificationTier = 'none' | 'blue' | 'gold';

export interface VerifiedBadgeProps {
  type?: VerificationTier;
  tier?: VerificationTier; // alias
  size?: 'xs' | 'small' | 'medium' | 'large';
  className?: string;
  showPopover?: boolean;
  inline?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  type,
  tier,
  size = 'medium',
  className = '',
  showPopover = true,
  inline = true
}) => {
  const activeTier = type || tier || 'none';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const uniqueId = useId().replace(/:/g, '');

  if (activeTier === 'none') {
    return null;
  }

  const isGold = activeTier === 'gold';
  const ariaLabel = isGold ? 'Gold verified account' : 'Verified account';

  // Handle clicking outside to close tooltip
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Dimension classes
  const sizeClasses = {
    xs: 'w-3 h-3 shrink-0',
    small: 'w-3.5 h-3.5 shrink-0',
    medium: 'w-4.5 h-4.5 shrink-0',
    large: 'w-6 h-6 shrink-0'
  }[size];

  // Popover content
  const popoverTitle = isGold ? 'Gold Verified Account' : 'Verified Account';
  const popoverBody = isGold
    ? 'Gold: official Univyx verified account'
    : 'Verified: reached 1,000 followers';
  const popoverDescription = isGold
    ? 'Reserved for official university administrations, accredited faculties, student unions, and certified collegiate partners.'
    : 'Automatically earned by achieving the 1,000 collegiate follower milestone on Univyx.';

  return (
    <span
      ref={containerRef}
      className={`relative ${inline ? 'inline-flex items-center align-middle' : 'flex items-center'} select-none group/badge ${className}`}
      onMouseEnter={() => showPopover && setIsOpen(true)}
      onMouseLeave={() => showPopover && setIsOpen(false)}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          if (showPopover) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={`focus:outline-none rounded-full transition-transform active:scale-95 inline-flex items-center justify-center cursor-pointer`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses} drop-shadow-xs`}
        >
          <defs>
            {/* Warm Gold Gradient (#F7D358 to #D4A017) */}
            <linearGradient id={`gold-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7D358" />
              <stop offset="100%" stopColor="#D4A017" />
            </linearGradient>

            {/* Primary Blue Accent Gradient */}
            <linearGradient id={`blue-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>

          {/* 12-point scalloped verified seal path */}
          <path
            d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
            fill={isGold ? `url(#gold-grad-${uniqueId})` : `url(#blue-grad-${uniqueId})`}
            stroke={isGold ? '#CA8A04' : 'var(--accent)'}
            strokeWidth="0.65"
          />

          {/* Crisp centered checkmark */}
          <path
            d="M9.9 15.7l-3.3-3.3 1.45-1.45 1.85 1.85 5.75-5.75 1.45 1.45-7.2 7.2z"
            fill="#FFFFFF"
          />
        </svg>
      </button>

      {/* Interactive Tooltip Popover */}
      {showPopover && isOpen && (
        <div
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 max-w-[85vw] p-3 rounded-2xl bg-surface text-text border border-border shadow-xl text-left pointer-events-auto animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-start gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                isGold
                  ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700'
                  : 'bg-accent-soft text-accent border border-accent/30'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path
                  d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
                  fill={isGold ? '#D4A017' : '#1D9BF0'}
                />
                <path
                  d="M9.9 15.7l-3.3-3.3 1.45-1.45 1.85 1.85 5.75-5.75 1.45 1.45-7.2 7.2z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold leading-tight text-slate-900 dark:text-white">
                  {popoverTitle}
                </h4>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold ${
                    isGold
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                      : 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300'
                  }`}
                >
                  {isGold ? 'Gold' : 'Blue'}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {popoverBody}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {popoverDescription}
              </p>
            </div>
          </div>

          {/* Downward Caret Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-surface border-r border-b border-border rotate-45 -mt-1.5" />
        </div>
      )}
    </span>
  );
};
export default VerifiedBadge;
