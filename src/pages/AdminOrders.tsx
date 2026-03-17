import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui';

export default function AdminOrders() {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" />;
  if (!isAdmin) return <Navigate to="/profile" />;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">Админ-панель: Заявки</h1>
        <Link to="/admin/promos" className="px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors">Промокоды →</Link>
      </div>
      <Card hoverable={false}>
        <p className="text-[var(--color-text-muted)]">Таблица заявок с фильтрами, сменой статуса и комментариями. Данные будут загружены из API.</p>
      </Card>
    </div>
  );
}
