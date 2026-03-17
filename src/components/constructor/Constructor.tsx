import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useConstructorStore } from '@/store/constructorStore';
import { StepModelSelect } from './StepModelSelect';
import { StepSpecs } from './StepSpecs';
import { StepServices } from './StepServices';
import { StepContacts } from './StepContacts';
import { ConstructorSidebar } from './ConstructorSidebar';
import { Button } from '@/components/ui';
import { StepTransition } from '@/components/motion';

const stepTitles = ['Модель', 'Характеристики', 'Услуги', 'Контакты'];

export function Constructor() {
  const { step, setStep } = useConstructorStore();
  const [direction, setDirection] = useState<1 | -1>(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep(Math.min(4, step + 1));
  }, [step, setStep]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep(Math.max(1, step - 1));
  }, [step, setStep]);

  return (
    <section className="py-24 px-4 bg-[var(--color-surface)]/30" id="constructor">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 mb-4">
            Конфигуратор
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
            Соберите свой МЭМ
          </h2>
          <p className="mt-3 text-[var(--color-text-muted)] max-w-xl mx-auto">
            4 простых шага для создания идеальной конфигурации
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-0 mb-12 max-w-2xl mx-auto" aria-label="Прогресс конструктора" role="group">
          {stepTitles.map((title, i) => (
            <div key={title} className="flex items-center flex-1 last:flex-none" {...(i + 1 === step ? { 'aria-current': 'step' as const } : {})}>
              <button
                onClick={() => { setDirection(i + 1 > step ? 1 : -1); setStep(i + 1); }}
                className="flex flex-col items-center gap-2 relative z-10"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i + 1 < step
                    ? 'bg-[var(--color-cta)] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : i + 1 === step
                    ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_var(--color-primary-glow)] scale-110'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-2 border-[var(--color-border)]'
                }`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block transition-colors ${
                  i + 1 <= step ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'
                }`}>{title}</span>
              </button>
              {i < stepTitles.length - 1 && (
                <div className="flex-1 h-1 mx-2 rounded-full bg-[var(--color-border)] overflow-hidden relative -top-3 sm:-top-1">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-cta)] to-[var(--color-primary)]"
                    initial={false}
                    animate={{ width: i + 1 < step ? '100%' : '0%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8">
              <StepTransition stepKey={step} direction={direction}>
                {step === 1 && <StepModelSelect />}
                {step === 2 && <StepSpecs />}
                {step === 3 && <StepServices />}
                {step === 4 && <StepContacts />}
              </StepTransition>

              <div className="flex justify-between mt-8 pt-6 border-t border-[var(--color-border)]">
                <Button variant="ghost" onClick={goBack} disabled={step === 1}>
                  &larr; Назад
                </Button>
                {step < 4 && (
                  <Button variant="primary" onClick={goNext}>
                    Далее &rarr;
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <ConstructorSidebar />
        </div>
      </div>
    </section>
  );
}
