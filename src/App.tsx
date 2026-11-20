import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { Loader } from './components/Loader';
import { Garden } from './components/Garden';
import { Cover } from './components/Cover';
import { Portraits } from './components/Portraits';
import { Disciplines } from './components/Disciplines';
import { Closing } from './components/Closing';

export function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Gentle snap: once scrolling stops near a section start or a book page turn,
    // ease the page the rest of the way to it.
    const snapPoints = (): number[] => {
      const pts: number[] = [];
      document.querySelectorAll<HTMLElement>('main > section').forEach((sec) => {
        pts.push(sec.getBoundingClientRect().top + window.scrollY);
      });
      document.querySelectorAll<HTMLElement>('[data-snap-steps]').forEach((el) => {
        const steps = Number(el.dataset.snapSteps);
        const top = el.getBoundingClientRect().top + window.scrollY;
        const range = el.offsetHeight - window.innerHeight;
        for (let k = 0; k <= steps; k++) pts.push(top + (k / steps) * range);
      });
      return pts;
    };

    let idleTimer: number | undefined;
    const settle = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const y = window.scrollY;
      let best: number | null = null;
      let bestDist = Infinity;
      for (const p of snapPoints()) {
        const d = Math.abs(p - y);
        if (d < bestDist) {
          bestDist = d;
          best = p;
        }
      }
      // Only snap when a stop is close; in the middle of a long section, leave it alone
      if (best !== null && bestDist > 4 && bestDist < window.innerHeight * 0.4) {
        lenis.scrollTo(best, { duration: 1.1 });
      }
    };
    const onScroll = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(settle, 220);
    };
    lenis.on('scroll', onScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(idleTimer);
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  const handleBackToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-midnight text-cream font-sans selection:bg-gold selection:text-midnight">
      {/* 1. PHOTOGRAPH DEVELOPMENT LOADER */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* FIXED GARDEN: 8-12 living flowers, vines, parallax depth layers, drifting petals */}
      <Garden />

      {/* SCROLL PROGRESS MANDALA: Sacred Rangoli completing with scroll */}

      {/* MAIN EDITORIAL MAGAZINE SECTIONS */}
      <main className="relative z-20 w-full">
        {/* SECTION 2: COVER (Midnight Indigo background) */}
        <Cover />

        {/* SECTION 3: PORTRAITS (Alternating Cream background) */}
        <Portraits />

        {/* SECTION 4: EIGHT DISCIPLINES (Midnight Indigo background) */}
        <Disciplines />

        {/* SECTION 5: CLOSING CALLING CARD (Alternating Cream background) */}
        <Closing onBackToTop={handleBackToTop} />
      </main>
    </div>
  );
}

export default App;
