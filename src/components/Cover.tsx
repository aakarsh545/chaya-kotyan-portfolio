import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { content, getCopy } from '../content';

export const Cover: React.FC = () => {
  const [hasHeroImg, setHasHeroImg] = useState(true);
  const [hasCutoutImg, setHasCutoutImg] = useState(true);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center px-3 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 bg-midnight text-cream overflow-hidden border-b border-gold/20">
      {/* Golden hour warm lighting effect on the cover */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[500px] rounded-full bg-radial from-gold/15 via-hibiscus/5 to-transparent filter blur-[80px] pointer-events-none" />

      {/* TOP HEADER / MASTHEAD */}
      <header className="w-full max-w-6xl z-20 flex flex-col items-center border-b border-gold/30 pb-2.5">
        <div className="w-full flex justify-between items-center text-[9px] sm:text-xs font-sans tracking-[0.18em] sm:tracking-[0.25em] text-gold uppercase px-1">
          <span>{getCopy('masthead.edition', 'PRIVATE GIFT EDITION')}</span>
          <span className="hidden sm:inline">{getCopy('masthead.date', 'GOLDEN HOUR 2026')}</span>
          <span>{getCopy('masthead.volume', 'VOL. 01')}</span>
        </div>

        <h1 className="mt-1.5 text-center font-bodoni text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.06em] sm:tracking-[0.16em] font-light text-cream uppercase whitespace-nowrap">
          {getCopy('masthead.title', 'THE CHAYA ISSUE · VOL. 1')}
        </h1>
      </header>

      {/* CENTERPIECE: MAGAZINE COVER HEAD & GIANT TEXT SANDWICH */}
      <div className="relative w-full max-w-3xl flex-1 min-h-[440px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center my-2 sm:my-4">
        {/* LAYER 1: HERO BACKGROUND PHOTO (Underneath CHAYA text) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[250px] sm:w-[340px] md:w-[440px] h-[360px] sm:h-[450px] md:h-[530px] overflow-hidden rounded-t-full border border-gold/35 bg-midnight/70">
            {hasHeroImg ? (
              <img
                src="/assets/photos/hero.jpg"
                alt="Chaya Kotyan Portrait"
                fetchPriority="high"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                onError={() => setHasHeroImg(false)}
              />
            ) : (
              /* Coded editorial portrait background */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-t from-midnight via-saree/30 to-midnight/80 p-4 text-center">
                <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border border-gold/45 flex items-center justify-center mb-3">
                  <span className="font-bodoni text-2xl sm:text-3xl text-gold">CK</span>
                </div>
                <span className="font-bodoni text-base sm:text-lg text-cream/90">
                  {getCopy('cover.fullName', 'CHAYA KOTYAN')}
                </span>
                <span className="text-[9px] font-sans tracking-[0.2em] text-gold/70 mt-1 uppercase">
                  [HERO_BACKGROUND]
                </span>
              </div>
            )}
            {/* Soft vignette gradient inside photo frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* LAYER 2: GIANT "CHAYA" IN BODONI MODA BEHIND HER HEAD */}
        <div className="relative z-10 w-full text-center pointer-events-none select-none -translate-y-8 sm:-translate-y-14">
          <motion.h2
            className="font-bodoni font-black text-[16vw] sm:text-[18vw] md:text-[14rem] leading-none tracking-normal text-cream/90 drop-shadow-[0_8px_16px_rgba(11,20,38,0.7)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {getCopy('cover.firstName', 'CHAYA')}
          </motion.h2>
        </div>

        {/* LAYER 3: HERO CUTOUT PHOTO (Above CHAYA text to place text behind head) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="relative w-[250px] sm:w-[340px] md:w-[440px] h-[360px] sm:h-[450px] md:h-[530px]">
            {hasCutoutImg ? (
              <img
                src="/assets/photos/hero-cutout.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-top"
                onError={() => setHasCutoutImg(false)}
              />
            ) : (
              /* Procedural head overlay silhouette in palette to preserve the 3D typography sandwich */
              <div className="w-full h-full flex flex-col items-center justify-start pt-8 sm:pt-12">
                <svg
                  viewBox="0 0 200 240"
                  className="w-32 sm:w-44 md:w-52 h-auto drop-shadow-md"
                  fill="none"
                >
                  <path
                    d="M 60,180 C 60,140 70,110 80,95 C 75,70 85,30 100,28 C 115,30 125,70 120,95 C 130,110 140,140 140,180 Z"
                    fill="url(#cutoutGradM)"
                    stroke="#D9A441"
                    strokeWidth="0.8"
                    strokeOpacity="0.5"
                  />
                  <defs>
                    <linearGradient id="cutoutGradM" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1F4E79" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0B1426" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* EDITORIAL COVER LINES */}
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-1 sm:p-2 pointer-events-none">
          {/* Top Left cover line */}
          <motion.div
            className="max-w-[140px] sm:max-w-[210px] md:max-w-[250px] text-left pt-2 sm:pt-8"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="block text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-hibiscus uppercase font-semibold">
              FEATURE STORY
            </span>
            <p className="font-editorial text-xs sm:text-base md:text-lg text-cream leading-tight mt-0.5">
              {content.cover.coverLines[0] || '[COVER_LINE_1]'}
            </p>
          </motion.div>

          {/* Bottom Right cover line */}
          <motion.div
            className="max-w-[140px] sm:max-w-[210px] md:max-w-[250px] self-end text-right pb-4 sm:pb-10"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-gold uppercase font-semibold">
              EXCLUSIVE EDIT
            </span>
            <p className="font-editorial text-xs sm:text-base md:text-lg text-cream leading-tight mt-0.5">
              {content.cover.coverLines[1] || '[COVER_LINE_2]'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* FOOTER OF THE COVER: THIRD COVER LINE, TAGLINE & CODED BARCODE */}
      <footer className="w-full max-w-6xl z-20 flex flex-col sm:flex-row justify-between items-center pt-2 border-t border-gold/30 gap-2">
        {/* Bottom cover line */}
        <div className="text-center sm:text-left">
          <span className="text-[8.5px] sm:text-[10px] font-sans tracking-[0.16em] sm:tracking-[0.2em] text-aqua uppercase font-semibold block">
            {getCopy('cover.issueNotice', 'EXCLUSIVE COMPILATION · PRIVATE GIFT')}
          </span>
          <p className="font-editorial italic text-[11px] sm:text-sm text-cream/90 max-w-md mt-0.5">
            {content.cover.coverLines[2] || getCopy('cover.tagline', 'TAGLINE')}
          </p>
        </div>

        {/* Coded SVG Barcode */}
        <div className="flex items-center gap-3">
          <svg
            width="96"
            height="24"
            viewBox="0 0 108 28"
            className="fill-current text-gold"
            aria-label="Magazine issue barcode"
          >
            {[
              2, 5, 8, 12, 15, 17, 21, 23, 27, 30, 34, 38, 41, 44, 46, 50,
              54, 57, 61, 64, 68, 71, 75, 78, 82, 85, 89, 93, 96, 100, 104,
            ].map((x, i) => (
              <rect
                key={i}
                x={x}
                y="0"
                width={i % 3 === 0 ? 2 : 1}
                height="22"
              />
            ))}
            <text
              x="54"
              y="27"
              fontSize="5"
              textAnchor="middle"
              fill="#F6EBD9"
              fontFamily="sans-serif"
              letterSpacing="1"
            >
              0 71435 92026 8
            </text>
          </svg>
        </div>
      </footer>
    </section>
  );
};
