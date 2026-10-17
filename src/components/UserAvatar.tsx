import React, { useState, useEffect } from 'react';

interface UserAvatarProps {
  src?: string | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showLiveBadge?: boolean;
}

const sizeMap = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-8 h-8 text-[12px]',
  lg: 'w-10 h-10 text-[14px]',
  xl: 'w-14 h-14 text-[18px]',
  '2xl': 'w-20 h-20 text-[26px]'
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name = 'Scholar',
  size = 'md',
  className = '',
  showLiveBadge = false
}) => {
  const [imageError, setImageError] = useState(false);
  const initial = (name || 'S').trim().charAt(0).toUpperCase();

  // Reset error state when src changes
  useEffect(() => {
    setImageError(false);
  }, [src]);

  const sizeClass = sizeMap[size] || sizeMap.md;
  const hasValidImage = Boolean(src && !imageError && src.trim().length > 0);

  return (
    <div className={`relative shrink-0 select-none ${className}`}>
      {hasValidImage ? (
        <img
          src={src!}
          alt={name}
          onError={() => setImageError(true)}
          className={`${sizeClass} rounded-full object-cover border border-border shadow-xs`}
          loading="lazy"
        />
      ) : (
        <div
          className={`${sizeClass} rounded-full avatar-gradient font-bold text-white flex items-center justify-center shadow-xs`}
          aria-label={name}
        >
          {initial}
        </div>
      )}

      {showLiveBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live ring-2 ring-surface" />
      )}
    </div>
  );
};

export default UserAvatar;
