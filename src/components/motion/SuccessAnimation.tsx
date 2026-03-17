import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  onComplete?: () => void;
}

// Minimal checkmark animation data (inline to avoid external file dependency)
const checkmarkData = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: 'checkmark',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'circle',
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0] }, { t: 15, s: [100] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 20, s: [100, 100, 100] }] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'el',
          d: 1,
          s: { a: 0, k: [140, 140] },
          p: { a: 0, k: [0, 0] },
          nm: 'circle',
        },
        {
          ty: 'st',
          c: { a: 0, k: [0.133, 0.639, 0.294, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 6 },
          lc: 2,
          lj: 2,
          nm: 'stroke',
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'check',
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 15, s: [0] }, { t: 30, s: [100] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'sh',
          d: 1,
          ks: {
            a: 0,
            k: {
              c: false,
              v: [[-30, 0], [-10, 20], [30, -20]],
              i: [[0, 0], [0, 0], [0, 0]],
              o: [[0, 0], [0, 0], [0, 0]],
            },
          },
          nm: 'path',
        },
        {
          ty: 'st',
          c: { a: 0, k: [0.133, 0.639, 0.294, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 8 },
          lc: 2,
          lj: 2,
          nm: 'stroke',
        },
        {
          ty: 'tm',
          s: { a: 0, k: 0 },
          e: { a: 1, k: [{ t: 20, s: [0] }, { t: 40, s: [100] }] },
          o: { a: 0, k: 0 },
          m: 1,
          nm: 'trim',
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

export function SuccessAnimation({ onComplete }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="text-6xl text-[var(--color-cta)]">&#10003;</div>
        <p className="text-xl font-semibold text-[var(--color-text)]">Заявка отправлена!</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-4 py-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-32 h-32">
        <Lottie
          animationData={checkmarkData}
          loop={false}
          onComplete={onComplete}
        />
      </div>
      <motion.p
        className="text-xl font-semibold text-[var(--color-text)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        Заявка отправлена!
      </motion.p>
    </motion.div>
  );
}
