import React from 'react';
import { Radio, Mic, MicOff, Volume2, X, Maximize2 } from 'lucide-react';
import { GistRoom } from '../data/rooms';

interface GistRoomMiniPlayerProps {
  room: GistRoom;
  isMuted: boolean;
  isSpeaking: boolean;
  onMaximize: () => void;
  onToggleMute: () => void;
  onLeave: () => void;
}

export const GistRoomMiniPlayer: React.FC<GistRoomMiniPlayerProps> = ({
  room,
  isMuted,
  isSpeaking,
  onMaximize,
  onToggleMute,
  onLeave
}) => {
  return (
    <div className="fixed bottom-16 sm:bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#0F1419] dark:bg-[#16181C] text-white rounded-2xl p-3 shadow-2xl border border-slate-800 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
      {/* Clickable info to maximize */}
      <button
        onClick={onMaximize}
        className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer group"
      >
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-[#1D9BF0] flex items-center justify-center font-bold text-xs ring-2 ring-purple-500/50">
            {room.host.name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-black flex items-center justify-center">
            <Radio className="w-2.5 h-2.5 text-white animate-pulse" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
              Live Gist Room
            </span>
          </div>
          <h4 className="text-[13px] font-bold text-white truncate group-hover:text-[#1D9BF0] transition-colors">
            {room.title}
          </h4>
          <p className="text-[11px] text-[#71767B] truncate">
            {room.host.name} · {room.listenerCount} listening
          </p>
        </div>
      </button>

      {/* Mini Controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onToggleMute}
          className={`p-2 rounded-full transition-colors ${
            isMuted
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <button
          onClick={onMaximize}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          title="Open Room"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={onLeave}
          className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition-colors"
          title="Leave Room"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
