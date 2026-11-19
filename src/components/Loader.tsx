import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [hasPhotoFile, setHasPhotoFile] = useState(true);
  const [stage, setStage] = useState<'dark' | 'rising' | 'developing' | 'revealed'>('dark');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStage('rising'), 200);
    const t2 = setTimeout(() => setStage('developing'), 800);
    const t3 = setTimeout(() => {
      setStage('revealed');
      setTimeout(onComplete, 400);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {stage !== 'revealed' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Light rising from bottom like darkroom developing bath */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, y: '30%' }}
            animate={
              stage === 'rising' || stage === 'developing'
                ? { opacity: 1, y: '0%' }
                : { opacity: 0 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                'radial-gradient(ellipse at 50% 80%, rgba(217, 164, 65, 0.28) 0%, rgba(224, 114, 143, 0.12) 40%, rgba(11, 20, 38, 0.95) 75%)',
            }}
          />

          {/* Developing photographic print container */}
          <div className="relative w-[280px] h-[370px] md:w-[320px] md:h-[430px] p-3 border border-gold/30 bg-midnight/90 shadow-2xl flex flex-col items-center justify-between">
            {/* Top darkroom frame label */}
            <div className="w-full flex justify-between items-center text-[9px] tracking-[0.25em] text-gold/70 uppercase font-sans">
              <span>PLATE NO. 01</span>
              <span>EMULSION DEVELOPING</span>
            </div>

            {/* The developing photograph */}
            <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden bg-midnight border border-saree/30">
              {hasPhotoFile ? (
                <img
                  src="/assets/photos/hero.jpg"
                  alt="Chaya Kotyan developing photograph"
                  className="w-full h-full object-cover transition-all"
                  onLoad={() => setPhotoLoaded(true)}
                  onError={() => {
                    setHasPhotoFile(false);
                    setPhotoLoaded(true);
                  }}
                  style={{
                    filter:
                      stage === 'developing'
                        ? 'contrast(105%) sepia(20%) saturate(110%) brightness(100%)'
                        : 'contrast(180%) sepia(90%) saturate(30%) brightness(40%) blur(4px)',
                    transition: 'filter 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              ) : (
                /* Elegant coded silhouette development placeholder */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-saree/40 via-midnight to-midnight text-center">
                  <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center mb-3">
                    <span className="font-bodoni text-2xl text-gold">CK</span>
                  </div>
                  <span className="font-bodoni text-sm tracking-wider text-cream/80">
                    [HERO_PORTRAIT]
                  </span>
                  <span className="text-[10px] tracking-widest text-gold/60 mt-1 uppercase">
                    Awaiting /assets/photos/hero.jpg
                  </span>
                </div>
              )}

              {/* Chemical liquid wash shimmer overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0.8, y: '-100%' }}
                animate={
                  stage === 'developing'
                    ? { opacity: [0.6, 0.2, 0], y: ['0%', '100%'] }
                    : { opacity: 0.6 }
                }
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                style={{
                  background:
                    'linear-gradient(180deg, rgba(217, 164, 65, 0.3) 0%, rgba(246, 235, 217, 0.1) 50%, transparent 100%)',
                }}
              />
            </div>

            {/* Bottom frame caption */}
            <div className="w-full flex justify-between items-center text-[9px] tracking-widest text-cream/50 uppercase font-sans">
              <span>CHAYA KOTYAN</span>
              <span>1/1 FIRST PROOF</span>
            </div>
          </div>

          {/* Skip button for immediate access */}
          <button
            onClick={onComplete}
            className="mt-6 px-4 py-1.5 text-xs font-sans tracking-[0.2em] text-gold/80 hover:text-gold border-b border-gold/30 hover:border-gold transition-colors uppercase"
          >
            Enter Issue &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
