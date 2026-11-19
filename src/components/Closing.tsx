import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { content, getCopy } from '../content';

interface ClosingProps {
  onBackToTop: () => void;
}

export const Closing: React.FC<ClosingProps> = ({ onBackToTop }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rating, setRating] = useState<number>(5);

  const handleRatingClick = (stars: number) => {
    setRating(stars);
    const phone = content.closing.cardBack.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `${content.closing.cardBack.whatsappMessage}${stars}/5 stars! Congratulations Chaya and Akarsh!`
    );
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative w-full min-h-screen bg-cream text-midnight flex flex-col justify-between items-center pt-16 pb-24 px-4 md:px-12 select-none overflow-hidden">
      {/* Golden hour warm aura behind the calling card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/15 filter blur-[100px] pointer-events-none" />

      {/* TOP KICKER */}
      <div className="text-center z-10">
        <span className="text-[11px] font-sans tracking-[0.3em] text-saree uppercase font-semibold">
          CLOSING IMPRESSION
        </span>
        <h2 className="font-bodoni text-3xl sm:text-4xl text-midnight mt-1">
          THE CALLING CARD
        </h2>
        <div className="w-12 h-px bg-gold mx-auto my-3" />
      </div>

      {/* 3D FLIPPING CALLING CARD */}
      <div className="relative z-20 my-8 perspective-1000 w-full max-w-sm sm:max-w-md h-[270px] sm:h-[300px]">
        <motion.div
          className="w-full h-full relative cursor-pointer transform-style-preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* CARD FRONT: CHAYA KOTYAN */}
          <div className="absolute inset-0 backface-hidden bg-midnight border-2 border-gold/60 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            {/* Corner gold emblems */}
            <div className="flex justify-between items-start text-gold text-xs font-sans tracking-[0.25em] uppercase">
              <span>EST. 2026</span>
              <span className="text-[10px]">VOL. I</span>
            </div>

            {/* Center: Chaya Kotyan & Tagline */}
            <div className="text-center my-auto">
              <h3 className="font-bodoni text-3xl sm:text-4xl text-cream tracking-wider font-light">
                {getCopy('closing.cardFront.name', 'CHAYA KOTYAN')}
              </h3>
              <p className="font-editorial italic text-gold text-sm sm:text-base mt-2 max-w-xs mx-auto">
                {getCopy('closing.cardFront.tagline', 'TAGLINE')}
              </p>
            </div>

            {/* Bottom cue */}
            <div className="flex justify-between items-end border-t border-gold/20 pt-3">
              <span className="text-[9px] font-sans tracking-widest text-cream/50 uppercase">
                {getCopy('closing.cardFront.title', 'PATRON OF EIGHT DISCIPLINES')}
              </span>
              <span className="text-[9px] font-sans tracking-widest text-gold uppercase flex items-center gap-1">
                Tap to flip &#8634;
              </span>
            </div>
          </div>

          {/* CARD BACK: Curated by Akarsh (Pinyon Script) & Star-rating */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-saree border-2 border-gold/60 p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-cream">
            <div className="text-center">
              <span className="text-[10px] font-sans tracking-[0.25em] text-aqua uppercase font-semibold block">
                SPECIAL RECOGNITION
              </span>
              {/* Curated by Akarsh in Pinyon Script font */}
              <h3 className="font-pinyon text-4xl sm:text-5xl text-gold mt-2">
                {getCopy('closing.cardBack.curatorName', 'Curated by Akarsh')}
              </h3>
              <p className="font-editorial italic text-xs text-cream/80 mt-1 max-w-xs mx-auto">
                {getCopy('closing.cardBack.curatorNote', 'Designed with admiration')}
              </p>
            </div>

            {/* Star-rating: "Rate this portfolio" that opens WhatsApp */}
            <div
              className="my-auto flex flex-col items-center gap-2 border-y border-gold/30 py-3"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] font-sans tracking-[0.2em] text-cream uppercase">
                {getCopy('closing.cardBack.ratingPrompt', 'Rate this portfolio')}
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="p-1 hover:scale-125 transition-transform"
                    aria-label={`Rate ${star} stars and send on WhatsApp`}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      className={`${
                        star <= rating ? 'fill-gold text-gold' : 'fill-none text-gold/40'
                      } stroke-current stroke-1`}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
              <span className="text-[9px] font-sans tracking-widest text-aqua uppercase">
                Tap a star to reply via WhatsApp &rarr;
              </span>
            </div>

            {/* Bottom flip-back link */}
            <div className="text-center">
              <span className="text-[9px] font-sans tracking-widest text-gold/70 uppercase">
                Tap card to return to front
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FOOTER: BACK TO THE TOP LINK */}
      <div className="z-10 mt-6 flex flex-col items-center">
        <button
          onClick={onBackToTop}
          className="group flex flex-col items-center gap-2 text-saree hover:text-midnight transition-colors"
        >
          <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center group-hover:border-midnight transition-colors">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="-translate-y-0.5 group-hover:-translate-y-1 transition-transform"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </div>
          <span className="font-bodoni tracking-[0.2em] text-xs uppercase">
            {getCopy('closing.backToTop', 'Back to the top')}
          </span>
        </button>

        <div className="mt-8 text-center text-[10px] font-sans tracking-[0.2em] text-saree/60 uppercase">
          THE CHAYA ISSUE · PRIVATE GIFT EDITION · MMXXVI
        </div>
      </div>
    </section>
  );
};
