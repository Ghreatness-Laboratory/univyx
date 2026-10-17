import React, { useState, useMemo } from 'react';
import {
  Radio,
  Plus,
  Users,
  Mic,
  Calendar,
  Bell,
  Check,
  MapPin,
  Clock,
  Sparkles,
  Filter,
  Volume2
} from 'lucide-react';
import { GistRoom, RoomTopic, ROOM_TOPICS } from '../data/rooms';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { CreateRoomModal } from '../components/CreateRoomModal';

interface RoomsViewProps {
  onJoinRoom: (room: GistRoom) => void;
  activeRoomId?: string;
}

export const RoomsView: React.FC<RoomsViewProps> = ({ onJoinRoom, activeRoomId }) => {
  const {
    currentUser,
    rooms,
    createRoom,
    toggleRoomReminder,
    showToast
  } = useApp() as any;

  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'my_rooms'>('live');
  const [selectedTopic, setSelectedTopic] = useState<RoomTopic | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredRooms = useMemo(() => {
    return (rooms as GistRoom[]).filter((room) => {
      // Tab filter
      if (activeTab === 'live' && room.status !== 'live') return false;
      if (activeTab === 'upcoming' && room.status !== 'upcoming') return false;
      if (activeTab === 'my_rooms') {
        const isMyHost = room.host.id === currentUser?.id;
        const isMySpeaker = room.speakers.some((s) => s.id === currentUser?.id);
        if (!isMyHost && !isMySpeaker && !room.isReminderSet) return false;
      }

      // Topic filter
      if (selectedTopic !== 'all' && room.topic !== selectedTopic) return false;

      return true;
    });
  }, [rooms, activeTab, selectedTopic, currentUser]);

  const handleReminderClick = (room: GistRoom, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleRoomReminder(room.id);
  };

  return (
    <div className="w-full min-w-0 max-w-2xl mx-auto pb-24 sm:pb-8">
      {/* Page Header */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-[#EFF3F4] dark:border-[#2F3336] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="page-title text-[20px] font-extrabold text-[#0F1419] dark:text-[#E7E9EA] tracking-tight leading-none">
              Gist Rooms
            </h1>
            <p className="text-[12px] text-[#536471] dark:text-[#71767B] mt-0.5">
              Live collegiate voice spaces exclusively for private varsities
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-pill px-4 py-2 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white text-[14px] font-bold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Start Room</span>
        </button>
      </div>

      {/* Tabs: Live Now, Upcoming, My Rooms */}
      <div className="flex border-b border-[#EFF3F4] dark:border-[#2F3336] bg-white dark:bg-[#000000]">
        {[
          { id: 'live' as const, label: 'Live Now', badge: rooms.filter((r: GistRoom) => r.status === 'live').length },
          { id: 'upcoming' as const, label: 'Upcoming', badge: rooms.filter((r: GistRoom) => r.status === 'upcoming').length },
          { id: 'my_rooms' as const, label: 'My Rooms' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center transition-colors relative cursor-pointer font-semibold text-[15px] ${
                isActive
                  ? 'text-[#0F1419] dark:text-[#E7E9EA] font-bold'
                  : 'text-[#536471] dark:text-[#71767B] hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                {tab.id === 'live' && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                )}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-[#1D9BF0] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#1D9BF0] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Topic Filter Strip */}
      <div className="p-3 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedTopic('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
            selectedTopic === 'all'
              ? 'bg-[#0F1419] text-white dark:bg-white dark:text-[#0F1419]'
              : 'bg-slate-100 dark:bg-slate-800 text-[#536471] dark:text-[#71767B] hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All Topics
        </button>
        {ROOM_TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
              selectedTopic === topic
                ? 'bg-[#1D9BF0] text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-[#536471] dark:text-[#71767B] hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Rooms List */}
      <div className="p-3 sm:p-4 space-y-3">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room: GistRoom) => {
            const isLive = room.status === 'live';
            const isCurrentActive = activeRoomId === room.id;

            return (
              <div
                key={room.id}
                onClick={() => isLive && onJoinRoom(room)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isCurrentActive
                    ? 'border-[#1D9BF0] bg-[#1D9BF0]/5 dark:bg-[#1D9BF0]/10 ring-1 ring-[#1D9BF0]'
                    : 'border-[#EFF3F4] dark:border-[#2F3336] bg-white dark:bg-[#16181C] hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                }`}
              >
                {/* Top Row: Live/Upcoming Status, Topic, Badges */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 dark:bg-red-950/40 text-red-500 text-[11px] font-extrabold border border-red-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                        <span>LIVE NOW</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 text-[11px] font-bold border border-purple-500/30">
                        <Calendar className="w-3 h-3" />
                        <span>{room.scheduledFor || 'Upcoming'}</span>
                      </span>
                    )}

                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {room.topic}
                    </span>

                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#1D9BF0] border border-blue-200 dark:border-blue-900/50">
                      {room.host.universityName}
                    </span>
                  </div>

                  {/* Optional Location Pin Chip */}
                  {room.location && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                      <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate max-w-[140px] sm:max-w-[200px]">{room.location}</span>
                    </span>
                  )}
                </div>

                {/* Room Title */}
                <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0F1419] dark:text-[#E7E9EA] leading-snug group-hover:text-[#1D9BF0] transition-colors">
                  {room.title}
                </h3>

                {/* Host Info & Speakers preview */}
                <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-[#1D9BF0] text-white font-bold text-xs flex items-center justify-center">
                        {room.host.name.charAt(0)}
                      </div>
                      {isLive && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#16181C]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 leading-tight">
                        <span className="text-[13px] font-bold text-[#0F1419] dark:text-[#E7E9EA] truncate">
                          {room.host.name}
                        </span>
                        {room.host.verificationTier && (
                          <VerifiedBadge type={room.host.verificationTier} />
                        )}
                      </div>
                      <span className="text-[11px] text-[#536471] dark:text-[#71767B] block truncate">
                        Host · @{room.host.username}
                      </span>
                    </div>
                  </div>

                  {/* Counts & Action Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2 text-[12px] text-[#536471] dark:text-[#71767B]">
                      <span className="flex items-center gap-1">
                        <Mic className="w-3.5 h-3.5 text-[#1D9BF0]" />
                        <span>{room.speakerCount}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{room.listenerCount}</span>
                      </span>
                    </div>

                    {isLive ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJoinRoom(room);
                        }}
                        className={`btn-pill px-4 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer ${
                          isCurrentActive
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white'
                        }`}
                      >
                        {isCurrentActive ? 'Inside Room' : 'Join'}
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleReminderClick(room, e)}
                        className={`btn-pill px-3 py-1.5 text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                          room.isReminderSet
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'border-slate-300 dark:border-slate-700 hover:border-purple-500 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {room.isReminderSet ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Reminder Set</span>
                          </>
                        ) : (
                          <>
                            <Bell className="w-3.5 h-3.5" />
                            <span>Set Reminder</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty States */
          <div className="p-12 text-center space-y-3 rounded-2xl bg-white dark:bg-[#16181C] border border-[#EFF3F4] dark:border-[#2F3336]">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F1419] dark:text-[#E7E9EA]">
                {activeTab === 'live'
                  ? 'No Live Gist Rooms right now'
                  : activeTab === 'upcoming'
                  ? 'No scheduled rooms found'
                  : 'You have not joined or hosted any rooms yet'}
              </h3>
              <p className="text-xs text-[#536471] dark:text-[#71767B] max-w-sm mx-auto mt-1">
                {activeTab === 'live'
                  ? 'Be the first to host a voice gist room for your campus peers! Share study questions, tech debates, or collegiate news.'
                  : 'Check back soon or schedule your own private university live room session.'}
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-pill px-4 py-2 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white text-xs font-bold shadow-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create a Room</span>
            </button>
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {currentUser && (
        <CreateRoomModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          currentUser={currentUser}
          onCreateRoom={(newRoomData) => {
            createRoom(newRoomData);
            showToast('Gist Room created successfully!');
          }}
        />
      )}
    </div>
  );
};
