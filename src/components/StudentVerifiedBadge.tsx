import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, Check } from 'lucide-react';

interface StudentVerifiedBadgeProps {
  universityName?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const StudentVerifiedBadge: React.FC<StudentVerifiedBadgeProps> = ({
  universityName,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <span
      className={`relative inline-flex items-center gap-1.5 align-middle select-none ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((prev) => !prev)}
      role="status"
      aria-label="Student verified account"
    >
      <span
        className={`inline-flex items-center gap-1 font-semibold rounded-full border transition-all ${
          isSmall
            ? 'px-2 py-0.5 text-[11px] leading-none'
            : isLarge
            ? 'px-3 py-1 text-[13px]'
            : 'px-2.5 py-0.5 text-[12px]'
        } bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-500/30`}
      >
        <GraduationCap
          className={`${isSmall ? 'w-3 h-3' : isLarge ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-emerald-600 dark:text-emerald-400 shrink-0`}
          strokeWidth={2}
        />
        {showLabel && <span>Student verified</span>}
        <Check
          className={`${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.5]`}
        />
      </span>

      {/* Tooltip / Popover */}
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 p-2.5 rounded-xl bg-surface border border-border shadow-xl text-left text-xs pointer-events-none animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-[11px] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Student Verified</span>
          </div>
          <p className="text-[11px] text-text leading-snug">
            This scholar has verified their active student status with an official private university email address
            {universityName ? ` at ${universityName}` : ''}.
          </p>
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-surface border-r border-b border-border rotate-45 -mt-1" />
        </span>
      )}
    </span>
  );
};

export default StudentVerifiedBadge;
