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
    <div className="border-b border-[#EFF3F4] dark:border-[#1E2846] bg-slate-50/60 dark:bg-[#0A0F1E] p-3 transition-colors duration-150">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F1419] dark:text-[#F2F5FF]">
            Live Gist Rooms
          </span>
          <span className="text-[11px] text-[#536471] dark:text-[#8A94B3]">
            ({liveRooms.length} active)
          </span>
        </div>

        <button
          onClick={onViewAllRooms}
          className="text-xs font-semibold text-[#4C8DFF] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>See all</span>
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
      </div>

      {/* Horizontal scrolling strip */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {liveRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onJoinRoom(room)}
            className="flex items-center gap-3 p-2.5 rounded-[18px] bg-white dark:bg-[#121A30] border border-slate-200 dark:border-[#1E2846] shadow-xs hover:border-[#4C8DFF] transition-all duration-150 cursor-pointer shrink-0 max-w-[280px] sm:max-w-[320px] group active:scale-95"
          >
            {/* Host avatar with pulsing live ring */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4C8DFF] to-[#7B5CFF] text-white font-bold text-xs flex items-center justify-center ring-2 ring-[#4C8DFF]/40 group-hover:scale-105 transition-transform">
                {room.host.name.charAt(0)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border-2 border-white dark:border-[#121A30]">
                <Radio className="w-2.5 h-2.5 text-white animate-pulse" />
              </div>
            </div>

            {/* Room info */}
            <div className="min-w-0 flex-1">
              <h4 className="text-[13px] font-bold text-[#0F1419] dark:text-[#F2F5FF] truncate group-hover:text-[#4C8DFF] transition-colors">
                {room.title}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-[#536471] dark:text-[#8A94B3] mt-0.5">
                <span className="truncate max-w-[100px] font-medium text-slate-700 dark:text-[#F2F5FF]">
                  {room.host.name.split(' ')[0]}
                </span>
                <span>·</span>
                <span className="flex items-center gap-0.5 text-emerald-500 font-semibold">
                  <Users className="w-3 h-3" strokeWidth={1.8} />
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
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#4C8DFF] to-[#7B5CFF] text-white text-[11px] font-bold shrink-0 hover:opacity-95 transition-all shadow-xs active:scale-95 cursor-pointer min-h-[36px]"
            >
              Listen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
