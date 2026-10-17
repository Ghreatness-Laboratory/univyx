import React from 'react';
import { Radio, Users, ChevronRight } from 'lucide-react';
import { GistRoom } from '../data/rooms';

interface LiveNowStripProps {
  rooms: GistRoom[];
  onJoinRoom: (room: GistRoom) => void;
  onViewAllRooms: () => void;
}

export const LiveNowStrip: React.FC<LiveNowStripProps> = ({
  rooms,
  onJoinRoom,
  onViewAllRooms
}) => {
  const liveRooms = rooms.filter((r) => r.status === 'live');

  if (liveRooms.length === 0) return null;

  return (
    <div className="border-b border-border bg-bg/50 p-3 transition-colors duration-150">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-text">
            Live Gist Rooms
          </span>
          <span className="text-[11px] text-text-muted">
            ({liveRooms.length} active)
          </span>
        </div>

        <button
          onClick={onViewAllRooms}
          className="text-xs font-semibold text-accent hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>See all</span>
          <ChevronRight className="w-3.5 h-3.5 text-accent" strokeWidth={1.8} />
        </button>
      </div>

      {/* Horizontal scrolling strip */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {liveRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onJoinRoom(room)}
            className="flex items-center gap-3 p-2.5 card-theme shadow-xs hover:border-accent transition-all duration-150 cursor-pointer shrink-0 max-w-[280px] sm:max-w-[320px] group active:scale-95"
          >
            {/* Host avatar with pulsing live ring */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full avatar-gradient font-bold text-xs flex items-center justify-center ring-2 ring-accent/40 group-hover:scale-105 transition-transform">
                {room.host.name.charAt(0)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border-2 border-surface">
                <Radio className="w-2.5 h-2.5 text-white animate-pulse" />
              </div>
            </div>

            {/* Room info */}
            <div className="min-w-0 flex-1">
              <h4 className="text-[13px] font-bold text-text truncate group-hover:text-accent transition-colors">
                {room.title}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                <span className="truncate max-w-[100px] font-medium text-text">
                  {room.host.name.split(' ')[0]}
                </span>
                <span>·</span>
                <span className="flex items-center gap-0.5 text-emerald-500 font-semibold">
                  <Users className="w-3 h-3 text-emerald-500" strokeWidth={1.8} />
                  <span>{room.listenerCount}</span>
                </span>
              </div>
            </div>

            {/* Quick Listen pill */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onJoinRoom(room);
              }}
              className="btn-primary-gradient px-3.5 py-1.5 rounded-full text-white text-[11px] font-bold shrink-0 hover:opacity-95 transition-all shadow-xs active:scale-95 cursor-pointer min-h-[36px]"
            >
              Listen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
