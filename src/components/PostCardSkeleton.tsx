import React from 'react';

export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="card-theme p-4 mb-3 animate-pulse">
      {/* Header Row */}
      <div className="flex items-center gap-3">
        {/* Avatar circle */}
        <div className="w-10 h-10 rounded-full bg-border shrink-0" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="h-4 w-32 bg-border rounded-md" />
          <div className="h-3 w-24 bg-border/60 rounded-md" />
        </div>
        <div className="w-6 h-6 rounded-full bg-border/40" />
      </div>

      {/* Body text lines */}
      <div className="space-y-2 mt-3.5">
        <div className="h-4 w-full bg-border/70 rounded-md" />
        <div className="h-4 w-11/12 bg-border/70 rounded-md" />
        <div className="h-4 w-3/4 bg-border/50 rounded-md" />
      </div>

      {/* Divider */}
      <div className="border-t border-border mt-3.5 pt-2" />

      {/* Action Row */}
      <div className="flex items-center justify-between pt-1">
        <div className="h-4 w-10 bg-border/60 rounded-md" />
        <div className="h-4 w-10 bg-border/60 rounded-md" />
        <div className="h-4 w-10 bg-border/60 rounded-md" />
        <div className="h-4 w-12 bg-border/60 rounded-md" />
        <div className="h-4 w-6 bg-border/60 rounded-md" />
      </div>
    </div>
  );
};
