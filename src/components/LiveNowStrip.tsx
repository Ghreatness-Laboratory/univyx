import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { GistRoom } from '../data/rooms';

interface LiveNowStripProps {
  rooms: GistRoom[];
  onJoinRoom: (room: GistRoom) => void;
  onViewAllRooms: () => void;
  isLoading?: boolean;
}

export const LiveNowStrip: React.FC<LiveNowStripProps> = ({
  rooms,
  onJoinRoom,
  onViewAllRooms,
  isLoading = false
}) => {
  const liveRooms = rooms.filter((r) => r.status === 'live');

  if (!isLoading && liveRooms.length === 0) return null;

  return (
    <div className="border-b border-border bg-bg/50 px-3 py-2.5 transition-colors duration-150">
      {/* Section Row */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div className="flex items-center gap-1.5">
          {/* Red live dot (#FF4B5C) */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-live"></span>
          </span>
          {/* Section label: 12px medium, sentence case, not all caps */}
          <span className="text-[12px] font-medium text-text">
            Live gist rooms
          </span>
          {/* Muted active count */}
          <span className="text-[11px] text-text-muted">
            {liveRooms.length || 3} active
          </span>
        </div>

        {/* Accent "See all" on right */}
        <button
          onClick={onViewAllRooms}
          className="text-[12px] font-medium text-accent hover:underline flex items-center gap-0.5 cursor-pointer touch-target-44 active:scale-95 transition-transform duration-150"
        >
          <span>See all</span>
          <ChevronRight className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
        </button>
      </div>

      {/* Horizontally scrolling row of slim room cards (~50px tall, next card peeks in) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {isLoading ? (
          <>
            <div className="h-[50px] w-[260px] shrink-0 rounded-[14px] border border-border bg-surface p-2 flex items-center gap-2.5 animate-pulse">
              <div className="w-7 h-7 rounded-full bg-border shrink-0" />
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="h-3 w-28 bg-border/80 rounded" />
                <div className="h-2.5 w-16 bg-border/50 rounded" />
              </div>
              <div className="h-6 w-14 rounded-full bg-border/60 shrink-0" />
            </div>
            <div className="h-[50px] w-[260px] shrink-0 rounded-[14px] border border-border bg-surface p-2 flex items-center gap-2.5 animate-pulse">
              <div className="w-7 h-7 rounded-full bg-border shrink-0" />
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="h-3 w-28 bg-border/80 rounded" />
                <div className="h-2.5 w-16 bg-border/50 rounded" />
              </div>
              <div className="h-6 w-14 rounded-full bg-border/60 shrink-0" />
            </div>
          </>
        ) : (
          liveRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => onJoinRoom(room)}
              className="h-[50px] w-[260px] shrink-0 card-theme p-2 flex items-center gap-2.5 hover:border-accent transition-all duration-150 cursor-pointer group active:scale-95"
            >
              {/* Gradient avatar with small red live badge */}
              <div className="relative shrink-0">
                <div className="w-7 h-7 rounded-full avatar-gradient font-bold text-[11px] text-white flex items-center justify-center shrink-0 shadow-xs">
                  {room.host.name.charAt(0)}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-live ring-1.5 ring-surface" />
              </div>

              {/* Room info: Title (single line, ellipsis) + Host name + Green listener count */}
              <div className="min-w-0 flex-1">
                <h4 className="text-[12px] font-bold text-text truncate group-hover:text-accent transition-colors leading-tight">
                  {room.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[10.5px] text-text-muted leading-tight mt-0.5">
                  <span className="truncate max-w-[80px] font-normal">
                    {room.host.name.split(' ')[0]}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5 text-success font-medium shrink-0">
                    <Users className="w-3 h-3 text-success" strokeWidth={1.5} />
                    <span>{room.listenerCount}</span>
                  </span>
                </div>
              </div>

              {/* Small gradient "Listen" button (24px tall) on the right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onJoinRoom(room);
                }}
                className="h-6 px-3 rounded-full btn-primary-gradient text-white text-[11px] font-medium flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-transform duration-150 touch-target-44 cursor-pointer"
              >
                Listen
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
