import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Flower } from './Flower';
import { Vine } from './Vine';

interface DriftingPetal {
  id: number;
  startX: number; // percentage (5% - 95%)
  duration: number; // 8 - 14s
  delay: number; // 0 - 6s
  size: number; // 18 - 32px
  type: 'cream' | 'hibiscus';
  rotationStart: number;
  rotationEnd: number;
  swayDistance: number;
}

export const Garden: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Parallax offsets for depth layers
  const yDepthForeground = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yDepthMidground = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yDepthBackground = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Generate 8 drifting petals (within 6-10 specified)
  const driftingPetals: DriftingPetal[] = useMemo(
    () => [
      { id: 1, startX: 12, duration: 11, delay: 0.5, size: 24, type: 'hibiscus', rotationStart: 10, rotationEnd: 190, swayDistance: 45 },
      { id: 2, startX: 28, duration: 13, delay: 2.5, size: 28, type: 'cream', rotationStart: -30, rotationEnd: 150, swayDistance: 50 },
      { id: 3, startX: 48, duration: 9.5, delay: 4.2, size: 20, type: 'hibiscus', rotationStart: 45, rotationEnd: 240, swayDistance: 35 },
      { id: 4, startX: 62, duration: 12.5, delay: 1.0, size: 26, type: 'cream', rotationStart: -15, rotationEnd: 165, swayDistance: 60 },
      { id: 5, startX: 76, duration: 10.5, delay: 3.2, size: 22, type: 'hibiscus', rotationStart: 25, rotationEnd: 215, swayDistance: 40 },
      { id: 6, startX: 88, duration: 14, delay: 5.0, size: 30, type: 'cream', rotationStart: -45, rotationEnd: 135, swayDistance: 55 },
      { id: 7, startX: 20, duration: 11.5, delay: 6.5, size: 23, type: 'cream', rotationStart: 60, rotationEnd: 260, swayDistance: 48 },
      { id: 8, startX: 70, duration: 10.0, delay: 7.2, size: 25, type: 'hibiscus', rotationStart: -20, rotationEnd: 180, swayDistance: 42 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {/* Golden hour ambient backdrop glow */}
      <div className="absolute inset-0 golden-hour-glow opacity-80" />

      {/* Vines running along borders */}
      <div className="absolute -left-6 top-0 bottom-0 w-32 md:w-48 opacity-45">
        <Vine side="left" />
      </div>
      <div className="absolute -right-6 top-1/4 bottom-0 w-32 md:w-48 opacity-45">
        <Vine side="right" />
      </div>

      {/* BACKGROUND LAYER (Blurred, deepest, slow parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: shouldReduceMotion ? 0 : yDepthBackground }}
      >
        {/* Top left deep blurred trumpet flower */}
        <div className="absolute -top-10 -left-10 filter blur-[6px] opacity-40">
          <Flower type="trumpet" size={170} rotation={-25} seed={101} delay={0.2} />
        </div>
        {/* Bottom right deep blurred blossom */}
        <div className="absolute -bottom-16 -right-12 filter blur-[7px] opacity-35">
          <Flower type="blossom" size={180} rotation={40} seed={102} delay={0.4} />
        </div>
      </motion.div>

      {/* MIDGROUND LAYER (Moderate blur, gentle parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: shouldReduceMotion ? 0 : yDepthMidground }}
      >
        {/* Upper right blossom */}
        <div className="absolute top-24 -right-10 filter blur-[2px] opacity-65 md:opacity-75">
          <Flower type="blossom" size={120} rotation={-15} seed={201} delay={0.5} />
        </div>
        {/* Mid-left trumpet */}
        <div className="absolute top-[45%] -left-8 filter blur-[1.5px] opacity-70">
          <Flower type="trumpet" size={130} rotation={35} seed={202} delay={0.7} />
        </div>
        {/* Mid-right small blossom */}
        <div className="absolute top-[60%] -right-6 opacity-60">
          <Flower type="blossom" size={90} rotation={-45} seed={203} delay={0.9} />
        </div>
        {/* Lower left trumpet */}
        <div className="absolute bottom-28 -left-10 filter blur-[2px] opacity-65">
          <Flower type="trumpet" size={135} rotation={20} seed={204} delay={1.1} />
        </div>
      </motion.div>

      {/* FOREGROUND LAYER (Crisp & large blurred foreground depth frames) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: shouldReduceMotion ? 0 : yDepthForeground }}
      >
        {/* Top edge small accent trumpet */}
        <div className="absolute top-3 left-[28%] opacity-55">
          <Flower type="trumpet" size={80} rotation={75} seed={301} delay={0.3} />
        </div>
        {/* Bottom edge accent blossom */}
        <div className="absolute bottom-4 left-[35%] opacity-60">
          <Flower type="blossom" size={85} rotation={-30} seed={302} delay={0.8} />
        </div>
        {/* Ultra-foreground macro blurred corner flower (magazine depth effect) */}
        <div className="absolute -bottom-14 -left-14 filter blur-[10px] opacity-50 scale-125">
          <Flower type="blossom" size={190} rotation={-60} seed={303} delay={0.2} />
        </div>
        {/* Ultra-foreground macro blurred top corner */}
        <div className="absolute -top-16 -right-14 filter blur-[10px] opacity-45 scale-125">
          <Flower type="trumpet" size={190} rotation={50} seed={304} delay={0.4} />
        </div>
      </motion.div>

      {/* 6-10 DRIFTING PETALS (Never confetti; slow, organic falling flower petals) */}
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
                opacity: [0, 0.75, 0.8, 0.6, 0],
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
                    petal.type === 'hibiscus'
                      ? 'rgba(224, 114, 143, 0.7)'
                      : 'rgba(246, 235, 217, 0.65)'
                  }
                  stroke={petal.type === 'hibiscus' ? '#1F4E79' : '#D9A441'}
                  strokeWidth="0.6"
                  strokeOpacity="0.4"
                />
                {/* Petal spine vein */}
                <path
                  d="M 20,8 Q 20,26 20,44"
                  stroke={petal.type === 'hibiscus' ? '#F6EBD9' : '#D9A441'}
                  strokeWidth="0.6"
                  strokeOpacity="0.4"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
