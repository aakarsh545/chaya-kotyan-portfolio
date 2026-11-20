import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { content } from '../content';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
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
            <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden bg-midnight border border-saree/30">
              <img
                src="/assets/photos/hero.webp"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover transition-all"
                style={{
                  filter:
                    stage === 'developing'
                      ? 'contrast(105%) sepia(20%) saturate(110%) brightness(100%)'
                      : 'contrast(180%) sepia(90%) saturate(30%) brightness(40%) blur(4px)',
                  transition: 'filter 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            </div>

            <div className="w-full text-center font-editorial italic text-sm text-cream/80 pb-1">
              {content.loader.line}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
