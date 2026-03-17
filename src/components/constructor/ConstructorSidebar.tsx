import { useConstructorStore } from '@/store/constructorStore';
import { models } from '@/data/models';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/ToastContext';

export function ConstructorSidebar() {
  const store = useConstructorStore();
  const { user } = useAuth();
  const { toast } = useToast();
  const modelLabel = models.find(m => m.id === store.model)?.name ?? '';
  const modelPrice = models.find(m => m.id === store.model)?.basePrice ?? 0;
  const discount = store.getDiscount();
  const total = store.getTotal();

  const handleSaveDraft = async () => {
    if (!user) { toast('Войдите для сохранения черновика', 'warning'); return; }
    try { await store.saveDraft(user.id); toast('Черновик сохранён', 'success'); } catch { toast('Ошибка сохранения', 'error'); }
  };

  const handleSubmit = async () => {
    try { await store.submitOrder(user?.id); toast('Заявка отправлена!', 'success'); } catch { toast('Ошибка отправки', 'error'); }
  };

  return (
    <aside className="w-full lg:w-80 lg:sticky lg:top-24 self-start">
      <div className="relative">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-cta)] opacity-20" />
        <div className="relative rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
          <h3 className="text-lg font-bold mb-1 text-[var(--color-text)]">Ваш МЭМ</h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-5">Сводка конфигурации</p>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-text-muted)]">Модель: {modelLabel}</span>
              <span className="font-semibold text-[var(--color-text)]">{modelPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            {store.selectedSpecs.map(s => (
              <div key={s.id} className="flex justify-between items-center">
                <span className="text-[var(--color-text-muted)]">{s.label}</span>
                <span className="font-medium text-[var(--color-text)]">+{s.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            ))}
            {store.selectedServices.map(s => (
              <div key={s.id} className="flex justify-between items-center">
                <span className="text-[var(--color-text-muted)]">{s.label}</span>
                <span className="font-medium text-[var(--color-text)]">+{s.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            ))}
            {store.promo && (
              <div className="flex justify-between items-center text-[var(--color-cta)]">
                <span>Промокод ({store.promo.code})</span>
                <span className="font-semibold">-{discount.toLocaleString('ru-RU')} ₽</span>
              </div>
            )}
          </div>

          <div className="my-5 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-[var(--color-text)]">Итого</span>
            <span className="text-2xl font-bold text-[var(--color-primary)]">{total.toLocaleString('ru-RU')} ₽</span>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button variant="outline" fullWidth onClick={handleSaveDraft}>
              Сохранить в ЛК
            </Button>
            <Button variant="cta" fullWidth onClick={handleSubmit} loading={store.isSubmitting}>
              Оформить заявку
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
