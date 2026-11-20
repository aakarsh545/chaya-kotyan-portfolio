import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface FlowerProps {
  type: 'trumpet' | 'blossom' | 'peach-blossom';
  size?: number;
  rotation?: number;
  seed?: number;
  delay?: number;
  className?: string;
  isOpen?: boolean;
}

export const Flower: React.FC<FlowerProps> = ({
  type = 'peach-blossom',
  size = 120,
  rotation = 0,
  seed = 1,
  delay = 0,
  className = '',
  isOpen = true,
}) => {
  const uid = useId().replace(/:/g, '') + `_${seed}`;
  const shouldReduceMotion = useReducedMotion();

  // Bloom transition: cubic-bezier(0.22, 1, 0.36, 1) over 1.4s
  const bloomEase = [0.22, 1, 0.36, 1];

  // Sway cycle: 6s - 9s
  const swayDuration = 6 + (seed % 4);

  return (
    <motion.div
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        transformOrigin: 'center center',
      }}
      animate={
        shouldReduceMotion
          ? { rotate: rotation, scale: 1, opacity: 1 }
          : {
              rotate: [rotation - 2, rotation + 2, rotation - 2],
            }
      }
      transition={{
        rotate: {
          duration: swayDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.5,
        },
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {type === 'peach-blossom' ? (
            <>
              {/* Luminous Peach-ish Pink Petal Gradient */}
              <radialGradient id={`peachPetal-${uid}`} cx="50%" cy="25%" r="75%">
                <stop offset="0%" stopColor="#FCEAE5" />
                <stop offset="45%" stopColor="#F4A896" />
                <stop offset="85%" stopColor="#E58774" />
                <stop offset="100%" stopColor="#D9A441" stopOpacity="0.8" />
              </radialGradient>
              {/* Core: Saree Blue & Gold */}
              <radialGradient id={`peachCore-${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D9A441" />
                <stop offset="40%" stopColor="#1F4E79" />
                <stop offset="100%" stopColor="#0B1426" />
              </radialGradient>
            </>
          ) : type === 'trumpet' ? (
            <>
              {/* Soft cream petal gradient with peach glow edge */}
              <radialGradient id={`trumpetPetal-${uid}`} cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#F6EBD9" />
                <stop offset="65%" stopColor="#FCEAE5" />
                <stop offset="100%" stopColor="#F4A896" stopOpacity="0.85" />
              </radialGradient>
              <radialGradient id={`throatGrad-${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D9A441" />
                <stop offset="70%" stopColor="#F4A896" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1F4E79" />
              </radialGradient>
            </>
          ) : (
            <>
              {/* Hibiscus petal radial gradient */}
              <radialGradient id={`blossomPetal-${uid}`} cx="50%" cy="25%" r="75%">
                <stop offset="0%" stopColor="#F4A896" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#E0728F" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1F4E79" stopOpacity="0.6" />
              </radialGradient>
              <radialGradient id={`blossomCore-${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D9A441" />
                <stop offset="45%" stopColor="#1F4E79" />
                <stop offset="100%" stopColor="#0B1426" />
              </radialGradient>
            </>
          )}
        </defs>

        {/* 5 Petals arranged symmetrically around (100, 100) */}
        {[0, 1, 2, 3, 4].map((index) => {
          const angle = index * 72;
          const petalDelay = shouldReduceMotion ? 0 : delay + index * 0.08;

          return (
            // The fixed rotation lives on a plain <g>. framer-motion writes its own CSS
            // `transform` onto motion elements, and CSS beats the SVG `transform` attribute,
            // so putting the rotation on the motion.g stacks every petal at 0°.
            <g key={index} transform={`rotate(${angle} 100 100)`}>
              <motion.g
                initial={
                  shouldReduceMotion
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.05, opacity: 0 }
                }
                animate={
                  isOpen
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.05, opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.4,
                  delay: petalDelay,
                  ease: bloomEase,
                }}
                // Grow out of the flower's centre. framer-motion ignores CSS transformOrigin
                // on SVG and uses originX/originY instead (strings are used verbatim).
                style={{ originX: '100px', originY: '100px' }}
              >
                {type === 'trumpet' ? (
                  // Broad overlapping cream trumpet petal
                  <g>
                    <path
                      d="M 100,100 C 60,65 55,20 100,8 C 145,20 140,65 100,100 Z"
                      fill={`url(#trumpetPetal-${uid})`}
                      stroke="#F4A896"
                      strokeWidth="0.8"
                      strokeOpacity="0.5"
                    />
                    {/* Fine vein strokes */}
                    <path
                      d="M 100,100 Q 100,50 100,20"
                      stroke="#D9A441"
                      strokeWidth="0.8"
                      strokeOpacity="0.5"
                      fill="none"
                    />
                    <path
                      d="M 100,75 Q 85,55 75,40"
                      stroke="#D9A441"
                      strokeWidth="0.5"
                      strokeOpacity="0.35"
                      fill="none"
                    />
                    <path
                      d="M 100,75 Q 115,55 125,40"
                      stroke="#D9A441"
                      strokeWidth="0.5"
                      strokeOpacity="0.35"
                      fill="none"
                    />
                  </g>
                ) : (
                  // Rounded peach/blossom petal
                  <g>
                    <path
                      d="M 100,100 C 55,75 50,26 100,14 C 150,26 145,75 100,100 Z"
                      fill={type === 'peach-blossom' ? `url(#peachPetal-${uid})` : `url(#blossomPetal-${uid})`}
                      stroke="#D9A441"
                      strokeWidth="0.6"
                      strokeOpacity="0.4"
                    />
                    {/* Delicate petal vein highlight */}
                    <path
                      d="M 100,100 Q 100,60 100,28"
                      stroke="#FCEAE5"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                      fill="none"
                    />
                    <path
                      d="M 100,70 Q 86,50 78,38"
                      stroke="#FCEAE5"
                      strokeWidth="0.5"
                      strokeOpacity="0.4"
                      fill="none"
                    />
                    <path
                      d="M 100,70 Q 114,50 122,38"
                      stroke="#FCEAE5"
                      strokeWidth="0.5"
                      strokeOpacity="0.4"
                      fill="none"
                    />
                  </g>
                )}
              </motion.g>
            </g>
          );
        })}

        {/* Center Core: Gold throat or Dark Core + Stamens */}
        {type === 'trumpet' ? (
          <motion.circle
            cx="100"
            cy="100"
            r="16"
            fill={`url(#throatGrad-${uid})`}
            initial={{ scale: 0.1, opacity: 0 }}
            animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0.1, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.2,
              delay: delay + 0.3,
              ease: bloomEase,
            }}
            style={{ transformOrigin: '100px 100px' }}
          />
        ) : (
          <motion.g
            initial={{ scale: 0.1, opacity: 0 }}
            animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0.1, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.2,
              delay: delay + 0.35,
              ease: bloomEase,
            }}
            style={{ transformOrigin: '100px 100px' }}
          >
            <circle
              cx="100"
              cy="100"
              r="14"
              fill={type === 'peach-blossom' ? `url(#peachCore-${uid})` : `url(#blossomCore-${uid})`}
            />
            {/* Stamens with gold tips */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((stamenAngle, sIdx) => {
              const rad = (stamenAngle * Math.PI) / 180;
              const x2 = 100 + Math.cos(rad) * 22;
              const y2 = 100 + Math.sin(rad) * 22;
              return (
                <g key={sIdx}>
                  <line
                    x1="100"
                    y1="100"
                    x2={x2}
                    y2={y2}
                    stroke="#D9A441"
                    strokeWidth="1.2"
                    strokeOpacity="0.85"
                  />
                  <circle cx={x2} cy={y2} r="2.2" fill="#D9A441" />
                </g>
              );
            })}
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
};
