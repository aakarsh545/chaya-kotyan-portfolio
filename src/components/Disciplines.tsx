import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../content';

const D = content.disciplines.items;
import { Flower } from './Flower';

export const Disciplines: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

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
          {content.disciplines.label}
        </span>
        <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-cream mt-1 font-normal">
          {content.disciplines.title}
        </h2>
        <div className="w-16 h-0.5 bg-peach mx-auto my-3" />
        <p className="font-editorial italic text-base sm:text-lg text-cream/85 max-w-md mx-auto">
          {content.disciplines.subtitle}
        </p>
      </div>

      {/* 8 DISCIPLINES (Directly on the page, NO cards, mobile-first) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-20 md:gap-32">

        {/* 1. CANVAS: Paint stroke drawing in her palette */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              {D[0].n} · {D[0].kicker}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {D[0].title}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {D[0].line}
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
              {D[1].n} · {D[1].kicker}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {D[1].title}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {D[1].line}
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
              {D[2].n} · {D[2].kicker}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {D[2].title}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {D[2].line}
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
                <span className="font-bodoni font-bold text-2xl sm:text-3xl text-peach leading-none">
                  {letter}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. RANGOLI: Symmetrical mandala drawing dot by dot */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              {D[3].n} · {D[3].kicker}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {D[3].title}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {D[3].line}
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
              {D[4].n} · {D[4].kicker}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {D[4].title}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {D[4].line}
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div className="relative w-64 sm:w-72 aspect-[3/4] overflow-hidden group bg-midnight shadow-[0_10px_30px_rgba(244,168,150,0.3)] border-2 border-peach/60 p-2">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/assets/photos/photo-02.webp"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 text-[9px] font-sans tracking-widest text-peach uppercase">
                  {D[4].photoLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. SINGING: Silk-ribbon waveform player */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-6 border-b border-peach/20 pb-12">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              {D[5].n} · {D[5].kicker}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">
              {D[5].title}
            </h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">
              {D[5].line}
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

                          </div>
          </div>
        </div>

        {/* 7 & 8. THROWBALL & ATHLETICS: kinetic words, hard cuts */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <div className="w-full md:w-1/2 text-left">
            <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-peach uppercase font-semibold block">
              {D[6].n} · {D[6].kicker}
            </span>
            <h3 className="font-bodoni text-2xl sm:text-4xl text-cream mt-1">{D[6].title}</h3>
            <p className="font-editorial text-sm sm:text-base text-cream/80 mt-2 max-w-md">{D[6].line}</p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3 select-none">
            <div className="flex flex-wrap gap-2 font-bodoni">
              {D[6].kineticWords.map((word, i) => (
                <motion.div
                  key={word}
                  className={`px-3 py-1 font-bold text-xs sm:text-sm tracking-widest uppercase ${
                    i % 2 === 0 ? 'bg-saree text-cream border border-peach/50' : 'bg-peach text-midnight'
                  }`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.25, delay: i * 0.15, ease: [0, 0, 0.2, 1] }}
                >
                  {word}
                </motion.div>
              ))}
            </div>
            <p className="font-editorial italic text-base sm:text-lg text-cream/85">{D[6].motto}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
