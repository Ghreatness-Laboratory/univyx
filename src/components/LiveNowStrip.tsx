import React from 'react';
import { Radio, Users, ChevronRight, Mic } from 'lucide-react';
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
    <div className="border-b border-[#EFF3F4] dark:border-[#2F3336] bg-slate-50/60 dark:bg-[#0A0A0A] p-3">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#0F1419] dark:text-[#E7E9EA]">
            Live Gist Rooms
          </span>
          <span className="text-[11px] text-[#536471] dark:text-[#71767B]">
            ({liveRooms.length} active)
          </span>
        </div>

        <button
          onClick={onViewAllRooms}
          className="text-[12px] font-bold text-[#1D9BF0] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>See all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal scrolling strip */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {liveRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onJoinRoom(room)}
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#1D9BF0] transition-all cursor-pointer shrink-0 max-w-[280px] sm:max-w-[320px] group"
          >
            {/* Host avatar with pulsing live ring */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-[#1D9BF0] text-white font-bold text-xs flex items-center justify-center ring-2 ring-purple-500/70 group-hover:scale-105 transition-transform">
                {room.host.name.charAt(0)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border-2 border-white dark:border-[#16181C]">
                <Radio className="w-2.5 h-2.5 text-white animate-pulse" />
              </div>
            </div>

            {/* Room info */}
            <div className="min-w-0 flex-1">
              <h4 className="text-[13px] font-bold text-[#0F1419] dark:text-[#E7E9EA] truncate group-hover:text-[#1D9BF0] transition-colors">
                {room.title}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-[#536471] dark:text-[#71767B] mt-0.5">
                <span className="truncate max-w-[100px] font-medium text-slate-700 dark:text-slate-300">
                  {room.host.name.split(' ')[0]}
                </span>
                <span>·</span>
                <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Users className="w-3 h-3" />
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
              className="btn-pill px-3 py-1 bg-[#1D9BF0] text-white text-[11px] font-bold shrink-0 hover:bg-[#1A8CD8] transition-colors"
            >
              Listen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
