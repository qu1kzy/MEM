import { motion } from 'framer-motion';
import { features } from '@/data/features';
import { AnimatedSection, StaggerChildren, staggerItem } from '@/components/motion';

const iconMap: Record<string, string> = {
  bolt: '⚡', 'fire-extinguisher': '🧯', droplet: '💧', truck: '🚛', snowflake: '❄️', leaf: '🌿',
};

export function FeaturesSection() {
  return (
    <AnimatedSection>
      <section className="py-24 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 mb-4">
              Функционал
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
              Возможности МЭМ
            </h2>
            <p className="mt-3 text-[var(--color-text-muted)] max-w-xl mx-auto">
              Полная автономность в одном модуле — от водоснабжения до электричества
            </p>
          </div>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div key={f.title} variants={staggerItem}>
                <div className="group relative rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-primary)] hover:shadow-[0_8px_40px_var(--color-primary-glow)] h-full">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    {iconMap[f.icon] || '🔧'}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-[var(--color-text)]">{f.title}</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed text-[0.938rem]">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </AnimatedSection>
  );
}
