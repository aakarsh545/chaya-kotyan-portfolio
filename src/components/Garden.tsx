import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Flower } from './Flower';
import { Vine } from './Vine';

interface DriftingPetal {
  id: number;
  startX: number;
  duration: number;
  delay: number;
  size: number;
  type: 'peach' | 'cream';
  rotationStart: number;
  rotationEnd: number;
  swayDistance: number;
}

export const Garden: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Parallax offsets for depth layers
  const yDepthForeground = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yDepthMidground = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yDepthBackground = useTransform(scrollYProgress, [0, 1], [0, -35]);

  // 8 drifting petals revolving around peach-ish pink & golden cream
  const driftingPetals: DriftingPetal[] = useMemo(
    () => [
      { id: 1, startX: 10, duration: 10.5, delay: 0.2, size: 26, type: 'peach', rotationStart: 15, rotationEnd: 195, swayDistance: 45 },
      { id: 2, startX: 25, duration: 12.5, delay: 2.0, size: 28, type: 'cream', rotationStart: -30, rotationEnd: 150, swayDistance: 50 },
      { id: 3, startX: 42, duration: 9.0, delay: 3.5, size: 22, type: 'peach', rotationStart: 40, rotationEnd: 240, swayDistance: 35 },
      { id: 4, startX: 58, duration: 11.5, delay: 0.8, size: 25, type: 'cream', rotationStart: -15, rotationEnd: 165, swayDistance: 55 },
      { id: 5, startX: 72, duration: 10.0, delay: 2.8, size: 24, type: 'peach', rotationStart: 25, rotationEnd: 215, swayDistance: 40 },
      { id: 6, startX: 86, duration: 13.0, delay: 4.5, size: 30, type: 'peach', rotationStart: -45, rotationEnd: 135, swayDistance: 50 },
      { id: 7, startX: 20, duration: 11.0, delay: 5.5, size: 23, type: 'cream', rotationStart: 55, rotationEnd: 255, swayDistance: 45 },
      { id: 8, startX: 68, duration: 9.5, delay: 6.2, size: 27, type: 'peach', rotationStart: -20, rotationEnd: 180, swayDistance: 40 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {/* Vivid Colorful Peach-Pink & Indigo Ambient Background Glows */}
      <div className="absolute top-0 left-0 right-0 h-[600px] peach-wash-top pointer-events-none opacity-85" />
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full peach-orb-1 filter blur-[90px] pointer-events-none opacity-70" />
      <div className="absolute top-2/3 -right-20 w-[450px] h-[450px] rounded-full peach-orb-2 filter blur-[100px] pointer-events-none opacity-60" />

      {/* Living Green & Saree Blue Vines Framing Mobile Edges */}
      <div className="absolute -left-5 top-0 bottom-0 w-28 md:w-44 opacity-50">
        <Vine side="left" />
      </div>
      <div className="absolute -right-5 top-1/4 bottom-0 w-28 md:w-44 opacity-50">
        <Vine side="right" />
      </div>

      {/* BACKGROUND LAYER (Blurred, deepest, slow parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: shouldReduceMotion ? 0 : yDepthBackground }}
      >
        {/* Top left deep blurred blooming peach flower */}
        <div className="absolute -top-8 -left-8 filter blur-[5px] opacity-75">
          <Flower type="peach-blossom" size={160} rotation={-20} seed={101} delay={0.2} />
        </div>
        {/* Bottom right deep blurred blossom */}
        <div className="absolute -bottom-12 -right-10 filter blur-[6px] opacity-70">
          <Flower type="trumpet" size={170} rotation={35} seed={102} delay={0.4} />
        </div>
      </motion.div>

      {/* MIDGROUND LAYER (Moderate blur, gentle parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: shouldReduceMotion ? 0 : yDepthMidground }}
      >
        {/* Upper right blooming peach blossom */}
        <div className="absolute top-20 -right-8 filter blur-[1.5px] opacity-85">
          <Flower type="peach-blossom" size={125} rotation={-15} seed={201} delay={0.5} />
        </div>
        {/* Mid-left trumpet */}
        <div className="absolute top-[42%] -left-8 filter blur-[1px] opacity-80">
          <Flower type="trumpet" size={120} rotation={30} seed={202} delay={0.7} />
        </div>
        {/* Mid-right peach flower */}
        <div className="absolute top-[62%] -right-6 opacity-75">
          <Flower type="peach-blossom" size={105} rotation={-35} seed={203} delay={0.9} />
        </div>
        {/* Lower left peach flower */}
        <div className="absolute bottom-24 -left-8 filter blur-[1.5px] opacity-80">
          <Flower type="peach-blossom" size={130} rotation={15} seed={204} delay={1.1} />
        </div>
      </motion.div>

      {/* FOREGROUND LAYER (Crisp & large blooming flowers) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: shouldReduceMotion ? 0 : yDepthForeground }}
      >
        {/* Top edge accent blooming flower */}
        <div className="absolute top-2 left-[20%] opacity-75">
          <Flower type="peach-blossom" size={85} rotation={60} seed={301} delay={0.3} />
        </div>
        {/* Bottom edge accent peach blossom */}
        <div className="absolute bottom-3 left-[30%] opacity-80">
          <Flower type="peach-blossom" size={90} rotation={-25} seed={302} delay={0.7} />
        </div>
        {/* Macro blurred corner peach flower */}
        <div className="absolute -bottom-12 -left-12 filter blur-[8px] opacity-65 scale-125">
          <Flower type="peach-blossom" size={180} rotation={-50} seed={303} delay={0.2} />
        </div>
        {/* Macro blurred top corner */}
        <div className="absolute -top-14 -right-12 filter blur-[8px] opacity-60 scale-125">
          <Flower type="trumpet" size={180} rotation={45} seed={304} delay={0.4} />
        </div>
      </motion.div>

      {/* 8 DRIFTING PETALS (Peach-pink & Cream) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {driftingPetals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute top-0 pointer-events-none"
              style={{ left: `${petal.startX}%` }}
              initial={{
                y: -60,
                x: 0,
                rotate: petal.rotationStart,
                opacity: 0,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [
                  0,
                  petal.swayDistance,
                  -petal.swayDistance * 0.7,
                  petal.swayDistance * 0.5,
                  0,
                ],
                rotate: [petal.rotationStart, petal.rotationEnd],
                opacity: [0, 0.85, 0.9, 0.7, 0],
              }}
              transition={{
                duration: petal.duration,
                repeat: Infinity,
                delay: petal.delay,
                ease: 'easeInOut',
              }}
            >
              <svg
                width={petal.size}
                height={petal.size * 1.3}
                viewBox="0 0 40 52"
                fill="none"
              >
                <path
                  d="M 20,2 C 34,12 38,36 20,50 C 2,36 6,12 20,2 Z"
                  fill={
                    petal.type === 'peach'
                      ? 'rgba(244, 168, 150, 0.82)'
                      : 'rgba(246, 235, 217, 0.75)'
                  }
                  stroke={petal.type === 'peach' ? '#D9A441' : '#E58774'}
                  strokeWidth="0.7"
                  strokeOpacity="0.5"
                />
                <path
                  d="M 20,8 Q 20,26 20,44"
                  stroke={petal.type === 'peach' ? '#FCEAE5' : '#D9A441'}
                  strokeWidth="0.6"
                  strokeOpacity="0.45"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
