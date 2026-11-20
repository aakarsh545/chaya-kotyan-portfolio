import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { content, getCopy } from '../content';
import { Flower } from './Flower';

export const Cover: React.FC = () => {
  const [hasHeroImg, setHasHeroImg] = useState(true);
  const [hasCutoutImg, setHasCutoutImg] = useState(true);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 bg-midnight text-cream overflow-hidden border-b border-peach/30">
      {/* Rich peach-pink radiant colorful background glow */}
      <div className="absolute inset-0 peach-wash-top pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full peach-orb-1 filter blur-[80px] pointer-events-none" />

      {/* BLOOMING FLOWERS ON INITIAL PAGE LOAD (Directly framing the cover) */}
      {/* Layer order on the cover: hero photo < giant CHAYA (z-10) < flowers (z-[15]) < masthead, footer, cutout (z-20) < cover lines (z-30) */}
      <div className="absolute top-[42%] -left-10 z-[15] pointer-events-none">
        <Flower type="peach-blossom" size={110} rotation={-15} seed={71} delay={0.1} />
      </div>
      <div className="absolute top-28 -right-6 z-[15] pointer-events-none">
        <Flower type="peach-blossom" size={120} rotation={25} seed={72} delay={0.25} />
      </div>
      <div className="absolute bottom-20 -left-6 z-[15] pointer-events-none hidden sm:block">
        <Flower type="trumpet" size={100} rotation={45} seed={73} delay={0.4} />
      </div>

      {/* TOP HEADER / MASTHEAD (Mobile-first) */}
      <header className="w-full max-w-4xl z-20 flex flex-col items-center border-b border-peach/30 pb-2.5">
        <div className="w-full flex justify-between items-center text-[9px] sm:text-xs font-sans tracking-[0.2em] text-peach uppercase px-1">
          <span>{getCopy('masthead.edition', 'PRIVATE GIFT EDITION')}</span>
          <span className="hidden sm:inline text-gold">{getCopy('masthead.date', 'GOLDEN HOUR 2026')}</span>
          <span className="text-peach">{getCopy('masthead.volume', 'VOL. 01')}</span>
        </div>

        <h1 className="mt-1 text-center font-bodoni text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.08em] sm:tracking-[0.16em] font-light text-cream uppercase whitespace-nowrap">
          {getCopy('masthead.title', 'THE CHAYA ISSUE · VOL. 1')}
        </h1>
      </header>

      {/* CENTERPIECE: MAGAZINE COVER HEAD & GIANT TEXT SANDWICH (Mobile-First Proportions) */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl flex-1 min-h-[420px] sm:min-h-[500px] flex items-center justify-center my-2">
        {/* LAYER 1: HERO BACKGROUND PHOTO (Underneath CHAYA text) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[260px] sm:w-[320px] md:w-[400px] h-[370px] sm:h-[450px] md:h-[510px] overflow-hidden rounded-t-[130px] sm:rounded-t-[160px] border-2 border-peach/50 bg-midnight shadow-[0_12px_35px_rgba(244,168,150,0.25)]">
            {hasHeroImg ? (
              <img
                src="/assets/photos/hero.jpg"
                alt="Chaya Kotyan Portrait"
                fetchPriority="high"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                onError={() => setHasHeroImg(false)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-t from-midnight via-saree/30 to-peach/20 p-4 text-center">
                <span className="font-bodoni text-3xl text-peach">CK</span>
                <span className="font-bodoni text-base text-cream mt-2">
                  {getCopy('cover.fullName', 'CHAYA KOTYAN')}
                </span>
              </div>
            )}
            {/* Peach-to-midnight soft gradient vignette at base */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* LAYER 2: GIANT "CHAYA" IN BODONI MODA BEHIND HER HEAD */}
        <div className="relative z-10 w-full text-center pointer-events-none select-none -translate-y-10 sm:-translate-y-16">
          <motion.h2
            className="font-bodoni font-black text-[18vw] sm:text-[18vw] md:text-[12rem] leading-none tracking-normal text-peach/90 drop-shadow-[0_8px_20px_rgba(11,20,38,0.85)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {getCopy('cover.firstName', 'CHAYA')}
          </motion.h2>
        </div>

        {/* LAYER 3: HERO CUTOUT PHOTO (Above CHAYA text so head overlaps the letters) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="relative w-[260px] sm:w-[320px] md:w-[400px] h-[370px] sm:h-[450px] md:h-[510px]">
            {hasCutoutImg ? (
              <img
                src="/assets/photos/hero-cutout.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-top"
                onError={() => setHasCutoutImg(false)}
              />
            ) : null}
          </div>
        </div>

        {/* EDITORIAL COVER LINES (Mobile-First Layout) */}
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-1 sm:p-2 pointer-events-none">
          {/* Top Left cover line */}
          <motion.div
            className="max-w-[145px] sm:max-w-[200px] text-left pt-2 sm:pt-6"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-peach-deep uppercase font-semibold">
              FEATURE STORY
            </span>
            <p className="font-editorial text-xs sm:text-base text-cream leading-tight mt-0.5 drop-shadow">
              {content.cover.coverLines[0] || '[COVER_LINE_1]'}
            </p>
          </motion.div>

          {/* Bottom Right cover line */}
          <motion.div
            className="max-w-[145px] sm:max-w-[200px] self-end text-right pb-4 sm:pb-8"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="block text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-gold uppercase font-semibold">
              EXCLUSIVE EDIT
            </span>
            <p className="font-editorial text-xs sm:text-base text-cream leading-tight mt-0.5 drop-shadow">
              {content.cover.coverLines[1] || '[COVER_LINE_2]'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* FOOTER OF THE COVER (Mobile-First Barcode & Subtitles) */}
      <footer className="w-full max-w-4xl z-20 flex flex-col sm:flex-row justify-between items-center pt-2 pb-4 border-t border-peach/30 gap-2 pr-12 sm:pr-0">
        <div className="text-center sm:text-left">
          <span className="text-[8.5px] sm:text-[10px] font-sans tracking-[0.18em] text-peach uppercase font-semibold block">
            {getCopy('cover.issueNotice', 'EXCLUSIVE COMPILATION · PRIVATE GIFT')}
          </span>
          <p className="font-editorial italic text-xs sm:text-sm text-cream/90 max-w-md mt-0.5">
            {content.cover.coverLines[2] || getCopy('cover.tagline', 'TAGLINE')}
          </p>
        </div>

        {/* Coded SVG Barcode */}
        <div className="flex items-center gap-2">
          <svg
            width="90"
            height="22"
            viewBox="0 0 108 28"
            className="fill-current text-peach"
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
