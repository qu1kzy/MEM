import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { RootLayout } from '@/layouts/RootLayout';
import { Spinner } from '@/components/ui';
import { LandingPage } from '@/pages/LandingPage';

const AuthPage = lazy(() => import('@/pages/AuthPage'));
const ProfileDashboard = lazy(() => import('@/pages/ProfileDashboard'));
const OrderDetails = lazy(() => import('@/pages/OrderDetails'));
const AdminOrders = lazy(() => import('@/pages/AdminOrders'));
const AdminPromos = lazy(() => import('@/pages/AdminPromos'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><Spinner size="lg" /></div>}>{children}</Suspense>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="auth" element={<SuspenseWrapper><AuthPage /></SuspenseWrapper>} />
        <Route path="profile" element={<SuspenseWrapper><ProfileDashboard /></SuspenseWrapper>} />
        <Route path="profile/orders/:id" element={<SuspenseWrapper><OrderDetails /></SuspenseWrapper>} />
        <Route path="admin" element={<SuspenseWrapper><AdminOrders /></SuspenseWrapper>} />
        <Route path="admin/promos" element={<SuspenseWrapper><AdminPromos /></SuspenseWrapper>} />
        <Route path="privacy" element={<SuspenseWrapper><PrivacyPage /></SuspenseWrapper>} />
      </Route>
    </Routes>
  );
}
