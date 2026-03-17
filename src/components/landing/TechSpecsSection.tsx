import { motion } from 'framer-motion';
import { specs } from '@/data/specs';
import { AnimatedSection, StaggerChildren, staggerItem } from '@/components/motion';

const specIcons = ['📐', '⚖️', '🏋️', '💧'];

export function TechSpecsSection() {
  return (
    <AnimatedSection>
      <section className="py-24 px-4" id="specs">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 mb-4">
              Спецификации
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
              Характеристики
            </h2>
            <p className="mt-3 text-[var(--color-text-muted)] max-w-xl mx-auto">
              Компактный модуль с впечатляющими параметрами
            </p>
          </div>
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {specs.map((s, i) => (
              <motion.div key={s.label} variants={staggerItem}>
                <div className="relative group rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-primary)] hover:shadow-[0_8px_40px_var(--color-primary-glow)]">
                  <div className="text-3xl mb-4">{specIcons[i]}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-2">{s.value}</div>
                  <div className="text-[var(--color-primary)] font-semibold uppercase text-xs tracking-wider">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </AnimatedSection>
  );
}
