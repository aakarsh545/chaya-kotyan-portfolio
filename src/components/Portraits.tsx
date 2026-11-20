import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { content } from '../content';
import { Flower } from './Flower';

// Page content. Photos are keyed by file number, and each has its own caption.
type PageContent =
  | { kind: 'cover' }
  | { kind: 'endpaper' }
  | { kind: 'closing' }
  | { kind: 'intro' }
  | { kind: 'photos'; ids: string[] };

interface SheetDef {
  front: PageContent; // right-hand side of the sheet
  back: PageContent; // left-hand side of the sheet
}

// One photo per page. Two pages show at once: the left is the back of one leaf, the right the front of the next.
const photo = (id: string): PageContent => ({ kind: 'photos', ids: [id] });
const SHEETS: SheetDef[] = [
  { front: { kind: 'cover' }, back: { kind: 'endpaper' } },
  { front: { kind: 'intro' }, back: photo('03') },
  { front: photo('12'), back: photo('01') },
  { front: photo('02'), back: photo('05') },
  { front: photo('06'), back: photo('07') },
  { front: photo('08'), back: photo('09') },
  { front: photo('10'), back: photo('11') },
  { front: { kind: 'closing' }, back: { kind: 'endpaper' } },
];
const SHEET_COUNT = SHEETS.length;

const PageFace: React.FC<{
  page: PageContent;
  side: 'left' | 'right';
  onPick: (id: string) => void;
}> = ({ page, side, onPick }) => {
  const spine = side === 'right' ? 'spine-right' : 'spine-left';
  const book = content.portraits.bookCover;

  if (page.kind === 'cover') {
    return (
      <div className="paper-cover flex h-full w-full flex-col justify-between p-[8%] text-[#141414]">
        <div
          className="flex justify-between font-sans uppercase tracking-[0.3em]"
          style={{ fontSize: 'max(8px, calc(var(--pw) * 0.034))' }}
        >
          <span>{book.topLeft}</span>
          <span>{book.topRight}</span>
        </div>
        <div
          className="font-sans font-medium uppercase leading-[1.08] tracking-[0.3em]"
          style={{ fontSize: 'max(14px, calc(var(--pw) * 0.1))' }}
        >
          {book.title.split(' ').map((word) => (
            <div key={word}>{word}</div>
          ))}
        </div>
        <div className="grid w-fit grid-cols-4 gap-[calc(var(--pw)*0.045)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="block rounded-full border border-[#141414]/70"
              style={{ width: 'max(4px, calc(var(--pw) * 0.03))', height: 'max(4px, calc(var(--pw) * 0.03))' }}
            />
          ))}
        </div>
        <div
          className="flex justify-between font-sans uppercase tracking-[0.25em]"
          style={{ fontSize: 'max(7px, calc(var(--pw) * 0.03))' }}
        >
          <span>{book.bottomLeft}</span>
          <span>{book.bottomRight}</span>
        </div>
      </div>
    );
  }

  if (page.kind === 'endpaper') {
    return <div className={`paper h-full w-full ${spine}`} />;
  }

  if (page.kind === 'closing') {
    // The last page of the book, so it is not left blank
    return (
      <div className={`paper flex h-full w-full flex-col items-center justify-center p-[10%] text-center ${spine}`}>
        <span
          className="font-pinyon text-saree"
          style={{ fontSize: 'max(20px, calc(var(--pw) * 0.13))' }}
        >
          {content.closing.back.signature}
        </span>
        <p
          className="mt-[6%] font-editorial italic text-midnight/80"
          style={{ fontSize: 'max(10px, calc(var(--pw) * 0.05))' }}
        >
          {content.closing.back.note}
        </p>
      </div>
    );
  }

  if (page.kind === 'intro') {
    return (
      <div className={`paper flex h-full w-full flex-col items-center justify-center p-[10%] text-center ${spine}`}>
        <span
          className="font-sans font-semibold uppercase tracking-[0.3em] text-saree"
          style={{ fontSize: 'max(8px, calc(var(--pw) * 0.036))' }}
        >
          {content.portraits.label}
        </span>
        <h2
          className="mt-[6%] font-bodoni font-normal text-midnight"
          style={{ fontSize: 'max(24px, calc(var(--pw) * 0.15))' }}
        >
          {content.portraits.title}
        </h2>
        <div className="my-[7%] h-px w-[28%] bg-peach" />
        <p
          className="font-editorial italic text-saree/85"
          style={{ fontSize: 'max(11px, calc(var(--pw) * 0.055))' }}
        >
          {content.portraits.subtitle}
        </p>
        <p
          className="absolute bottom-[6%] font-sans uppercase tracking-[0.25em] text-peach-deep"
          style={{ fontSize: 'max(7px, calc(var(--pw) * 0.03))' }}
        >
          {content.cover.scrollCue} &darr;
        </p>
      </div>
    );
  }

  // Photo page: one photo that fills the page, with a thin paper margin and a bevelled edge.
  const id = page.ids[0];
  return (
    <div className={`paper flex h-full w-full items-center justify-center p-[5%] ${spine}`}>
      <button
        type="button"
        onClick={() => onPick(id)}
        className="photo-bevel relative h-full w-full cursor-zoom-in overflow-hidden bg-midnight"
      >
        <img
          src={`/assets/photos/photo-${id}.webp`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 22%' }}
        />
      </button>
    </div>
  );
};

// One leaf of the book. It turns on its left edge (the spine):
// 0deg is lying on the right, 180deg is lying on the left.
const Sheet: React.FC<{
  index: number;
  def: SheetDef;
  progress: MotionValue<number>;
  onPick: (id: string) => void;
}> = ({ index, def, progress, onPick }) => {
  const angle = useTransform(progress, [index / SHEET_COUNT, (index + 1) / SHEET_COUNT], [0, 180]);
  const rotateY = useTransform(angle, (a) => -a);
  // Flipped leaves stack above the leaves still waiting on the right.
  const z = useTransform(angle, (a) => (a >= 90 ? index * 0.6 + 0.3 : (SHEET_COUNT - index) * 0.6));
  // A little shadow falls on the leaf while it is turning.
  const shade = useTransform(angle, [0, 90, 180], [0, 0.22, 0]);

  return (
    <motion.div
      className="absolute left-1/2 top-0 h-full"
      style={{
        width: 'var(--pw)',
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        rotateY,
        z,
      }}
    >
      <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
        <PageFace page={def.front} side="right" onPick={onPick} />
        <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
      </div>
      <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
        <PageFace page={def.back} side="left" onPick={onPick} />
        <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
      </div>
    </motion.div>
  );
};

export const Portraits: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // The closed book sits on the right half, so shift it left to centre it.
  // Once the cover opens it centres on the spine, and at the end it shifts
  // right to centre the last left-hand page.
  const firstAngle = useTransform(progress, [0, 1 / SHEET_COUNT], [0, 180]);
  const lastAngle = useTransform(progress, [(SHEET_COUNT - 1) / SHEET_COUNT, 1], [0, 180]);
  const shift = useTransform([firstAngle, lastAngle], ([f, l]: number[]) => {
    const amount = -0.5 * (1 - f / 180) + 0.5 * (l / 180);
    return `translateX(calc(var(--pw) * ${amount.toFixed(4)}))`;
  });

  return (
    <section className="relative w-full peach-wash-portraits text-midnight pt-12 md:pt-24 border-b border-peach/40 overflow-x-clip">
      {/* Decorative blooming flower accents along the margins. Sit behind the book. */}
      <div className="absolute top-8 -right-8 pointer-events-none opacity-85">
        <Flower type="peach-blossom" size={130} rotation={20} seed={11} />
      </div>
      <div className="absolute top-1/3 -left-8 pointer-events-none opacity-80">
        <Flower type="peach-blossom" size={120} rotation={-30} seed={12} />
      </div>

      {/* SECTION INTRO */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-saree uppercase font-semibold block">
          {content.portraits.label}
        </span>
        <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-midnight mt-1 font-normal">
          {content.portraits.title}
        </h2>
        <div className="w-16 h-0.5 bg-peach mx-auto my-3" />
        <p className="font-editorial italic text-base sm:text-lg text-saree/85 max-w-md mx-auto">
          {content.portraits.subtitle}
        </p>
      </div>

      {/* The book. The section is tall; the book itself stays pinned while you scroll. */}
      <div ref={wrapRef} className="relative h-[750vh]">
        <div
          className="book-size sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden"
          style={{ perspective: '2200px' }}
        >
          <div className="relative" style={{ width: 'calc(var(--pw) * 2)', height: 'calc(var(--pw) * var(--ratio))' }}>
            <div
              className="pointer-events-none absolute -bottom-6 left-[6%] right-[6%] h-6 rounded-[50%] blur-[10px]"
              style={{ background: 'radial-gradient(ellipse, rgba(60,30,25,0.45), transparent 70%)' }}
            />
            <motion.div className="absolute inset-0" style={{ transform: shift, transformStyle: 'preserve-3d' }}>
              {/* Uncut page block under the right side, so the book has thickness */}
              <div
                className="paper-stack absolute left-1/2 top-0 h-full"
                style={{ width: 'var(--pw)', transform: 'translateZ(-2px)' }}
              />
              {SHEETS.map((def, i) => (
                <Sheet key={i} index={i} def={def} progress={progress} onPick={setActiveId} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* FULL-SIZE VIEW OF ONE PHOTO */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActiveId(null)}
          >
            <button
              onClick={() => setActiveId(null)}
              className="absolute top-5 right-5 p-3 text-peach hover:text-cream transition-colors z-20 font-sans text-xs tracking-[0.2em] uppercase"
              aria-label={content.portraits.lightboxClose}
            >
              {content.portraits.lightboxClose}
            </button>
            <motion.div
              className="relative max-w-lg max-h-[85vh] w-full flex flex-col items-center"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative border-2 border-peach/70 p-2 bg-midnight shadow-2xl">
                <img
                  src={`/assets/photos/photo-${activeId}.webp`}
                  alt=""
                  className="max-h-[72vh] w-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
