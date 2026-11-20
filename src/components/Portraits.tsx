import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content, getCopy } from '../content';
import { Flower } from './Flower';

// Specific non-negotiable order: 03, 01, 11, 07, 05, 10, 09, 08, 06, 12
const PORTRAIT_ORDER = ['03', '01', '11', '07', '05', '10', '09', '08', '06', '12'];

export const Portraits: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // Find metadata for each item
  const portraitsList = PORTRAIT_ORDER.map((id) => {
    const meta = content.portraits.items.find((item) => item.id === id) || {
      id,
      title: `Plate ${id}`,
      caption: `Portrait study ${id}`,
      accent: 'peach',
    };
    return meta;
  });

  return (
    <section className="relative w-full peach-wash-portraits text-midnight py-12 md:py-24 border-b border-peach/40 overflow-hidden">
      {/* Decorative blooming flower accents along the margins. The intro and photo list
          below are `relative z-10` so the flowers sit behind them. The section itself is
          not a stacking context, so the lightbox's z-50 still covers the whole page. */}
      <div className="absolute top-8 -right-8 pointer-events-none opacity-85">
        <Flower type="peach-blossom" size={130} rotation={20} seed={11} />
      </div>
      <div className="absolute top-1/3 -left-8 pointer-events-none opacity-80">
        <Flower type="peach-blossom" size={120} rotation={-30} seed={12} />
      </div>
      <div className="absolute top-2/3 -right-6 pointer-events-none opacity-80">
        <Flower type="trumpet" size={125} rotation={40} seed={13} />
      </div>

      {/* SECTION INTRO (Mobile-First) */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-6 mb-12 text-center">
        <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-saree uppercase font-semibold block">
          EDITORIAL COLLECTION
        </span>
        <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-midnight mt-1 font-normal">
          {getCopy('portraits.sectionTitle', 'PORTRAITS')}
        </h2>
        <div className="w-16 h-0.5 bg-peach mx-auto my-3" />
        <p className="font-editorial italic text-base sm:text-lg text-saree/85 max-w-md mx-auto">
          {getCopy('portraits.subtitle', 'A series of studies in grace and composure')}
        </p>
      </div>

      {/* ONE PHOTO PER VIEWPORT (Mobile-First 100dvh Experience) */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {portraitsList.map((item, index) => {
          const isFocused = focusedId === null || focusedId === item.id;
          const isAltBackground = index % 2 === 1;

          return (
            <div
              key={item.id}
              className={`w-full min-h-[92dvh] sm:min-h-screen flex flex-col items-center justify-center px-4 py-8 transition-opacity duration-700 ${
                isAltBackground ? 'bg-peach-light/60' : 'bg-transparent'
              } ${isFocused ? 'opacity-100' : 'opacity-40'}`}
              onMouseEnter={() => setFocusedId(item.id)}
              onMouseLeave={() => setFocusedId(null)}
              onTouchStart={() => setFocusedId(item.id)}
            >
              {/* Photo Frame Container (Tactile mobile editorial mounting) */}
              <motion.div
                className="relative flex flex-col items-center max-w-sm sm:max-w-md md:max-w-xl w-full cursor-pointer group"
                initial={{ opacity: 0, filter: 'blur(16px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setActiveLightbox(item.id)}
              >
                {/* Thin peach and gold mounting border */}
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden border-2 border-peach/60 bg-midnight p-2 shadow-[0_10px_30px_rgba(244,168,150,0.35)]">
                  <div className="relative w-full h-full overflow-hidden bg-midnight">
                    <img
                      src={`/assets/photos/photo-${item.id}.webp`}
                      alt={`Chaya Kotyan - ${item.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      id={`img-photo-${item.id}`}
                    />
                  </div>
                </div>

                {/* Editorial Caption Below Image */}
                <div className="w-full mt-3 flex justify-between items-baseline px-1 border-t border-peach/50 pt-2">
                  <div>
                    <span className="text-[9px] font-sans tracking-[0.25em] text-saree uppercase font-semibold block">
                      NO. {item.id} / {PORTRAIT_ORDER.length}
                    </span>
                    <h3 className="font-bodoni text-xl sm:text-2xl text-midnight font-normal mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-editorial italic text-xs sm:text-sm text-saree/80 text-right max-w-[180px]">
                    {item.caption}
                  </p>
                </div>

                {/* Subtle Tap to expand cue */}
                <span className="text-[9px] font-sans tracking-[0.2em] text-peach-deep uppercase mt-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  Tap to view full frame &rarr;
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* SLOW LIGHTBOX */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActiveLightbox(null)}
          >
            {/* Coded close icon in peach */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-5 right-5 p-3 text-peach hover:text-cream transition-colors z-20"
              aria-label="Close portrait view"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Lightbox Photo & Title */}
            <motion.div
              className="relative max-w-lg max-h-[85vh] w-full flex flex-col items-center"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative border-2 border-peach/70 p-2 bg-midnight shadow-2xl">
                <img
                  src={`/assets/photos/photo-${activeLightbox}.webp`}
                  alt={`Portrait ${activeLightbox}`}
                  className="max-h-[72vh] w-auto object-contain"
                />
              </div>

              <div className="mt-3 text-center">
                <h4 className="font-bodoni text-2xl text-cream font-light">
                  {content.portraits.items.find((p) => p.id === activeLightbox)?.title || `Plate ${activeLightbox}`}
                </h4>
                <p className="font-editorial italic text-peach text-sm mt-0.5">
                  {content.portraits.items.find((p) => p.id === activeLightbox)?.caption || `Portrait ${activeLightbox}`}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
