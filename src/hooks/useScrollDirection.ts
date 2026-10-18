import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const diff = scrollY - lastScrollY;

      // Small threshold to avoid jitter on micro-scrolls
      if (Math.abs(diff) < 8) {
        ticking = false;
        return;
      }

      // If near top, always keep visible
      if (scrollY <= 56) {
        setIsVisible(true);
      } else if (diff > 0 && scrollY > 70) {
        // Scrolling down -> hide
        setIsVisible(false);
      } else if (diff < 0) {
        // Scrolling up -> show
        setIsVisible(true);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isVisible;
}
