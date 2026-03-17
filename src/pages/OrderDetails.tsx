import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui';

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" />;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[var(--color-text)]">Заявка #{id}</h1>
      <Card hoverable={false}>
        <p className="text-[var(--color-text-muted)]">Детали заявки будут загружены из API.</p>
      </Card>
    </div>
  );
}
