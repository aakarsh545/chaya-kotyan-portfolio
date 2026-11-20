import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getCopy } from '../content';
import { Flower } from './Flower';

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
    <section className="relative w-full peach-wash-disciplines text-cream py-16 md:py-28 px-4 sm:px-8 border-b border-peach/30 overflow-hidden">
      {/* Blooming flower accents. They stay at the default layer; the header and list
          below are `relative z-10` so the flowers sit behind the text. */}
      <div className="absolute top-12 -left-8 pointer-events-none opacity-85">
        <Flower type="peach-blossom" size={130} rotation={-20} seed={41} />
      </div>
      <div className="absolute top-1/2 -right-8 pointer-events-none opacity-80">
        <Flower type="peach-blossom" size={125} rotation={35} seed={42} />
      </div>

      {/* SECTION HEADER (Mobile-First) */}
      <div className="relative z-10 w-full max-w-xl mx-auto text-center mb-16">
        <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-peach uppercase font-semibold block">
          POLYMATH & CRAFT
        </span>
        <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-cream mt-1 font-normal">
          {getCopy('disciplines.sectionTitle', 'EIGHT DISCIPLINES')}
        </h2>
        <div className="w-16 h-0.5 bg-peach mx-auto my-3" />
        <p className="font-editorial italic text-base sm:text-lg text-cream/85 max-w-md mx-auto">
          {getCopy('disciplines.subtitle', 'Mastery across diverse realms')}
        </p>
      </div>

      {/* 8 DISCIPLINES (Directly on the page, NO cards, mobile-first) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-20 md:gap-32">

        {/* 1. CANVAS: Paint stroke drawing in her palette */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              DISCIPLINE I · {getCopy('disciplines.canvas.kicker', 'PIGMENT & INTENTION')}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.canvas.title', 'CANVAS')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {getCopy('disciplines.canvas.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: Coded textured paint stroke */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <svg
              viewBox="0 0 400 300"
              className="w-full max-w-sm sm:max-w-md h-auto overflow-visible select-none"
              fill="none"
            >
              <defs>
                <linearGradient id="paintSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F4E79" stopOpacity="0.6" />
                  <stop offset="65%" stopColor="#F4A896" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FCEAE5" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="paintPetal" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#E0728F" />
                  <stop offset="55%" stopColor="#F4A896" />
                  <stop offset="100%" stopColor="#FCEAE5" />
                </linearGradient>
                <radialGradient id="paintSun" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D9A441" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D9A441" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* The canvas itself */}
              <rect x="14" y="14" width="372" height="272" rx="3" fill="#F6EBD9" stroke="#D9A441" strokeWidth="1.2" strokeOpacity="0.6" />

              {/* 1. Background wash, then the sun */}
              <motion.rect
                x="26" y="26" width="348" height="248" rx="2" fill="url(#paintSky)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.2 }}
              />
              <motion.circle
                cx="200" cy="120" r="78" fill="url(#paintSun)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.4, delay: 0.3 }}
              />

              {/* 2. Lotus: outer petals open first, then inner petals, all growing from the centre */}
              {[-64, -32, 0, 32, 64].map((a, i) => (
                <g key={`outer-${a}`} transform={`translate(200 206) rotate(${a})`}>
                  <motion.path
                    d="M0,0 C -36,-24 -32,-84 0,-116 C 32,-84 36,-24 0,0 Z"
                    fill="url(#paintPetal)"
                    stroke="#D9A441"
                    strokeWidth="0.8"
                    strokeOpacity="0.5"
                    style={{ originX: '0px', originY: '0px' }}
                    initial={{ scale: 0.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.1, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.path
                    d="M0,-8 Q 0,-50 0,-92"
                    stroke="#D9A441"
                    strokeWidth="0.7"
                    strokeOpacity="0.45"
                    initial={{ pathLength: 0, opacity: 0 } as any}
                    whileInView={{ pathLength: 1, opacity: 1 } as any}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 1.2 + i * 0.12 }}
                  />
                </g>
              ))}
              {[-20, 0, 20].map((a, i) => (
                <g key={`inner-${a}`} transform={`translate(200 206) rotate(${a})`}>
                  <motion.path
                    d="M0,0 C -22,-14 -20,-58 0,-74 C 20,-58 22,-14 0,0 Z"
                    fill="#FCEAE5"
                    fillOpacity="0.92"
                    stroke="#E0728F"
                    strokeWidth="0.7"
                    strokeOpacity="0.5"
                    style={{ originX: '0px', originY: '0px' }}
                    initial={{ scale: 0.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 1.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                </g>
              ))}

              {/* 3. Leaves on either side of the lotus */}
              <motion.path
                d="M0,0 C 14,-14 34,-12 46,0 C 34,12 14,14 0,0 Z"
                transform="translate(150 226) rotate(-18)"
                fill="#2F5D3A"
                fillOpacity="0.85"
                initial={{ opacity: 0, pathLength: 0 } as any}
                whileInView={{ opacity: 1, pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.2, delay: 2.0 }}
              />
              <motion.path
                d="M0,0 C 14,-14 34,-12 46,0 C 34,12 14,14 0,0 Z"
                transform="translate(250 226) scale(-1 1) rotate(-18)"
                fill="#2F5D3A"
                fillOpacity="0.85"
                initial={{ opacity: 0, pathLength: 0 } as any}
                whileInView={{ opacity: 1, pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.2, delay: 2.15 }}
              />

              {/* 4. Water line with ripples */}
              <motion.ellipse
                cx="200" cy="228" rx="128" ry="9" fill="#9ED8D2" fillOpacity="0.4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: 2.3 }}
              />
              <motion.path
                d="M110,242 Q 200,252 290,242"
                stroke="#9ED8D2" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.8"
                initial={{ pathLength: 0 } as any}
                whileInView={{ pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.4, delay: 2.5 }}
              />
              <motion.path
                d="M140,262 Q 200,270 260,262"
                stroke="#9ED8D2" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.55"
                initial={{ pathLength: 0 } as any}
                whileInView={{ pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.2, delay: 2.8 }}
              />

              {/* 5. Signature, last */}
              <motion.text
                x="346" y="272" textAnchor="end" fontFamily="'Pinyon Script', cursive" fontSize="20" fill="#1F4E79" fillOpacity="0.85"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 3.2 }}
              >
                Chaya
              </motion.text>
            </svg>
          </div>
        </div>

        {/* 2. CALLIGRAPHY: "Chaya" in Pinyon Script writing itself */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              DISCIPLINE II · {getCopy('disciplines.calligraphy.kicker', 'THE WRITTEN LINE')}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.calligraphy.title', 'CALLIGRAPHY')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {getCopy('disciplines.calligraphy.caption', 'CAPTION')}
            </p>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-xs sm:max-w-md h-28 flex items-center justify-center">
              <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible" role="img" aria-label="Chaya, handwritten">
                <defs>
                  {/* The mask is a white bar that widens across the word, so the script is revealed left to right, as if written */}
                  <mask id="chayaWriting" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="120">
                    <motion.rect
                      x="36"
                      y="0"
                      height="120"
                      fill="#fff"
                      initial={{ width: 0 }}
                      whileInView={{ width: 268 }}
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ duration: 2.6, ease: 'easeInOut' }}
                    />
                  </mask>
                </defs>
                <text
                  x="160"
                  y="84"
                  textAnchor="middle"
                  fontFamily="'Pinyon Script', cursive"
                  fontSize="92"
                  fill="#F4A896"
                  mask="url(#chayaWriting)"
                >
                  Chaya
                </text>
                {/* The pen tip, moving along with the writing */}
                <motion.circle
                  cy="90"
                  r="3.2"
                  fill="#FCEAE5"
                  initial={{ cx: 36, opacity: 0 }}
                  whileInView={{ cx: 304, opacity: [0, 1, 1, 0] }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 2.6, ease: 'easeInOut' }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. SPELL BEE: Tiles C-H-A-Y-A hard-cutting in */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              DISCIPLINE III · {getCopy('disciplines.spellBee.kicker', 'LEXICAL PRECISION')}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.spellBee.title', 'SPELL BEE')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {getCopy('disciplines.spellBee.caption', 'CAPTION')}
            </p>
          </div>

          {/* Micro-visual: C-H-A-Y-A hard-cutting peach/saree letter tiles */}
          <div className="w-full md:w-1/2 flex items-center justify-center gap-2">
            {['C', 'H', 'A', 'Y', 'A'].map((letter, idx) => (
              <motion.div
                key={idx}
                className="w-11 h-14 sm:w-13 sm:h-16 border-2 border-peach/70 bg-saree flex flex-col items-center justify-between p-1 select-none shadow-[0_6px_16px_rgba(244,168,150,0.2)]"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{
                  duration: 0.25,
                  delay: idx * 0.16,
                  ease: [0.0, 0.0, 0.2, 1],
                }}
              >
                <span className="text-[8px] font-sans text-peach/70 self-start">
                  {idx + 1}
                </span>
                <span className="font-bodoni font-bold text-2xl sm:text-3xl text-peach leading-none">
                  {letter}
                </span>
                <span className="text-[8px] font-sans text-gold self-end">
                  {letter === 'A' ? 1 : letter === 'C' ? 3 : 4}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. RANGOLI: Symmetrical mandala drawing dot by dot */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              DISCIPLINE IV · {getCopy('disciplines.rangoli.kicker', 'SACRED GEOMETRY')}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.rangoli.title', 'RANGOLI')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {getCopy('disciplines.rangoli.caption', 'CAPTION')}
            </p>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-44 sm:w-52 h-44 sm:h-52 overflow-visible">
              <motion.circle
                cx="100"
                cy="100"
                r="68"
                fill="none"
                stroke="#F4A896"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 } as any}
                whileInView={{ pathLength: 1 } as any}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1.2 }}
              />

              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
                <motion.path
                  key={i}
                  d="M 100,100 C 70,60 130,40 100,20 C 70,40 130,60 100,100"
                  fill="none"
                  stroke="#FCEAE5"
                  strokeWidth="1.2"
                  transform={`rotate(${ang} 100 100)`}
                  initial={((shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 })) as any}
                  whileInView={{ pathLength: 1 } as any}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 1.4, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}

              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
                const rad = (ang * Math.PI) / 180;
                const cx = 100 + Math.sin(rad) * 78;
                const cy = 100 - Math.cos(rad) * 78;
                return (
                  <motion.circle
                    key={`r-dot-${i}`}
                    cx={cx}
                    cy={cy}
                    r="3.2"
                    fill="#F4A896"
                    stroke="#D9A441"
                    strokeWidth="0.8"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.06 }}
                  />
                );
              })}

              <circle cx="100" cy="100" r="5" fill="#D9A441" />
            </svg>
          </div>
        </div>

        {/* 5. DANCE: photo-02 motion interlude (Chaya in floral dupatta in the garden!) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              DISCIPLINE V · {getCopy('disciplines.dance.kicker', 'BHARATANATYAM')}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.dance.title', 'DANCE')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {getCopy('disciplines.dance.caption', 'CAPTION')}
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="relative w-64 sm:w-72 aspect-[3/4] border-2 border-peach/60 p-2 bg-midnight shadow-[0_10px_30px_rgba(244,168,150,0.3)] overflow-hidden group">
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
                    className="w-full mt-2 accent-peach cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/assets/photos/photo-02.webp"
                    alt="Chaya Classical Dance Interlude"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2 text-[9px] font-sans tracking-widest text-peach uppercase">
                    Dance Motion Interlude
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6. SINGING: Silk-ribbon waveform player */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              DISCIPLINE VI · {getCopy('disciplines.singing.kicker', 'VOCAL SILK')}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {getCopy('disciplines.singing.title', 'SINGING')}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {getCopy('disciplines.singing.caption', 'CAPTION')}
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center">
              <svg viewBox="0 0 340 100" className="w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F4A896" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#FCEAE5" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#D9A441" stopOpacity="0.7" />
                  </linearGradient>
                </defs>

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
                  stroke="#F4A896"
                  strokeWidth="1.8"
                  strokeOpacity="0.75"
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

              {hasVoiceAudio && (
                <div className="mt-3 flex items-center gap-3">
                  <audio ref={audioRef} src="/assets/photos/voice.mp3" onEnded={() => setIsPlayingAudio(false)} />
                  <button
                    onClick={toggleAudio}
                    className="px-4 py-1.5 border border-peach text-peach text-xs font-sans tracking-widest uppercase hover:bg-peach hover:text-midnight transition-colors"
                  >
                    {isPlayingAudio ? 'Pause Audio' : 'Play Voice Recording'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 7 & 8. THROWBALL & ATHLETICS: Bold kinetic type, all hard cuts */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              DISCIPLINES VII & VIII · {getCopy('disciplines.throwball.kicker', 'COURT & TRACK')}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              THROWBALL + ATHLETICS
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {getCopy('disciplines.throwball.caption', 'CAPTION')}
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-2.5 font-bodoni text-xl select-none">
            <div className="flex gap-2">
              <motion.div
                className="bg-saree text-cream px-3 py-1 font-bold text-xs sm:text-sm tracking-widest border border-peach/50 uppercase"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
              >
                SPIKE
              </motion.div>
              <motion.div
                className="bg-peach text-midnight px-3 py-1 font-bold text-xs sm:text-sm tracking-widest uppercase"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.25, delay: 0.15, ease: [0, 0, 0.2, 1] }}
              >
                ZONE DEFENSE
              </motion.div>
            </div>

            <div className="border border-peach/40 p-3 sm:p-4 bg-midnight/80 flex flex-col gap-2 shadow-md">
              <div className="flex justify-between items-center text-xs font-sans tracking-[0.2em] text-peach uppercase">
                <span>LANE 04</span>
                <span className="text-gold font-bold">00:00:22.4</span>
              </div>
              <motion.div
                className="w-full h-1 bg-saree relative overflow-hidden"
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-peach w-1/3"
                  animate={{ left: ['-30%', '110%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
              <div className="flex justify-between text-[9px] font-sans tracking-widest text-cream/60 uppercase">
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
