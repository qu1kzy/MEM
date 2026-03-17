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
  const basePrice = store.getBasePrice();
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
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
        <h3 className="text-lg font-bold mb-4 text-[var(--color-text)]">Ваш МЭМ</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Модель: {modelLabel}</span><span className="font-medium">{basePrice.toLocaleString('ru-RU')} ₽</span></div>
          {store.selectedSpecs.map(s => (
            <div key={s.id} className="flex justify-between"><span className="text-[var(--color-text-muted)]">{s.label}</span><span className="font-medium">+{s.price.toLocaleString('ru-RU')} ₽</span></div>
          ))}
          {store.selectedServices.map(s => (
            <div key={s.id} className="flex justify-between"><span className="text-[var(--color-text-muted)]">{s.label}</span><span className="font-medium">+{s.price.toLocaleString('ru-RU')} ₽</span></div>
          ))}
          {store.promo && (
            <div className="flex justify-between text-[var(--color-cta)]">
              <span>Промокод ({store.promo.code})</span>
              <span>-{discount.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}
        </div>
        <hr className="my-4 border-[var(--color-border)]" />
        <div className="flex justify-between text-lg font-bold">
          <span className="text-[var(--color-text)]">Итого</span>
          <span className="text-[var(--color-primary)]">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button variant="outline" fullWidth onClick={handleSaveDraft}>Сохранить в ЛК</Button>
          <Button variant="cta" fullWidth onClick={handleSubmit} loading={store.isSubmitting}>Оформить заявку</Button>
        </div>
      </div>
    </aside>
  );
}
