import { useConstructorStore } from '@/store/constructorStore';
import { serviceOptions } from '@/data/constructorOptions';
import { Checkbox } from '@/components/ui';

export function StepServices() {
  const { selectedServices, toggleService } = useConstructorStore();
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-[var(--color-text)]">Услуги</h3>
      <div className="flex flex-col gap-3">
        {serviceOptions.map((svc) => (
          <Checkbox key={svc.id} label={svc.label} description={svc.description} price={svc.price}
            checked={selectedServices.some(s => s.id === svc.id)} onChange={() => toggleService(svc)} />
        ))}
      </div>
    </div>
  );
}
