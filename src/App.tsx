import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { Loader } from './components/Loader';
import { Garden } from './components/Garden';
import { RangoliProgress } from './components/RangoliProgress';
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
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
      <RangoliProgress />

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
