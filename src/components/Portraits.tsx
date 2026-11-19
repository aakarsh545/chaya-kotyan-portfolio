import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content, getCopy } from '../content';

// Specific non-negotiable order: 03, 01, 11, 07, 05, 10, 09, 08, 06, 12
const PORTRAIT_ORDER = ['03', '01', '11', '07', '05', '10', '09', '08', '06', '12'];

export const Portraits: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [missingPhotos, setMissingPhotos] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setMissingPhotos((prev) => ({ ...prev, [id]: true }));
  };

  // Find metadata for each item
  const portraitsList = PORTRAIT_ORDER.map((id) => {
    const meta = content.portraits.items.find((item) => item.id === id) || {
      id,
      title: `Plate ${id}`,
      caption: `Portrait study ${id}`,
      accent: 'gold',
    };
    return meta;
  });

  return (
    <section className="relative w-full bg-cream text-midnight py-12 md:py-24 border-b border-saree/20">
      {/* SECTION INTRO */}
      <div className="w-full max-w-4xl mx-auto px-6 mb-16 text-center">
        <span className="text-[11px] font-sans tracking-[0.3em] text-saree uppercase font-semibold">
          EDITORIAL COLLECTION
        </span>
        <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-midnight mt-2 font-normal">
          {getCopy('portraits.sectionTitle', 'PORTRAITS')}
        </h2>
        <div className="w-16 h-px bg-gold mx-auto my-4" />
        <p className="font-editorial italic text-base sm:text-lg text-saree/80 max-w-lg mx-auto">
          {getCopy('portraits.subtitle', 'A series of studies in grace and composure')}
        </p>
      </div>

      {/* ONE PHOTO PER VIEWPORT */}
      <div className="w-full flex flex-col items-center">
        {portraitsList.map((item, index) => {
          const isFocused = focusedId === null || focusedId === item.id;
          const isAltBackground = index % 2 === 1;

          return (
            <div
              key={item.id}
              className={`w-full min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-4 py-12 transition-opacity duration-700 ${
                isAltBackground ? 'bg-cream' : 'bg-[#EFE4D0]'
              } ${isFocused ? 'opacity-100' : 'opacity-35'}`}
              onMouseEnter={() => setFocusedId(item.id)}
              onMouseLeave={() => setFocusedId(null)}
              onTouchStart={() => setFocusedId(item.id)}
            >
              {/* Photo Frame Container (No cards, pure editorial mounting) */}
              <motion.div
                className="relative flex flex-col items-center max-w-md md:max-w-xl w-full cursor-pointer group"
                initial={{ opacity: 0, filter: 'blur(16px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setActiveLightbox(item.id)}
              >
                {/* Thin golden mounting border */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-gold/40 bg-midnight p-2 shadow-sm">
                  <div className="relative w-full h-full overflow-hidden bg-midnight">
                    {!missingPhotos[item.id] ? (
                      <img
                        src={`/assets/photos/photo-${item.id}.webp`}
                        alt={`Chaya Kotyan - ${item.title}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                        onError={() => {
                          // Try .jpg fallback
                          const img = new Image();
                          img.src = `/assets/photos/photo-${item.id}.jpg`;
                          img.onload = (e) => {
                            const target = e.target as HTMLImageElement;
                            const el = document.getElementById(`img-photo-${item.id}`) as HTMLImageElement;
                            if (el) el.src = target.src;
                          };
                          img.onerror = () => handleImgError(item.id);
                        }}
                        id={`img-photo-${item.id}`}
                      />
                    ) : (
                      /* Coded editorial placeholder strictly in palette */
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-midnight via-saree/40 to-midnight">
                        <div className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center mb-3">
                          <span className="font-bodoni text-xl text-gold">CK</span>
                        </div>
                        <span className="font-bodoni text-lg text-cream tracking-wide">
                          [PHOTO_{item.id}]
                        </span>
                        <span className="text-[10px] font-sans tracking-[0.2em] text-aqua/70 mt-2 uppercase">
                          /assets/photos/photo-{item.id}.webp
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Editorial Caption Below Image (Sharp typography) */}
                <div className="w-full mt-4 flex justify-between items-baseline px-1 border-t border-saree/20 pt-2">
                  <div>
                    <span className="text-[10px] font-sans tracking-[0.25em] text-saree uppercase font-semibold block">
                      NO. {item.id} / {PORTRAIT_ORDER.length}
                    </span>
                    <h3 className="font-bodoni text-xl sm:text-2xl text-midnight font-normal mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-editorial italic text-sm text-saree/80 text-right max-w-[200px]">
                    {item.caption}
                  </p>
                </div>

                {/* Subtle Tap to expand cue */}
                <span className="text-[9px] font-sans tracking-[0.2em] text-gold uppercase mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
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
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActiveLightbox(null)}
          >
            {/* Coded close icon in gold */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-6 right-6 p-3 text-gold hover:text-cream transition-colors z-20"
              aria-label="Close portrait view"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Lightbox Photo & Title */}
            <motion.div
              className="relative max-w-2xl max-h-[85vh] w-full flex flex-col items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative border border-gold/40 p-2 bg-midnight shadow-2xl">
                {!missingPhotos[activeLightbox] ? (
                  <img
                    src={`/assets/photos/photo-${activeLightbox}.webp`}
                    alt={`Portrait ${activeLightbox}`}
                    className="max-h-[75vh] w-auto object-contain"
                    onError={() => handleImgError(activeLightbox)}
                  />
                ) : (
                  <div className="w-[300px] h-[400px] flex flex-col items-center justify-center p-6 bg-saree/30 text-center">
                    <span className="font-bodoni text-2xl text-gold mb-2">CK</span>
                    <span className="font-bodoni text-cream text-lg">
                      [PHOTO_{activeLightbox}]
                    </span>
                    <span className="text-[10px] text-aqua/70 tracking-widest mt-2 uppercase font-sans">
                      Tap anywhere to return
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center">
                <h4 className="font-bodoni text-2xl text-cream font-light">
                  {content.portraits.items.find((p) => p.id === activeLightbox)?.title || `Plate ${activeLightbox}`}
                </h4>
                <p className="font-editorial italic text-gold text-sm mt-1">
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
