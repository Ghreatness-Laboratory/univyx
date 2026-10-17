import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, X } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'button' | 'menu-item';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'button'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Fallback hint for desktop or unsupported browsers
      alert('To install univyX, tap your browser menu (⋮ or Share) and select "Install app" or "Add to Home Screen".');
    }
  };

  if (variant === 'menu-item') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left ${className}`}
        >
          <Download className="w-4 h-4 text-[#1D9BF0]" />
          <span>Install univyX App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Install on iPhone / iPad</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                1. Tap the <Share2 className="w-3.5 h-3.5 inline mx-1 text-[#1D9BF0]" /> <strong>Share</strong> button in Safari's bottom toolbar.<br />
                2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
                3. Enjoy instant fullscreen access to univyX on campus!
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#1D9BF0] py-2 text-xs font-semibold text-white hover:bg-[#1A8CD8] transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Install Univyx App"
        aria-label="Install Univyx App"
        className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-text-muted hover:text-text hover:bg-accent-soft/40 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${className}`}
      >
        <Download className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-2xl border border-border">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-semibold text-text">Install on iOS</h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 text-text-muted hover:text-text"
              >
                <X className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-muted">
              1. Tap the <Share2 className="w-3.5 h-3.5 inline mx-1 text-accent" strokeWidth={1.8} /> <strong>Share</strong> button in Safari.<br />
              2. Scroll down and select <strong>Add to Home Screen</strong>.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl btn-primary-gradient py-2 text-xs font-semibold text-white cursor-pointer active:scale-95 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
