import React from 'react';
import { Radio, Users, Clock, Award, X, Sparkles } from 'lucide-react';

interface RoomEndedSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomTitle: string;
  duration: string;
  peakListeners: number;
  hostName: string;
}

export const RoomEndedSummaryModal: React.FC<RoomEndedSummaryModalProps> = ({
  isOpen,
  onClose,
  roomTitle,
  duration,
  peakListeners,
  hostName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-[#16181C] text-[#E7E9EA] rounded-3xl border border-slate-800 shadow-2xl p-6 text-center space-y-5 animate-in zoom-in-95">
        <div className="w-14 h-14 rounded-full bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center border border-purple-500/30">
          <Sparkles className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-purple-400 block mb-1">
            Gist Room Concluded
          </span>
          <h3 className="text-lg font-bold text-white line-clamp-2">
            {roomTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Hosted by <span className="text-white font-semibold">{hostName}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#1D9BF0]" />
              <span>Duration</span>
            </div>
            <span className="text-base font-extrabold text-white">{duration}</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Peak Listeners</span>
            </div>
            <span className="text-base font-extrabold text-white">{peakListeners} scholars</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-full bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
        >
          Back to Gist Rooms
        </button>
      </div>
    </div>
  );
};
