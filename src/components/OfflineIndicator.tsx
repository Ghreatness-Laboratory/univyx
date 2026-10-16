import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-2 rounded-xl bg-amber-500/90 text-white px-3.5 py-2 text-xs font-medium shadow-lg backdrop-blur-xs border border-amber-400/50">
      <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
      <span>Offline Mode — Showing cached campus data</span>
    </div>
  );
};
