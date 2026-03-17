import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  stepKey: number;
  direction?: 1 | -1;
  children: React.ReactNode;
}

export function StepTransition({ stepKey, direction = 1, children }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div key={stepKey}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={stepKey}
        custom={direction}
        initial={{ opacity: 0, x: direction * 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction * -60 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
