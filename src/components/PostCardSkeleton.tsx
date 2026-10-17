import React from 'react';

export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 border border-slate-200 dark:border-[#1E2846] bg-white dark:bg-[#121A30] rounded-[20px] mb-3 animate-pulse">
      {/* Header Row */}
      <div className="flex items-center gap-3">
        {/* Avatar circle */}
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-[#1E2846] shrink-0" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="h-4 w-32 bg-slate-200 dark:bg-[#1E2846] rounded-md" />
          <div className="h-3 w-24 bg-slate-100 dark:bg-[#1E2846]/60 rounded-md" />
        </div>
        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#1E2846]/40" />
      </div>

      {/* Body text lines */}
      <div className="space-y-2 mt-3.5">
        <div className="h-4 w-full bg-slate-200 dark:bg-[#1E2846]/70 rounded-md" />
        <div className="h-4 w-11/12 bg-slate-200 dark:bg-[#1E2846]/70 rounded-md" />
        <div className="h-4 w-3/4 bg-slate-100 dark:bg-[#1E2846]/50 rounded-md" />
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-[#1E2846] mt-3.5 pt-2" />

      {/* Action Row */}
      <div className="flex items-center justify-between pt-1">
        <div className="h-4 w-10 bg-slate-100 dark:bg-[#1E2846]/60 rounded-md" />
        <div className="h-4 w-10 bg-slate-100 dark:bg-[#1E2846]/60 rounded-md" />
        <div className="h-4 w-10 bg-slate-100 dark:bg-[#1E2846]/60 rounded-md" />
        <div className="h-4 w-12 bg-slate-100 dark:bg-[#1E2846]/60 rounded-md" />
        <div className="h-4 w-6 bg-slate-100 dark:bg-[#1E2846]/60 rounded-md" />
      </div>
    </div>
  );
};
