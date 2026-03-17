import { Button } from '@/components/ui';
import { AnimatedSection } from '@/components/motion';

export function CTASection() {
  const scrollToConstructor = () => {
    document.getElementById('constructor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatedSection>
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Готовы к автономности?
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
                Сконфигурируйте свой МЭМ в нашем конструкторе или свяжитесь с нами для консультации
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToConstructor}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-white text-[var(--color-primary)] hover:bg-white/90 transition-all duration-200 min-h-[52px] shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Оставить заявку
                </button>
                <button
                  onClick={() => { navigator.clipboard.writeText('+79119004477'); }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-200 min-h-[52px] backdrop-blur-sm"
                >
                  📞 Заказать звонок
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
