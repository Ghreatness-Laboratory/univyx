import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Hand,
  Smile,
  Share2,
  Minimize2,
  X,
  Radio,
  Users,
  MapPin,
  Sparkles,
  ShieldCheck,
  MoreVertical,
  Volume2,
  Check,
  AlertTriangle
} from 'lucide-react';
import { GistRoom, RoomParticipant } from '../data/rooms';
import { VerifiedBadge } from './VerifiedBadge';

interface GistRoomModalProps {
  room: GistRoom;
  isOpen: boolean;
  isHost: boolean;
  isMuted: boolean;
  handRaised: boolean;
  onClose: () => void; // minimize to mini-player
  onLeave: () => void;
  onEndRoom: (summary: { duration: string; peakListeners: number }) => void;
  onToggleMute: () => void;
  onToggleHandRaise: () => void;
  onReact: (emoji: string) => void;
}

const EMOJI_REACTIONS = ['🔥', '👏', '💯', '🎓', '😂', '❤️'];

export const GistRoomModal: React.FC<GistRoomModalProps> = ({
  room,
  isOpen,
  isHost,
  isMuted,
  handRaised,
  onClose,
  onLeave,
  onEndRoom,
  onToggleMute,
  onToggleHandRaise,
  onReact
}) => {
  const [activeSpeakerId, setActiveSpeakerId] = useState<string>(room.speakers[0]?.id || '');
  const [listenersCount, setListenersCount] = useState<number>(room.listenerCount);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; left: number }>>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [speakerList, setSpeakerList] = useState<RoomParticipant[]>(room.speakers);
  const [listenerList, setListenerList] = useState<RoomParticipant[]>(room.listeners);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [selectedUserForAction, setSelectedUserForAction] = useState<RoomParticipant | null>(null);

  // Simulate speaking turns with a timer
  useEffect(() => {
    if (!isOpen || speakerList.length === 0) return;
    const interval = setInterval(() => {
      // Pick random speaker among speakers
      const randomIndex = Math.floor(Math.random() * speakerList.length);
      setActiveSpeakerId(speakerList[randomIndex].id);
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpen, speakerList]);

  // Simulate fluctuating listener count
  useEffect(() => {
    if (!isOpen) return;
    const listenerInterval = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
      setListenersCount((prev) => Math.max(5, prev + delta));
    }, 3500);
    return () => clearInterval(listenerInterval);
  }, [isOpen]);

  const handleSendEmoji = (emoji: string) => {
    onReact(emoji);
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      left: 20 + Math.random() * 60 // between 20% and 80%
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 2000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 2500);
  };

  // Host Controls
  const handleMuteSpeaker = (participantId: string) => {
    setSpeakerList((prev) =>
      prev.map((s) => (s.id === participantId ? { ...s, isMuted: !s.isMuted } : s))
    );
    setSelectedUserForAction(null);
  };

  const handleRemoveSpeaker = (participantId: string) => {
    const speakerToRemove = speakerList.find((s) => s.id === participantId);
    if (!speakerToRemove) return;
    setSpeakerList((prev) => prev.filter((s) => s.id !== participantId));
    setListenerList((prev) => [...prev, { ...speakerToRemove, role: 'listener', isSpeaking: false }]);
    setSelectedUserForAction(null);
  };

  const handleInviteToSpeak = (listener: RoomParticipant) => {
    setListenerList((prev) => prev.filter((l) => l.id !== listener.id));
    setSpeakerList((prev) => [
      ...prev,
      { ...listener, role: 'speaker', isSpeaking: false, isMuted: false, handRaised: false }
    ]);
    setSelectedUserForAction(null);
  };

  const handleConfirmEnd = () => {
    setShowEndConfirm(false);
    onEndRoom({
      duration: '42 mins',
      peakListeners: Math.max(listenersCount, room.listenerCount + 18)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl bg-[#0F1419] text-[#E7E9EA] sm:rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Floating Emojis Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {floatingEmojis.map((e) => (
            <div
              key={e.id}
              className="absolute bottom-24 text-3xl animate-bounce transition-all duration-1000 opacity-90"
              style={{
                left: `${e.left}%`,
                animation: 'floatUp 1.8s ease-out forwards'
              }}
            >
              {e.emoji}
            </div>
          ))}
        </div>

        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition-colors"
              title="Minimize room"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                Live Gist Room
              </span>
              <span className="text-xs text-slate-400 font-medium">
                · {listenersCount} listening
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isHost && (
              <button
                onClick={() => setShowEndConfirm(true)}
                className="px-3 py-1 rounded-full bg-red-600/30 hover:bg-red-600 text-red-400 hover:text-white font-bold text-xs border border-red-500/30 transition-colors cursor-pointer"
              >
                End Room
              </button>
            )}
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition-colors relative"
              title="Share Room link"
            >
              <Share2 className="w-5 h-5" />
              {showShareNotification && (
                <div className="absolute right-0 top-10 whitespace-nowrap bg-black text-white text-[11px] font-bold px-2 py-1 rounded-md shadow-lg border border-slate-700 animate-in fade-in">
                  Link copied!
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Room Title, Badges & Location */}
        <div className="p-5 pb-3 border-b border-slate-800/80 bg-gradient-to-b from-purple-950/20 to-transparent space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
              {room.topic}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              {room.host.universityName}
            </span>
            {room.location && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{room.location}</span>
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            {room.title}
          </h2>
          <p className="text-xs text-[#71767B]">
            Hosted by <span className="font-bold text-white">{room.host.name}</span> (@{room.host.username})
          </p>
        </div>

        {/* Speakers & Listeners Stage */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
          {/* Speakers Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Speakers ({speakerList.length})</span>
              <span className="text-[11px] font-normal text-slate-500">
                Pulsing ring indicates active mic
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {speakerList.map((speaker) => {
                const isSpeakingNow = activeSpeakerId === speaker.id && !speaker.isMuted;
                return (
                  <div
                    key={speaker.id}
                    onClick={() => isHost && setSelectedUserForAction(speaker)}
                    className={`flex flex-col items-center text-center p-2 rounded-2xl relative transition-all ${
                      isHost ? 'cursor-pointer hover:bg-white/5' : ''
                    }`}
                  >
                    {/* Speaker Avatar with Pulsing Ring */}
                    <div className="relative mb-2">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-black text-lg flex items-center justify-center transition-all ${
                          isSpeakingNow
                            ? 'ring-4 ring-[#1D9BF0] ring-offset-2 ring-offset-[#0F1419] scale-105 shadow-lg shadow-[#1D9BF0]/30 animate-pulse'
                            : 'ring-2 ring-slate-700'
                        }`}
                      >
                        {speaker.avatar ? (
                          <img
                            src={speaker.avatar}
                            alt={speaker.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          speaker.name.charAt(0)
                        )}
                      </div>

                      {/* Role or Mute Badge */}
                      <div className="absolute -bottom-1 -right-1 flex items-center gap-1">
                        {speaker.isMuted ? (
                          <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white border-2 border-[#0F1419]">
                            <MicOff className="w-3 h-3" />
                          </div>
                        ) : isSpeakingNow ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-[#0F1419]">
                            <Volume2 className="w-3 h-3 animate-bounce" />
                          </div>
                        ) : null}
                      </div>

                      {speaker.role === 'host' && (
                        <span className="absolute -top-1 -right-1 text-[9px] font-extrabold uppercase bg-purple-600 text-white px-1.5 py-0.5 rounded-full border border-black">
                          Host
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-bold text-white truncate max-w-[100px] block">
                      {speaker.name}
                    </span>
                    <span className="text-[11px] text-[#71767B] truncate max-w-[95px] block">
                      @{speaker.username}
                    </span>
                    <span className="text-[10px] text-blue-400/80 truncate max-w-[90px] block mt-0.5">
                      {speaker.universityName.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Listeners Section */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Listeners ({listenersCount})</span>
              <span className="text-[11px] font-normal text-slate-500">
                Scholars across private universities
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {listenerList.map((listener) => (
                <div
                  key={listener.id}
                  onClick={() => isHost && setSelectedUserForAction(listener)}
                  className={`flex flex-col items-center text-center p-1.5 rounded-xl transition-all ${
                    isHost ? 'cursor-pointer hover:bg-white/5' : ''
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center border border-slate-700 mb-1">
                    {listener.name.charAt(0)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 truncate max-w-[70px]">
                    {listener.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-[#71767B] truncate max-w-[65px]">
                    {listener.universityName?.split(' ')[0] || 'Scholar'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Host Participant Action Sheet (Modal within Modal) */}
        {selectedUserForAction && (
          <div className="absolute inset-x-0 bottom-20 z-40 bg-slate-900 border-t border-slate-700 p-4 rounded-t-2xl space-y-3 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">
                  Manage {selectedUserForAction.name} (@{selectedUserForAction.username})
                </h4>
                <p className="text-xs text-slate-400">
                  {selectedUserForAction.role === 'speaker' || selectedUserForAction.role === 'host'
                    ? 'Speaker'
                    : 'Listener'}
                </p>
              </div>
              <button
                onClick={() => setSelectedUserForAction(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {selectedUserForAction.role === 'speaker' && (
                <>
                  <button
                    onClick={() => handleMuteSpeaker(selectedUserForAction.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
                  >
                    {selectedUserForAction.isMuted ? 'Unmute Speaker' : 'Mute Speaker'}
                  </button>
                  <button
                    onClick={() => handleRemoveSpeaker(selectedUserForAction.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white text-xs font-semibold"
                  >
                    Move to Listeners
                  </button>
                </>
              )}

              {selectedUserForAction.role === 'listener' && (
                <button
                  onClick={() => handleInviteToSpeak(selectedUserForAction)}
                  className="w-full py-2 px-3 rounded-xl bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white text-xs font-bold"
                >
                  Invite to Speak
                </button>
              )}
            </div>
          </div>
        )}

        {/* Emoji Selector Popup */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4 z-40 bg-slate-900 border border-slate-700 p-2 rounded-2xl shadow-2xl flex items-center gap-2 animate-in zoom-in-95">
            {EMOJI_REACTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  handleSendEmoji(emoji);
                  setShowEmojiPicker(false);
                }}
                className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-xl transition-transform hover:scale-125 cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#000000] flex items-center justify-between gap-3">
          {/* Left: Mic or Hand Raise */}
          <div className="flex items-center gap-2">
            {isHost || speakerList.some((s) => s.id === 'usr-chidi') ? (
              <button
                onClick={onToggleMute}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-full font-bold text-xs transition-colors cursor-pointer ${
                  isMuted
                    ? 'bg-red-600/30 text-red-400 hover:bg-red-600/40 border border-red-500/30'
                    : 'bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isMuted ? 'Muted' : 'Mic On'}</span>
              </button>
            ) : (
              <button
                onClick={onToggleHandRaise}
                disabled={!room.allowSpeakerRequests}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-full font-bold text-xs transition-colors cursor-pointer ${
                  !room.allowSpeakerRequests
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : handRaised
                    ? 'bg-amber-500 text-black hover:bg-amber-400'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
                title={room.allowSpeakerRequests ? 'Request to speak' : 'Requests disabled'}
              >
                <Hand className={`w-4 h-4 ${handRaised ? 'animate-bounce' : ''}`} />
                <span>{handRaised ? 'Hand Raised' : 'Request'}</span>
              </button>
            )}
          </div>

          {/* Right: Emojis, Share & Red Leave */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="React with emojis"
            >
              <Smile className="w-5 h-5 text-amber-400" />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Share Room"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={onLeave}
              className="py-2.5 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
            >
              Leave
            </button>
          </div>
        </div>

        {/* End Room Confirmation Dialog */}
        {showEndConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-5 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">End Gist Room?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ending this room will disconnect all {listenersCount} listeners and speakers.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowEndConfirm(false)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmEnd}
                  className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white"
                >
                  End for Everyone
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Float up animation styles */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translateY(-280px) scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
