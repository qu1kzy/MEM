import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/ToastContext';
import { contacts } from '@/data/contacts';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroSection() {
  const { toast } = useToast();
  const reduced = useReducedMotion();

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => toast(message, 'success'));
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-12 px-4"
      id="hero"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-surface)] to-[var(--color-bg)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[120px]" />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5">
            Многофункциональный Энергетический Модуль
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-wider uppercase mb-4"
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-[var(--color-text)]">М</span>
          <span className="text-[var(--color-primary)] drop-shadow-[0_0_30px_var(--color-primary-glow)]">Э</span>
          <span className="text-[var(--color-text)]">М</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-[var(--color-text-muted)] font-light tracking-[0.3em] uppercase mb-12"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          Вода · Тепло · Электричество
        </motion.p>

        <motion.div
          className="relative max-w-2xl mx-auto mb-12"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cta)] opacity-20 blur-lg" />
          <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-2xl">
            <img
              src="/images/product.jpg"
              alt="Многофункциональный Энергетический Модуль МЭМ"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {contacts.map((c, i) => (
            <motion.button
              key={c.value}
              onClick={() => copyToClipboard(c.copyText, c.copyMessage)}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[0_0_20px_var(--color-primary-glow)] hover:-translate-y-0.5 transition-all duration-300 text-[var(--color-text)] min-h-[44px]"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            >
              <span className="text-lg">
                {c.icon === 'phone' && '📞'}
                {c.icon === 'envelope' && '✉️'}
                {c.icon === 'telegram' && '💬'}
                {c.icon === 'location' && '📍'}
              </span>
              <span className="text-sm font-medium">{c.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-[var(--color-text-muted)] flex justify-center pt-2"
            animate={reduced ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <div className="w-1 h-2 rounded-full bg-[var(--color-text-muted)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
