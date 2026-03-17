import { useConstructorStore } from '@/store/constructorStore';
import { models } from '@/data/models';
import { Radio } from '@/components/ui';

export function StepModelSelect() {
  const { model, setModel } = useConstructorStore();
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-[var(--color-text)]">Выберите модель</h3>
      <div className="flex flex-col gap-3">
        {models.map((m) => (
          <Radio key={m.id} name="model" label={m.name} description={m.description} price={m.basePrice} checked={model === m.id} onChange={() => setModel(m.id)} />
        ))}
      </div>
    </div>
  );
}
