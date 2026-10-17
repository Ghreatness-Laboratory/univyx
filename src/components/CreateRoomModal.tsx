import React, { useState } from 'react';
import { Radio, X, MapPin, Calendar, Clock, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { RoomTopic, RoomScope, ROOM_TOPICS, GistRoom } from '../data/rooms';
import { LocationPickerSheet } from './LocationPickerSheet';
import { UserProfile } from '../types';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onCreateRoom: (roomData: Omit<GistRoom, 'id'>) => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreateRoom
}) => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState<RoomTopic>('Campus Gist');
  const [scope, setScope] = useState<RoomScope>('everyone');
  const [timing, setTiming] = useState<'now' | 'schedule'>('now');
  const [scheduledTime, setScheduledTime] = useState('Today, 8:00 PM');
  const [allowSpeakerRequests, setAllowSpeakerRequests] = useState(true);
  const [location, setLocation] = useState<string | undefined>(currentUser.location);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a room title');
      return;
    }

    onCreateRoom({
      title: title.trim(),
      topic,
      scope,
      location,
      status: timing === 'now' ? 'live' : 'upcoming',
      scheduledFor: timing === 'schedule' ? scheduledTime : undefined,
      startedAt: timing === 'now' ? 'Just now' : undefined,
      allowSpeakerRequests,
      isReminderSet: false,
      host: {
        id: currentUser.id,
        name: currentUser.fullName || currentUser.full_name || 'Scholar',
        username: currentUser.username,
        universityName: currentUser.universityName || currentUser.university_name || 'Private University',
        universityId: currentUser.universityId || currentUser.university_id || 'covenant',
        verificationTier: currentUser.verificationTier || currentUser.verification_tier || 'blue'
      },
      speakers: [
        {
          id: currentUser.id,
          name: currentUser.fullName || currentUser.full_name || 'Scholar',
          username: currentUser.username,
          universityName: currentUser.universityName || currentUser.university_name || 'Private University',
          isHost: true,
          isSpeaking: timing === 'now',
          isMuted: false,
          role: 'host'
        }
      ],
      listeners: [],
      speakerCount: 1,
      listenerCount: timing === 'now' ? 12 : 0
    });

    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in">
        <div className="w-full max-w-lg bg-white dark:bg-[#16181C] rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Create a Gist Room
                </h3>
                <p className="text-xs text-slate-500">
                  Live voice space for collegiate discussions
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto no-scrollbar flex-1">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Room Title */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Room Title *
              </label>
              <input
                type="text"
                placeholder="What do you want to talk about?"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                maxLength={120}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#1D9BF0]"
                autoFocus
              />
              <span className="text-[11px] text-slate-400 block text-right mt-1">
                {title.length}/120
              </span>
            </div>

            {/* Topic Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Select Topic
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ROOM_TOPICS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      topic === t
                        ? 'border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0] font-bold'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0A0A0A] text-slate-600 dark:text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope: Everyone or My University Only */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Audience Scope
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setScope('everyone')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    scope === 'everyone'
                      ? 'border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0]'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0A0A0A] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="text-xs font-bold block">All Private Varsities</span>
                  <span className="text-[11px] opacity-75">Any verified student can join</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScope('my_university')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    scope === 'my_university'
                      ? 'border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0]'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0A0A0A] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="text-xs font-bold block">
                    {currentUser.universityName?.split(' ')[0] || 'My Varsity'} Only
                  </span>
                  <span className="text-[11px] opacity-75">Restricted to your campus</span>
                </button>
              </div>
            </div>

            {/* Timing: Start Now vs Schedule */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                When to Start
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTiming('now')}
                  className={`py-2 px-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                    timing === 'now'
                      ? 'border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0]'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0A0A0A] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Start Now
                </button>
                <button
                  type="button"
                  onClick={() => setTiming('schedule')}
                  className={`py-2 px-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                    timing === 'schedule'
                      ? 'border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0]'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0A0A0A] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Schedule for Later
                </button>
              </div>

              {timing === 'schedule' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    placeholder="e.g. Tonight, 9:00 PM or Friday, 7:00 PM"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              )}
            </div>

            {/* Optional Location Tag */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Campus / Area Tag (Optional)
              </label>
              <button
                type="button"
                onClick={() => setIsLocationPickerOpen(true)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between hover:border-[#1D9BF0] transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#1D9BF0] shrink-0" />
                  <span className="truncate text-slate-800 dark:text-slate-200">
                    {location || 'Add location tag (e.g. Covenant University)'}
                  </span>
                </div>
                <span className="text-[11px] text-[#1D9BF0] font-semibold shrink-0">
                  {location ? 'Change' : 'Choose'}
                </span>
              </button>
            </div>

            {/* Speaker Requests Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Allow Speaker Requests
                </span>
                <span className="text-[11px] text-slate-500">
                  Listeners can raise their hand to speak
                </span>
              </div>
              <input
                type="checkbox"
                checked={allowSpeakerRequests}
                onChange={(e) => setAllowSpeakerRequests(e.target.checked)}
                className="w-4 h-4 accent-[#1D9BF0] cursor-pointer"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-full bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                {timing === 'now' ? 'Start Gist Room Now' : 'Schedule Gist Room'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <LocationPickerSheet
        isOpen={isLocationPickerOpen}
        onClose={() => setIsLocationPickerOpen(false)}
        selectedLocation={location}
        onSelectLocation={(loc) => setLocation(loc)}
        title="Tag Room Location"
      />
    </>
  );
};
