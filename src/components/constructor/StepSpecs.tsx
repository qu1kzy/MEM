import { useConstructorStore } from '@/store/constructorStore';
import { specOptions } from '@/data/constructorOptions';
import { Checkbox } from '@/components/ui';

export function StepSpecs() {
  const { selectedSpecs, toggleSpec } = useConstructorStore();
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-[var(--color-text)]">Характеристики</h3>
      <div className="flex flex-col gap-3">
        {specOptions.map((spec) => (
          <Checkbox key={spec.id} label={spec.label} description={spec.description} price={spec.price}
            checked={selectedSpecs.some(s => s.id === spec.id)} onChange={() => toggleSpec(spec)} />
        ))}
      </div>
    </div>
  );
}
