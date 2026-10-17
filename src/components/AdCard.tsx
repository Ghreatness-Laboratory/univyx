import React, { useState, useRef, useEffect } from 'react';
import { SponsoredAd } from '../types';
import { useApp } from '../context/AppContext';
import {
  MoreHorizontal,
  Volume2,
  VolumeX,
  ExternalLink,
  Info,
  EyeOff,
  Sparkles,
  Building2,
  X
} from 'lucide-react';

interface AdCardProps {
  ad: SponsoredAd;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { hideAd, showToast, setActiveTab } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to autoplay muted video only when in viewport
  useEffect(() => {
    if (ad.mediaType !== 'video' || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ad.mediaType]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleCtaClick = () => {
    if (ad.ctaUrl.startsWith('#')) {
      const tab = ad.ctaUrl.replace('#', '');
      setActiveTab(tab);
    } else {
      showToast(`Navigating to ${ad.advertiserName} partner portal`);
    }
  };

  return (
    <>
      <article
        ref={containerRef}
        className="p-4 border border-[#EFF3F4] dark:border-[#1E2846] bg-white dark:bg-[#121A30] rounded-[20px] mb-3 hover:border-[#4C8DFF]/40 transition-colors duration-150 relative"
      >
        {/* Top Header: Advertiser Info, Ad Badge, Menu */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-xs">
              {ad.advertiserName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[14px] text-[#0F1419] dark:text-[#E7E9EA] truncate">
                  {ad.advertiserName}
                </span>
                {/* Clear "Ad" Label Badge */}
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[#536471] dark:text-[#E7E9EA]">
                  Ad
                </span>
                <span className="text-[11px] text-[#536471] dark:text-[#71767B]">
                  Sponsored
                </span>
              </div>
            </div>
          </div>

          {/* Three dot actions */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Ad options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 top-8 w-48 bg-white dark:bg-[#16181C] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-30 text-xs text-[#0F1419] dark:text-[#E7E9EA] animate-in fade-in"
                onMouseLeave={() => setShowMenu(false)}
              >
                <button
                  onClick={() => {
                    setShowMenu(false);
                    hideAd(ad.id);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-left cursor-pointer"
                >
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>Hide this ad</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowWhyModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-left cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#1D9BF0]" />
                  <span>Why am I seeing this?</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    showToast('Ad reported to Univyx trust and safety team');
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-red-500 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Report ad</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ad Title & Text Body */}
        <div className="pl-10 space-y-2">
          <h4 className="text-[15px] font-bold text-[#0F1419] dark:text-[#E7E9EA] leading-snug">
            {ad.title}
          </h4>
          <p className="text-[14px] leading-relaxed text-[#0F1419] dark:text-[#E7E9EA]/90 whitespace-pre-wrap">
            {ad.text}
          </p>

          {/* Ad Media (Image or Autoplaying Video) */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-black">
            {ad.mediaType === 'video' ? (
              <div className="relative aspect-video flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={ad.mediaUrl}
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Audio Toggle Button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-xs transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            ) : (
              <div className="relative aspect-16/9 bg-slate-100 dark:bg-slate-900">
                <img
                  src={ad.mediaUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Bottom Bar inside media with CTA Button */}
            <div className="p-3 bg-white/95 dark:bg-[#16181C]/95 backdrop-blur-md flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-medium text-[#536471] dark:text-[#71767B] truncate">
                  {ad.advertiserName} · Verified Partner
                </p>
                <p className="text-xs font-bold text-[#0F1419] dark:text-[#E7E9EA] truncate">
                  {ad.title}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCtaClick}
                className="btn-pill px-4 py-1.5 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white text-[13px] font-bold shrink-0 flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
              >
                <span>{ad.ctaLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* "Why am I seeing this ad?" Modal */}
      {showWhyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#16181C] text-[#0F1419] dark:text-[#E7E9EA] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1D9BF0]/15 text-[#1D9BF0] flex items-center justify-center">
                  <Info className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base">About Univyx Advertisements</h3>
              </div>
              <button
                onClick={() => setShowWhyModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#536471] dark:text-[#71767B] leading-relaxed">
              You are seeing this promotional listing because it has been curated for private university students across Nigeria (including Covenant, Babcock, PAU, Nile, and ABUAD).
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#1D9BF0] shrink-0 mt-0.5" />
                <p>
                  <strong>Target Audience:</strong> Private university undergraduates and postgraduates interested in collegiate technology, academic tools, and career hackathons.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-[#1D9BF0] shrink-0 mt-0.5" />
                <p>
                  <strong>Verification:</strong> Ads are managed and approved strictly by verified collegiate administrators from the Univyx Admin Operations Panel.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setShowWhyModal(false);
                  hideAd(ad.id);
                }}
                className="flex-1 py-2.5 px-4 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Hide This Ad
              </button>
              <button
                onClick={() => setShowWhyModal(false)}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white text-xs font-bold cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
