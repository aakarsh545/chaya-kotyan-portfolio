import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import { Flower } from './Flower';

interface ClosingProps {
  onBackToTop: () => void;
}

const { back, front } = content.closing;
// The button only shows once a real number (digits only) replaces the placeholder
const hasRealNumber = /^\d{8,15}$/.test(back.whatsappNumber);

export const Closing: React.FC<ClosingProps> = ({ onBackToTop }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [stars, setStars] = useState<number | null>(null);

  const sendReview = () => {
    if (!stars || !hasRealNumber) return;
    const text = encodeURIComponent(back.whatsappMessage.replace('{stars}', String(stars)));
    window.open(`https://wa.me/${back.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const reaction = stars ? back.starReactions[stars as 1 | 2 | 3 | 4 | 5] : null;

  return (
    <section className="relative w-full min-h-[95dvh] sm:min-h-screen peach-wash-closing text-midnight flex flex-col justify-between items-center pt-14 pb-20 px-4 md:px-12 select-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full peach-orb-1 filter blur-[80px] pointer-events-none" />

      <div className="absolute top-8 -right-6 pointer-events-none opacity-85">
        <Flower type="peach-blossom" size={120} rotation={25} seed={81} />
      </div>
      <div className="absolute bottom-16 -left-6 pointer-events-none opacity-80">
        <Flower type="peach-blossom" size={130} rotation={-40} seed={82} />
      </div>

      {/* TOP KICKER */}
      <div className="relative text-center z-10">
        <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-saree uppercase font-semibold">
          {content.closing.label}
        </span>
        <h2 className="font-bodoni text-3xl sm:text-4xl text-midnight mt-1">{content.closing.title}</h2>
        <div className="w-12 h-0.5 bg-peach mx-auto my-2.5" />
      </div>

      {/* 3D FLIPPING CALLING CARD */}
      <div className="relative z-20 my-6 perspective-1000 w-full max-w-xs sm:max-w-md h-[300px] sm:h-[320px]">
        <motion.div
          className="w-full h-full relative cursor-pointer transform-style-preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden bg-midnight border-2 border-peach p-5 sm:p-7 flex flex-col justify-between shadow-[0_12px_35px_rgba(244,168,150,0.35)]">
            <div className="flex justify-between items-start text-peach text-xs font-sans tracking-[0.25em] uppercase">
              <span>{front.topLeft}</span>
              <span className="text-[10px]">{front.topRight}</span>
            </div>

            <div className="text-center my-auto">
              <h3 className="font-bodoni text-3xl sm:text-4xl text-cream tracking-wider font-light">{front.name}</h3>
              <p className="font-editorial italic text-peach text-sm sm:text-base mt-2 max-w-xs mx-auto">
                {front.tagline}
              </p>
            </div>

            <div className="flex justify-between items-end border-t border-peach/30 pt-3">
              <span className="text-[8.5px] font-sans tracking-widest text-cream/60 uppercase">{front.footer}</span>
              <span className="text-[9px] font-sans tracking-widest text-peach uppercase font-semibold">
                {front.flip} &#8634;
              </span>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-saree border-2 border-peach p-5 sm:p-7 flex flex-col justify-between shadow-[0_12px_35px_rgba(244,168,150,0.35)] text-cream">
            <div className="text-center">
              <h3 className="font-pinyon text-4xl sm:text-5xl text-peach mt-1">{back.signature}</h3>
              <p className="font-editorial italic text-xs text-cream/85 mt-1 max-w-xs mx-auto">{back.note}</p>
            </div>

            <div
              className="my-auto flex flex-col items-center gap-1.5 border-y border-peach/40 py-2.5"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[9.5px] font-sans tracking-[0.2em] text-cream uppercase">{back.ratePrompt}</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStars(star)}
                    className="p-1 hover:scale-125 transition-transform"
                    aria-label={`${star} out of 5`}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" className={`${star <= (stars ?? 0) ? 'fill-peach text-peach' : 'fill-none text-peach/40'} stroke-current stroke-1`}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
              {reaction && <span className="font-editorial italic text-sm text-peach-light">{reaction}</span>}
              {stars && hasRealNumber && (
                <button
                  type="button"
                  onClick={sendReview}
                  className="mt-1 px-4 py-1.5 border border-peach text-peach text-[10px] font-sans tracking-widest uppercase hover:bg-peach hover:text-midnight transition-colors"
                >
                  {back.sendButton}
                </button>
              )}
            </div>

            <div className="text-center" />
          </div>
        </motion.div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 mt-4 flex flex-col items-center">
        <button
          onClick={onBackToTop}
          className="group flex flex-col items-center gap-1.5 text-saree hover:text-midnight transition-colors"
        >
          <div className="w-8 h-8 rounded-full border border-peach flex items-center justify-center group-hover:border-midnight transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="-translate-y-0.5 group-hover:-translate-y-1 transition-transform">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </div>
          <span className="font-bodoni tracking-[0.2em] text-xs uppercase">{content.closing.backToTop}</span>
        </button>

        <div className="mt-6 text-center text-[9px] font-sans tracking-[0.2em] text-saree/70 uppercase">
          {content.closing.footerLine1}
        </div>
        <div className="mt-1 text-center font-editorial italic text-xs text-saree/80">{content.closing.footerLine2}</div>
      </div>
    </section>
  );
};
