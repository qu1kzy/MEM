import { useConstructorStore } from '@/store/constructorStore';
import { StepModelSelect } from './StepModelSelect';
import { StepSpecs } from './StepSpecs';
import { StepServices } from './StepServices';
import { StepContacts } from './StepContacts';
import { ConstructorSidebar } from './ConstructorSidebar';
import { Button } from '@/components/ui';

const stepTitles = ['Модель', 'Характеристики', 'Услуги', 'Контакты'];

export function Constructor() {
  const { step, setStep } = useConstructorStore();

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="constructor">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 border-l-4 border-[var(--color-primary)] pl-5 text-[var(--color-text)]">Конструктор</h2>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        {stepTitles.map((title, i) => (
          <div key={title} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i + 1 <= step ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-glass)] text-[var(--color-text-muted)]'}`}>
              {i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${i + 1 <= step ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>{title}</span>
            {i < stepTitles.length - 1 && <div className={`flex-1 h-0.5 ${i + 1 < step ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`} />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {step === 1 && <StepModelSelect />}
          {step === 2 && <StepSpecs />}
          {step === 3 && <StepServices />}
          {step === 4 && <StepContacts />}

          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>← Назад</Button>
            {step < 4 && <Button variant="primary" onClick={() => setStep(Math.min(4, step + 1))}>Далее →</Button>}
          </div>
        </div>
        <ConstructorSidebar />
      </div>
    </section>
  );
}
