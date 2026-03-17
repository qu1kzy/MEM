import { Button } from '@/components/ui';
import { AnimatedSection } from '@/components/motion';

export function CTASection() {
  const scrollToConstructor = () => {
    document.getElementById('constructor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatedSection>
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--color-text)]">Готовы к автономности?</h2>
        <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto">
          Сконфигурируйте свой МЭМ в нашем конструкторе или свяжитесь с нами для консультации.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cta" size="lg" onClick={scrollToConstructor}>Оставить заявку</Button>
          <Button variant="cta" size="lg" onClick={() => { navigator.clipboard.writeText('+79119004477'); }}>Заказать звонок</Button>
        </div>
      </section>
    </AnimatedSection>
  );
}
