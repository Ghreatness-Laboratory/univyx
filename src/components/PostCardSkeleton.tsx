import React from 'react';

export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="card-theme p-3.5 mb-2.5 animate-pulse">
      {/* Header Row */}
      <div className="flex items-center gap-2.5">
        {/* Avatar circle */}
        <div className="w-8 h-8 rounded-full bg-border shrink-0" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="h-3 w-28 bg-border rounded" />
          <div className="h-2.5 w-20 bg-border/60 rounded" />
        </div>
        <div className="w-5 h-5 rounded-full bg-border/40" />
      </div>

      {/* Body text lines */}
      <div className="space-y-1.5 mt-3">
        <div className="h-3 w-full bg-border/70 rounded" />
        <div className="h-3 w-11/12 bg-border/70 rounded" />
        <div className="h-3 w-3/4 bg-border/50 rounded" />
      </div>

      {/* Divider */}
      <div className="border-t border-border mt-3 pt-2" />

      {/* Action Row */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="h-3 w-8 bg-border/60 rounded" />
        <div className="h-3 w-8 bg-border/60 rounded" />
        <div className="h-3 w-8 bg-border/60 rounded" />
        <div className="h-3 w-10 bg-border/60 rounded" />
        <div className="h-3 w-5 bg-border/60 rounded" />
      </div>
    </div>
  );
};
