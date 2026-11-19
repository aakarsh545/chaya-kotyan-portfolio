import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getCopy } from '../content';

export const Disciplines: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Audio state for Singing discipline
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hasVoiceAudio, setHasVoiceAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Video state for Dance discipline
  const [hasDanceVideo, setHasDanceVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  // Check if voice.mp3 and dance.mp4 exist
  useEffect(() => {
    fetch('/assets/photos/voice.mp3', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasVoiceAudio(true);
      })
      .catch(() => setHasVoiceAudio(false));

    fetch('/assets/photos/dance.mp4', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasDanceVideo(true);
      })
      .catch(() => setHasDanceVideo(false));
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  return (
    <section className="relative w-full bg-midnight text-cream py-16 md:py-28 px-4 sm:px-8 border-b border-gold/20 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-saree/20 filter blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-hibiscus/10 filter blur-[90px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="w-full max-w-4xl mx-auto text-center mb-20">
        <span className="text-[11px] font-sans tracking-[0.3em] text-aqua uppercase font-semibold">
          POLYMATH & CRAFT
        </span>
        <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-cream mt-2 font-normal">
          {getCopy('disciplines.sectionTitle', 'EIGHT DISCIPLINES')}
        </h2>
        <div className="w-20 h-px bg-gold mx-auto my-4" />
        <p className="font-editorial italic text-base sm:text-lg text-cream/80 max-w-lg mx-auto">
          {getCopy('disciplines.subtitle', 'Mastery across diverse realms')}
        </p>
      </div>

      {/* 8 DISCIPLINES (Directly on the page, NO cards) */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-24 md:gap-36">

        {/* 1. CANVAS: Paint stroke drawing in her palette */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gold/15 pb-16">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-sans tracking-[0.25em] text-gold uppercase font-semibold block">
              DISCIPLINE I · {getCopy('disciplines.canvas.kicker', 'PIGMENT & INTENTION')}
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.canvas.title', 'CANVAS')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/75 mt-3 max-w-md">
              {getCopy('disciplines.canvas.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: Coded textured paint stroke */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <svg
              viewBox="0 0 400 160"
              className="w-full max-w-md h-auto overflow-visible select-none"
              fill="none"
            >
              <defs>
                <linearGradient id="strokePalette" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1F4E79" />
                  <stop offset="35%" stopColor="#E0728F" />
                  <stop offset="70%" stopColor="#D9A441" />
                  <stop offset="100%" stopColor="#9ED8D2" />
                </linearGradient>
              </defs>

              {/* Main expressive brush stroke */}
              <motion.path
                d="M 20,80 Q 120,20 220,100 T 380,60"
                stroke="url(#strokePalette)"
                strokeWidth="28"
                strokeLinecap="round"
                initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                whileInView={{ pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Top bristle striations */}
              <motion.path
                d="M 25,72 Q 125,14 220,92 T 375,54"
                stroke="#F6EBD9"
                strokeWidth="3"
                strokeOpacity="0.45"
                initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                whileInView={{ pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Bottom gold pigment splatter highlights */}
              <motion.path
                d="M 30,90 Q 130,30 225,108 T 370,68"
                stroke="#D9A441"
                strokeWidth="4"
                strokeOpacity="0.6"
                initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                whileInView={{ pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Organic pigment droplets */}
              {[
                { cx: 80, cy: 120, r: 4, col: '#E0728F' },
                { cx: 160, cy: 35, r: 3, col: '#D9A441' },
                { cx: 280, cy: 130, r: 5, col: '#9ED8D2' },
                { cx: 340, cy: 30, r: 3.5, col: '#1F4E79' },
              ].map((dot, idx) => (
                <motion.circle
                  key={idx}
                  cx={dot.cx}
                  cy={dot.cy}
                  r={dot.r}
                  fill={dot.col}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.3, delay: 1.0 + idx * 0.1 }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* 2. CALLIGRAPHY: "Chaya" in Pinyon Script writing itself */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-8 border-b border-gold/15 pb-16">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-sans tracking-[0.25em] text-aqua uppercase font-semibold block">
              DISCIPLINE II · {getCopy('disciplines.calligraphy.kicker', 'THE WRITTEN LINE')}
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.calligraphy.title', 'CALLIGRAPHY')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/75 mt-3 max-w-md">
              {getCopy('disciplines.calligraphy.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: Cursive "Chaya" drawing itself */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-md h-32 flex items-center justify-center">
              <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible">
                {/* Capital C stroke */}
                <motion.path
                  d="M 60,35 C 40,25 25,45 28,70 C 32,95 55,100 70,88"
                  fill="none"
                  stroke="#D9A441"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                  whileInView={{ pathLength: 1 } as any}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
                {/* 'h' cursive loop & downstroke */}
                <motion.path
                  d="M 68,90 C 78,65 95,20 102,28 C 105,35 88,95 88,95 C 92,75 110,65 118,78 C 122,86 120,95 125,95"
                  fill="none"
                  stroke="#F6EBD9"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                  whileInView={{ pathLength: 1 } as any}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
                />
                {/* 'a' cursive oval & tail */}
                <motion.path
                  d="M 125,95 C 135,75 152,70 148,84 C 144,98 132,98 134,86 C 136,74 150,72 154,82 L 156,95"
                  fill="none"
                  stroke="#F6EBD9"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                  whileInView={{ pathLength: 1 } as any}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 1.1, ease: 'easeInOut' }}
                />
                {/* 'y' cursive descender */}
                <motion.path
                  d="M 156,95 C 162,80 174,80 175,90 C 176,96 182,82 192,82 L 190,95 C 188,110 182,125 170,122 C 162,120 168,105 196,92"
                  fill="none"
                  stroke="#F6EBD9"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                  whileInView={{ pathLength: 1 } as any}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 1.6, ease: 'easeInOut' }}
                />
                {/* final 'a' flourish */}
                <motion.path
                  d="M 196,92 C 205,75 220,70 218,84 C 215,98 202,98 205,86 C 208,74 220,74 224,84 L 226,95 C 235,96 260,88 280,75"
                  fill="none"
                  stroke="#D9A441"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                  whileInView={{ pathLength: 1 } as any}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: 2.2, ease: 'easeInOut' }}
                />
                {/* Ink reservoir nib glint */}
                <motion.circle
                  cx="280"
                  cy="75"
                  r="3.5"
                  fill="#D9A441"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.4, 1] }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 3.0 }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. SPELL BEE: Tiles C-H-A-Y-A hard-cutting in */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gold/15 pb-16">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-sans tracking-[0.25em] text-hibiscus uppercase font-semibold block">
              DISCIPLINE III · {getCopy('disciplines.spellBee.kicker', 'LEXICAL PRECISION')}
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.spellBee.title', 'SPELL BEE')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/75 mt-3 max-w-md">
              {getCopy('disciplines.spellBee.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: C-H-A-Y-A hard-cutting wooden/lacquered letter tiles */}
          <div className="w-full md:w-1/2 flex items-center justify-center gap-2 sm:gap-3">
            {['C', 'H', 'A', 'Y', 'A'].map((letter, idx) => (
              <motion.div
                key={idx}
                className="w-12 h-14 sm:w-14 sm:h-16 border border-gold/60 bg-saree flex flex-col items-center justify-between p-1.5 select-none"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  duration: 0.25, // Motion identity: hard cut (~250ms, strong ease-out)
                  delay: idx * 0.18,
                  ease: [0.0, 0.0, 0.2, 1],
                }}
              >
                <span className="text-[8px] font-sans text-gold/60 self-start">
                  {idx + 1}
                </span>
                <span className="font-bodoni font-bold text-2xl sm:text-3xl text-cream leading-none">
                  {letter}
                </span>
                <span className="text-[8px] font-sans text-gold self-end">
                  {letter === 'A' ? 1 : letter === 'C' ? 3 : letter === 'H' ? 4 : 4}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. RANGOLI: Symmetrical mandala drawing dot by dot */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-8 border-b border-gold/15 pb-16">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-sans tracking-[0.25em] text-gold uppercase font-semibold block">
              DISCIPLINE IV · {getCopy('disciplines.rangoli.kicker', 'SACRED GEOMETRY')}
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.rangoli.title', 'RANGOLI')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/75 mt-3 max-w-md">
              {getCopy('disciplines.rangoli.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: Symmetrical dot-to-dot mandala */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 sm:w-56 h-48 sm:h-56 overflow-visible">
              {/* Concentric rings */}
              <motion.circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#D9A441"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 } as any}
                whileInView={{ pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1.2 }}
              />

              {/* 8 Radial symmetrical connecting loops */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
                <motion.path
                  key={i}
                  d="M 100,100 C 70,60 130,40 100,20 C 70,40 130,60 100,100"
                  fill="none"
                  stroke="#9ED8D2"
                  strokeWidth="1.2"
                  transform={`rotate(${ang} 100 100)`}
                  initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                  whileInView={{ pathLength: 1 } as any}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 1.4, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}

              {/* 8 Dots at outer apexes */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
                const rad = (ang * Math.PI) / 180;
                const cx = 100 + Math.sin(rad) * 80;
                const cy = 100 - Math.cos(rad) * 80;
                return (
                  <motion.circle
                    key={`r-dot-${i}`}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="#E0728F"
                    stroke="#F6EBD9"
                    strokeWidth="0.8"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.06 }}
                  />
                );
              })}

              {/* Center bindu */}
              <circle cx="100" cy="100" r="4.5" fill="#D9A441" />
            </svg>
          </div>
        </div>

        {/* 5. DANCE: photo-02 motion interlude (scrub dance.mp4 if it exists) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gold/15 pb-16">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-sans tracking-[0.25em] text-aqua uppercase font-semibold block">
              DISCIPLINE V · {getCopy('disciplines.dance.kicker', 'BHARATANATYAM')}
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.dance.title', 'DANCE')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/75 mt-3 max-w-md">
              {getCopy('disciplines.dance.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: Photo-02 motion interlude with video scrub support */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="relative w-64 sm:w-72 aspect-[3/4] border border-gold/40 p-2 bg-midnight shadow-lg overflow-hidden group">
              {hasDanceVideo ? (
                <div className="relative w-full h-full flex flex-col">
                  <video
                    ref={videoRef}
                    src="/assets/photos/dance.mp4"
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                    loop
                  />
                  {/* Scrub slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={videoProgress}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setVideoProgress(val);
                      if (videoRef.current && videoRef.current.duration) {
                        videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
                      }
                    }}
                    className="w-full mt-2 accent-gold cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/assets/photos/photo-02.webp"
                    alt="Chaya Classical Dance Interlude"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fb = document.getElementById('dance-fb');
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  {/* Coded Mudra Pose Fallback */}
                  <div
                    id="dance-fb"
                    style={{ display: 'none' }}
                    className="w-full h-full flex flex-col items-center justify-center p-4 bg-saree/30 text-center"
                  >
                    <svg viewBox="0 0 100 120" className="w-20 h-24 mb-2 text-gold fill-current">
                      <path d="M 50,15 C 55,15 60,20 60,26 C 60,32 55,37 50,37 C 45,37 40,32 40,26 C 40,20 45,15 50,15 Z" />
                      <path d="M 46,42 L 54,42 L 58,72 L 72,55 L 76,60 L 60,84 L 56,110 L 44,110 L 40,84 L 24,60 L 28,55 L 42,72 Z" />
                    </svg>
                    <span className="font-bodoni text-cream text-sm">[PHOTO_02]</span>
                    <span className="text-[9px] font-sans text-gold/70 uppercase tracking-widest mt-1">
                      Dance Motion Interlude
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6. SINGING: Silk-ribbon waveform player (only if voice.mp3 exists) */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-8 border-b border-gold/15 pb-16">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-sans tracking-[0.25em] text-hibiscus uppercase font-semibold block">
              DISCIPLINE VI · {getCopy('disciplines.singing.kicker', 'VOCAL SILK')}
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.singing.title', 'SINGING')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/75 mt-3 max-w-md">
              {getCopy('disciplines.singing.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: Silk-ribbon waveform animation */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="w-full max-w-md flex flex-col items-center">
              <svg viewBox="0 0 340 100" className="w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9ED8D2" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#D9A441" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#E0728F" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Harmonious wavy silk ribbons */}
                <motion.path
                  d="M 10,50 Q 80,10 170,50 T 330,50"
                  fill="none"
                  stroke="url(#ribbonGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          d: [
                            'M 10,50 Q 80,10 170,50 T 330,50',
                            'M 10,50 Q 80,85 170,50 T 330,50',
                            'M 10,50 Q 80,10 170,50 T 330,50',
                          ],
                        }
                  }
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.path
                  d="M 10,50 Q 90,80 170,50 T 330,50"
                  fill="none"
                  stroke="#F6EBD9"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          d: [
                            'M 10,50 Q 90,80 170,50 T 330,50',
                            'M 10,50 Q 90,20 170,50 T 330,50',
                            'M 10,50 Q 90,80 170,50 T 330,50',
                          ],
                        }
                  }
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>

              {/* Only if voice.mp3 exists, show the interactive playback button */}
              {hasVoiceAudio && (
                <div className="mt-3 flex items-center gap-3">
                  <audio ref={audioRef} src="/assets/photos/voice.mp3" onEnded={() => setIsPlayingAudio(false)} />
                  <button
                    onClick={toggleAudio}
                    className="px-4 py-1.5 border border-gold/40 text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-midnight transition-colors"
                  >
                    {isPlayingAudio ? 'Pause Audio' : 'Play Voice Recording'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 7 & 8. THROWBALL & ATHLETICS: Bold kinetic type, all hard cuts */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pb-12">
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-sans tracking-[0.25em] text-gold uppercase font-semibold block">
              DISCIPLINES VII & VIII · {getCopy('disciplines.throwball.kicker', 'COURT & TRACK')}
            </span>
            <h3 className="font-bodoni text-3xl sm:text-4xl text-cream mt-1">
              THROWBALL + ATHLETICS
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/75 mt-3 max-w-md">
              {getCopy('disciplines.throwball.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: Bold kinetic type with hard cuts */}
          <div className="w-full md:w-1/2 flex flex-col gap-3 font-bodoni text-xl sm:text-2xl select-none">
            {/* Hard-cut animated kinetic badges */}
            <div className="flex gap-2">
              <motion.div
                className="bg-saree text-cream px-3 py-1 font-bold text-sm tracking-widest border border-gold/40 uppercase"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
              >
                SPIKE
              </motion.div>
              <motion.div
                className="bg-hibiscus text-midnight px-3 py-1 font-bold text-sm tracking-widest uppercase"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.25, delay: 0.15, ease: [0, 0, 0.2, 1] }}
              >
                ZONE DEFENSE
              </motion.div>
            </div>

            {/* Kinetic Running Cadence line */}
            <div className="border border-gold/30 p-4 bg-midnight/70 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-sans tracking-[0.2em] text-aqua uppercase">
                <span>LANE 04</span>
                <span className="text-gold font-bold">00:00:22.4</span>
              </div>
              <motion.div
                className="w-full h-1 bg-saree relative overflow-hidden"
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gold w-1/3"
                  animate={{ left: ['-30%', '110%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
              <div className="flex justify-between text-[10px] font-sans tracking-widest text-cream/60 uppercase">
                <span>START BLOCKS</span>
                <span>FINISH LINE TAPE</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
