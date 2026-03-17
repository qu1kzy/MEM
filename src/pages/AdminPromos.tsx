import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, Button } from '@/components/ui';

export default function AdminPromos() {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" />;
  if (!isAdmin) return <Navigate to="/profile" />;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">Админ-панель: Промокоды</h1>
        <Link to="/admin" className="px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors">← Заявки</Link>
      </div>
      <Card hoverable={false}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Управление промокодами</h2>
          <Button variant="cta" size="sm">Создать промокод</Button>
        </div>
        <p className="text-[var(--color-text-muted)]">Таблица промокодов с CRUD-операциями (тип: % или ₽, цель: итог или деталь). Данные будут загружены из API.</p>
      </Card>
    </div>
  );
}
