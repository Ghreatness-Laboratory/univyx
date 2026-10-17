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
        className="card-theme p-4 mb-3 relative"
      >
        {/* Top Header: Advertiser Info, Ad Badge, Menu */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full avatar-gradient font-bold flex items-center justify-center shrink-0 text-xs shadow-xs">
              {ad.advertiserName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[14px] text-text truncate">
                  {ad.advertiserName}
                </span>
                {/* Clear "Ad" Label Badge */}
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md bg-accent-soft text-accent">
                  Ad
                </span>
                <span className="text-[11px] text-text-muted">
                  Sponsored
                </span>
              </div>
            </div>
          </div>

          {/* Three dot actions */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 text-text-muted hover:text-text rounded-full hover:bg-accent-soft/40 transition-colors"
              aria-label="Ad options"
            >
              <MoreHorizontal className="w-4 h-4 text-text-muted" strokeWidth={1.8} />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 top-8 w-48 bg-surface rounded-2xl shadow-2xl border border-border py-1.5 z-30 text-xs text-text animate-in fade-in"
                onMouseLeave={() => setShowMenu(false)}
              >
                <button
                  onClick={() => {
                    setShowMenu(false);
                    hideAd(ad.id);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-accent-soft/40 text-left cursor-pointer"
                >
                  <EyeOff className="w-3.5 h-3.5 text-text-muted" strokeWidth={1.8} />
                  <span>Hide this ad</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowWhyModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-accent-soft/40 text-left cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-accent" strokeWidth={1.8} />
                  <span>Why am I seeing this?</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    showToast('Ad reported to Univyx trust and safety team');
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-accent-soft/40 text-left text-red-500 cursor-pointer"
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
          <h4 className="text-[15px] font-bold text-text leading-snug">
            {ad.title}
          </h4>
          <p className="text-[14px] leading-relaxed text-text-muted whitespace-pre-wrap">
            {ad.text}
          </p>

          {/* Ad Media (Image or Autoplaying Video) */}
          <div className="rounded-2xl overflow-hidden border border-border relative bg-black">
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
              <div className="relative aspect-16/9 bg-surface">
                <img
                  src={ad.mediaUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Bottom Bar inside media with CTA Button */}
            <div className="p-3 bg-surface/95 backdrop-blur-md flex items-center justify-between border-t border-border">
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-medium text-text-muted truncate">
                  {ad.advertiserName} · Verified Partner
                </p>
                <p className="text-xs font-bold text-text truncate">
                  {ad.title}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCtaClick}
                className="btn-primary-gradient px-4 py-1.5 rounded-full text-white text-[13px] font-semibold shrink-0 flex items-center gap-1 cursor-pointer shadow-sm active:scale-95 transition-all"
              >
                <span>{ad.ctaLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* "Why am I seeing this ad?" Modal */}
      {showWhyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-surface text-text rounded-3xl border border-border shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" strokeWidth={1.8} />
                <h3 className="text-base font-bold text-text">About Univyx Sponsored Ads</h3>
              </div>
              <button
                onClick={() => setShowWhyModal(false)}
                className="p-1.5 text-text-muted hover:text-text rounded-full hover:bg-accent-soft/40 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-text-muted leading-relaxed">
              <p>
                You are seeing this promotion because <strong className="text-text">{ad.advertiserName}</strong> is an authorized student lifestyle or collegiate career partner on Univyx.
              </p>
              <div className="p-3.5 rounded-xl bg-bg border border-border space-y-1.5">
                <span className="font-semibold text-text flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-accent" strokeWidth={1.8} />
                  <span>Targeted University Demographic</span>
                </span>
                <p className="text-[11px] text-text-muted">
                  Audience: Private university scholars registered in Nigerian accredited collegiate faculties.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowWhyModal(false)}
              className="w-full py-2.5 rounded-xl btn-primary-gradient font-semibold text-xs text-white cursor-pointer active:scale-95 transition-all"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </>
  );
};
