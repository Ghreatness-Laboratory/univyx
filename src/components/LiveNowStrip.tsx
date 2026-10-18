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

  const featuredRoom = liveRooms[0];
  const otherRooms = liveRooms.slice(1);

  return (
    <div className="border-b border-border bg-bg px-3 py-2.5 transition-colors duration-150">
      {/* Section Row: pulsing red live dot, "Live gist rooms", "3 active", "See all" */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div className="flex items-center gap-1.5">
          {/* Pulsing red live dot (#FF4B5C) */}
          <span className="relative flex h-2 w-2">
            <span className="animate-live-pulse inline-flex h-full w-full rounded-full bg-live"></span>
          </span>
          {/* Section label: 12px, sentence case */}
          <span className="text-[12px] font-medium text-text">
            Live gist rooms
          </span>
          {/* Muted "3 active" */}
          <span className="text-[11px] text-text-muted">
            {liveRooms.length || 3} active
          </span>
        </div>

        {/* Accent "See all" */}
        <button
          onClick={onViewAllRooms}
          className="text-[12px] font-medium text-accent hover:underline flex items-center gap-0.5 cursor-pointer touch-target-44 active:scale-95 transition-transform duration-150"
        >
          <span>See all</span>
          <ChevronRight className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
        </button>
      </div>

      {/* Horizontally scrolling row of room cards (next card peeks in) */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {isLoading ? (
          <>
            {/* Featured Room Skeleton */}
            <div className="p-[1.5px] rounded-[14px] bg-border shrink-0">
              <div className="w-[305px] h-[70px] rounded-[12.5px] bg-surface-deep p-2.5 flex items-center gap-2.5 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-border shrink-0" />
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="h-3.5 w-32 bg-border rounded" />
                  <div className="h-2.5 w-20 bg-border/60 rounded" />
                  <div className="h-2.5 w-28 bg-border/40 rounded" />
                </div>
                <div className="h-[26px] w-14 rounded-full bg-border shrink-0" />
              </div>
            </div>
            {/* Peeking Room Skeleton */}
            <div className="w-[275px] h-[70px] rounded-[14px] border border-border bg-surface p-2.5 flex items-center gap-2.5 shrink-0 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-border shrink-0" />
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="h-3.5 w-28 bg-border rounded" />
                <div className="h-2.5 w-16 bg-border/60 rounded" />
              </div>
              <div className="h-[26px] w-14 rounded-full bg-border shrink-0" />
            </div>
          </>
        ) : (
          <>
            {/* Featured First Card: 1.5px gradient border (accent to accent-2) on a --surface-deep fill */}
            {featuredRoom && (
              <div
                onClick={() => onJoinRoom(featuredRoom)}
                className="p-[1.5px] rounded-[14px] bg-gradient-to-r from-accent to-accent-2 shrink-0 cursor-pointer active:scale-[0.98] transition-transform duration-150"
              >
                <div className="w-[305px] h-[70px] rounded-[12.5px] bg-surface-deep p-2.5 flex items-center justify-between gap-2.5">
                  {/* 36px gradient avatar with small red live badge */}
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-full avatar-gradient font-bold text-[12px] text-white flex items-center justify-center shadow-xs">
                      {featuredRoom.host.name.charAt(0)}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live ring-2 ring-surface-deep" />
                  </div>

                  {/* Room info: bold single-line title with ellipsis, host name with green users icon and "142 listening", waveform */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[13px] font-bold text-text truncate leading-tight">
                      {featuredRoom.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-[10.5px] text-text-muted leading-tight mt-0.5">
                      <span className="truncate max-w-[75px] font-normal">
                        {featuredRoom.host.name}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-success font-medium shrink-0">
                        <Users className="w-3 h-3 text-success" strokeWidth={1.5} />
                        <span>{featuredRoom.listenerCount || 142} listening</span>
                      </span>
                    </div>

                    {/* Animated waveform of 18 thin bars (CSS only, staggered, respects prefers-reduced-motion) */}
                    <div className="flex items-end gap-[1.5px] h-2.5 mt-1" aria-hidden="true">
                      {[0.4, 0.9, 0.6, 0.3, 0.8, 1.0, 0.5, 0.7, 0.3, 0.9, 0.6, 0.4, 0.8, 0.5, 1.0, 0.7, 0.3, 0.6].map((scale, i) => (
                        <span
                          key={i}
                          className="waveform-bar w-[1.5px] bg-accent rounded-full"
                          style={{
                            height: '100%',
                            animationDelay: `${(i * 0.07).toFixed(2)}s`,
                            transform: `scaleY(${scale})`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Gradient "Listen" button (26px tall) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoinRoom(featuredRoom);
                    }}
                    className="h-[26px] px-3 rounded-full btn-primary-gradient text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-transform duration-150 touch-target-44 cursor-pointer"
                  >
                    Listen
                  </button>
                </div>
              </div>
            )}

            {/* Subsequent cards (peeking in from the right edge) */}
            {otherRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => onJoinRoom(room)}
                className="w-[275px] h-[70px] rounded-[14px] border border-border bg-surface p-2.5 flex items-center justify-between gap-2.5 shrink-0 cursor-pointer hover:border-accent active:scale-[0.98] transition-all duration-150 group"
              >
                {/* 36px gradient avatar with small red live badge */}
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full avatar-gradient font-bold text-[12px] text-white flex items-center justify-center shadow-xs">
                    {room.host.name.charAt(0)}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live ring-2 ring-surface" />
                </div>

                {/* Room Info */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-[13px] font-bold text-text truncate group-hover:text-accent transition-colors leading-tight">
                    {room.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10.5px] text-text-muted leading-tight mt-0.5">
                    <span className="truncate max-w-[75px] font-normal">
                      {room.host.name}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5 text-success font-medium shrink-0">
                      <Users className="w-3 h-3 text-success" strokeWidth={1.5} />
                      <span>{room.listenerCount} listening</span>
                    </span>
                  </div>
                  {/* Subtle static / mini waveform */}
                  <div className="flex items-end gap-[1.5px] h-2.5 mt-1 opacity-70" aria-hidden="true">
                    {[0.3, 0.7, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.4, 0.8, 0.5].map((scale, i) => (
                      <span
                        key={i}
                        className="waveform-bar w-[1.5px] bg-accent rounded-full"
                        style={{
                          height: '100%',
                          animationDelay: `${(i * 0.09).toFixed(2)}s`,
                          transform: `scaleY(${scale})`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Gradient "Listen" button (26px tall) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onJoinRoom(room);
                  }}
                  className="h-[26px] px-3 rounded-full btn-primary-gradient text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-transform duration-150 touch-target-44 cursor-pointer"
                >
                  Listen
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
