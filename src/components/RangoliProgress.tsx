import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const RangoliProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed bottom-4 right-4 z-40 select-none pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
        {/* Soft backdrop circle in midnight */}
        <div className="absolute inset-0 rounded-full bg-midnight/90 border border-gold/40 shadow-xl" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1.5 overflow-visible"
        >
          {/* Base outer boundary circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#1F4E79"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          {/* Animated Outer Mandalic Ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#D9A441"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              pathLength: smoothProgress,
              rotate: -90,
              transformOrigin: '50px 50px',
            }}
          />

          {/* Inner concentric ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke="#9ED8D2"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            style={{
              pathLength: smoothProgress,
              rotate: 90,
              transformOrigin: '50px 50px',
            }}
          />

          {/* 8 Radial Rangoli Petals drawing as scroll progresses */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.path
              key={i}
              d="M 50,50 Q 50,22 50,14 Q 58,26 50,50"
              fill="none"
              stroke="#F6EBD9"
              strokeWidth="1.1"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
              style={{
                pathLength: smoothProgress,
                opacity: 0.9,
              }}
            />
          ))}

          {/* 8 Outer dots that complete the mandala */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 50 + Math.sin(rad) * 42;
            const cy = 50 - Math.cos(rad) * 42;
            return (
              <motion.circle
                key={`dot-${i}`}
                cx={cx}
                cy={cy}
                r="2"
                fill="#D9A441"
                style={{
                  scale: smoothProgress,
                  opacity: smoothProgress,
                }}
              />
            );
          })}

          {/* Central Bindu */}
          <circle
            cx="50"
            cy="50"
            r="3.5"
            fill="#E0728F"
            stroke="#D9A441"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    </div>
  );
};
