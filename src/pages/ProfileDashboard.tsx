import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, Badge, Button } from '@/components/ui';

const statusLabels: Record<string, { label: string; variant: 'blue' | 'yellow' | 'green' | 'red' }> = {
  new: { label: 'Новая', variant: 'blue' },
  processing: { label: 'В обработке', variant: 'yellow' },
  approved: { label: 'Согласовано', variant: 'green' },
  completed: { label: 'Выполнено', variant: 'green' },
  rejected: { label: 'Отказано', variant: 'red' },
};

export default function ProfileDashboard() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" />;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[var(--color-text)]">Личный кабинет</h1>

      <Card hoverable={false} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Профиль</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><span className="text-[var(--color-text-muted)]">Email:</span> <span className="font-medium">{user?.email}</span></div>
          <div><span className="text-[var(--color-text-muted)]">Имя:</span> <span className="font-medium">{user?.name || '—'}</span></div>
        </div>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Мои заявки</h2>
      <p className="text-[var(--color-text-muted)]">Здесь будут отображаться ваши заявки. Создайте заявку через конструктор на главной странице.</p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Черновики</h2>
      <p className="text-[var(--color-text-muted)]">Сохранённые черновики конфигураций.</p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Промокоды</h2>
      <p className="text-[var(--color-text-muted)]">Использованные промокоды будут отображены здесь.</p>
    </div>
  );
}
