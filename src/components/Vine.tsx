import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface VineProps {
  className?: string;
  side?: 'left' | 'right' | 'top-left' | 'bottom-right';
  progress?: number;
  animateOnView?: boolean;
}

export const Vine: React.FC<VineProps> = ({
  className = '',
  side = 'left',
  animateOnView = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const isLeft = side === 'left' || side === 'top-left';

  const stemPath = isLeft
    ? 'M 20,0 C 80,180 0,360 70,540 C 130,700 30,860 60,1000'
    : 'M 180,0 C 120,180 200,360 130,540 C 70,700 170,860 140,1000';

  const leaves = isLeft
    ? [
        { x: 50, y: 150, angle: -35, scale: 0.9, delay: 0.4 },
        { x: 35, y: 320, angle: 45, scale: 1.1, delay: 0.7 },
        { x: 80, y: 480, angle: -40, scale: 1.0, delay: 1.0 },
        { x: 55, y: 650, angle: 30, scale: 1.2, delay: 1.3 },
        { x: 50, y: 820, angle: -25, scale: 0.85, delay: 1.6 },
      ]
    : [
        { x: 150, y: 150, angle: 35, scale: 0.9, delay: 0.4 },
        { x: 165, y: 320, angle: -45, scale: 1.1, delay: 0.7 },
        { x: 120, y: 480, angle: 40, scale: 1.0, delay: 1.0 },
        { x: 145, y: 650, angle: -30, scale: 1.2, delay: 1.3 },
        { x: 150, y: 820, angle: 25, scale: 0.85, delay: 1.6 },
      ];

  const thorns = isLeft
    ? [
        { d: 'M 52,190 Q 64,195 70,188', delay: 0.5 },
        { d: 'M 25,380 Q 15,388 12,382', delay: 0.8 },
        { d: 'M 75,510 Q 86,515 90,508', delay: 1.1 },
        { d: 'M 40,730 Q 30,736 28,730', delay: 1.4 },
      ]
    : [
        { d: 'M 148,190 Q 136,195 130,188', delay: 0.5 },
        { d: 'M 175,380 Q 185,388 188,382', delay: 0.8 },
        { d: 'M 125,510 Q 114,515 110,508', delay: 1.1 },
        { d: 'M 160,730 Q 170,736 172,730', delay: 1.4 },
      ];

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 200 1000"
        className="w-full h-full overflow-visible"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`leafGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2F5D3A" />
            <stop offset="60%" stopColor="#2F5D3A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0B1426" />
          </linearGradient>
        </defs>

        {/* Stem path that draws itself */}
        <motion.path
          d={stemPath}
          stroke="#2F5D3A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={((shouldReduceMotion ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 })) as any}
          whileInView={
            ((animateOnView
              ? { pathLength: 1, opacity: 0.85 }
              : undefined)) as any
          }
          viewport={{ once: false, amount: 0.15 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Thorns */}
        {thorns.map((thorn, idx) => (
          <motion.path
            key={idx}
            d={thorn.d}
            stroke="#2F5D3A"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={shouldReduceMotion ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.2 }}
            whileInView={animateOnView ? { opacity: 0.7, scale: 1 } : undefined}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: thorn.delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Leaves that unfurl after stem draws */}
        {leaves.map((leaf, idx) => (
          <motion.g
            key={idx}
            transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.angle}) scale(${leaf.scale})`}
            initial={
              shouldReduceMotion
                ? { scale: leaf.scale, opacity: 0.9 }
                : { scale: 0, opacity: 0 }
            }
            whileInView={
              animateOnView
                ? { scale: leaf.scale, opacity: 0.9 }
                : undefined
            }
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              delay: shouldReduceMotion ? 0 : leaf.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: '0px 0px' }}
          >
            {/* Leaf shape */}
            <path
              d="M 0,0 C 25,-25 55,-15 65,0 C 55,15 25,25 0,0 Z"
              fill={`url(#leafGrad-${side})`}
              stroke="#D9A441"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
            {/* Center vein */}
            <path
              d="M 0,0 Q 30,0 60,0"
              stroke="#D9A441"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
            {/* Side veins */}
            <path
              d="M 20,0 Q 30,-10 40,-12"
              stroke="#D9A441"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            <path
              d="M 20,0 Q 30,10 40,12"
              stroke="#D9A441"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
};
