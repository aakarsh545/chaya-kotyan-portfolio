import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import { Flower } from './Flower';

export const Cover: React.FC = () => {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 bg-midnight text-cream overflow-hidden border-b border-peach/30">
      {/* Rich peach-pink radiant colorful background glow */}
      <div className="absolute inset-0 peach-wash-top pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full peach-orb-1 filter blur-[80px] pointer-events-none" />

      {/* Flowers framing the cover. Sit behind the text. */}
      <div className="absolute bottom-[18%] -left-10 z-[15] pointer-events-none">
        <Flower type="peach-blossom" size={110} rotation={-15} seed={71} delay={0.1} />
      </div>
      <div className="absolute top-[58%] -right-8 z-[15] pointer-events-none">
        <Flower type="peach-blossom" size={120} rotation={25} seed={72} delay={0.25} />
      </div>
      <div className="absolute bottom-20 -left-6 z-[15] pointer-events-none hidden sm:block">
        <Flower type="trumpet" size={100} rotation={45} seed={73} delay={0.4} />
      </div>

      {/* TOP HEADER / MASTHEAD */}
      <header className="relative w-full max-w-4xl z-20 flex flex-col items-center border-b border-peach/30 pb-2.5">
        <div className="w-full flex justify-between items-center text-[9px] sm:text-xs font-sans tracking-[0.2em] text-peach uppercase px-1">
          <span>{content.cover.topLeft}</span>
          <span className="hidden sm:inline text-gold">{content.cover.topCenter}</span>
          <span className="text-peach">{content.cover.topRight}</span>
        </div>

        <h1 className="mt-1 text-center font-bodoni text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.08em] sm:tracking-[0.16em] font-light text-cream uppercase whitespace-nowrap">
          {content.cover.masthead}
        </h1>
      </header>

      {/* CENTERPIECE: the name */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl flex-1 min-h-[420px] sm:min-h-[500px] flex items-center justify-center my-2">
        {/* Hero name, pinned to the top of the cover so the cutout sits underneath it */}
        <div className="absolute inset-x-0 top-0 z-10 flex justify-center pointer-events-none">
        <motion.h2
          className="w-full text-center font-bodoni font-black text-[18vw] sm:text-[20vw] md:text-[14rem] lg:text-[15rem] leading-none tracking-[0.32em] text-peach/90 drop-shadow-[0_8px_20px_rgba(11,20,38,0.85)] select-none whitespace-nowrap"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.cover.name}
        </motion.h2>
        </div>

        {/* Her cutout sits in front of the name, so her head overlaps the letters */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/assets/photos/chaya-cutout.png"
            alt=""
            aria-hidden="true"
            className="h-[min(92dvh,900px)] w-auto max-w-none select-none"
            draggable={false}
          />
        </motion.div>

        {/* Cover lines */}
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-1 sm:p-2 pointer-events-none">
          <motion.div
            className="max-w-[145px] sm:max-w-[200px] text-left pt-[34vh] sm:pt-[24vh]"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-peach-deep uppercase font-semibold">
              {content.cover.coverLine1.label}
            </span>
            <p className="font-editorial text-xs sm:text-base text-cream leading-tight mt-0.5 drop-shadow">
              {content.cover.coverLine1.title}
            </p>
          </motion.div>

          <motion.div
            className="max-w-[145px] sm:max-w-[200px] self-end text-right pb-4 sm:pb-8"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="block text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-gold uppercase font-semibold">
              {content.cover.coverLine2.label}
            </span>
            <p className="font-editorial text-xs sm:text-base text-cream leading-tight mt-0.5 drop-shadow">
              {content.cover.coverLine2.title}
            </p>
          </motion.div>
        </div>
      </div>

      {/* FOOTER OF THE COVER */}
      <footer className="relative w-full max-w-4xl z-20 flex flex-col sm:flex-row justify-between items-center pt-2 pb-4 border-t border-peach/30 gap-2 pr-12 sm:pr-0">
        <div className="text-center sm:text-left pr-12 sm:pr-0">
          <span className="text-[8.5px] sm:text-[10px] font-sans tracking-[0.18em] text-peach uppercase font-semibold block">
            {content.cover.strap.label}
          </span>
          <p className="font-editorial italic text-xs sm:text-sm text-cream/90 max-w-md mt-0.5">
            {content.cover.strap.italic}
          </p>
        </div>

        {/* Barcode bars (no digits: the copy file has none) */}
        <div className="flex items-center gap-2">
          <svg width="90" height="22" viewBox="0 0 108 28" className="fill-current text-peach" aria-hidden="true">
            {[
              2, 5, 8, 12, 15, 17, 21, 23, 27, 30, 34, 38, 41, 44, 46, 50,
              54, 57, 61, 64, 68, 71, 75, 78, 82, 85, 89, 93, 96, 100, 104,
            ].map((x, i) => (
              <rect key={i} x={x} y="0" width={i % 3 === 0 ? 2 : 1} height="22" />
            ))}
          </svg>
        </div>
      </footer>

      <p className="absolute bottom-1 left-0 right-0 text-center font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-cream/60 pointer-events-none">
        {content.cover.scrollCue}
      </p>
    </section>
  );
};
