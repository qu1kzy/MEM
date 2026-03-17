import { apiClient } from './client';
import type { Order } from '@/types/order';
import type { PromoCode } from '@/types/admin';

export async function getAdminOrders(params?: Record<string, string>): Promise<{ orders: Order[]; total: number }> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiClient(`/api/admin/orders${query}`);
}

export async function updateOrderStatus(id: string, status: string, comment?: string): Promise<{ order: Order }> {
  return apiClient(`/api/admin/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, comment }),
  });
}

export async function getAdminPromos(): Promise<{ promos: PromoCode[] }> {
  return apiClient('/api/admin/promos');
}

export async function createPromo(promo: Omit<PromoCode, 'id' | 'usedCount' | 'createdAt'>): Promise<{ promo: PromoCode }> {
  return apiClient('/api/admin/promos', { method: 'POST', body: JSON.stringify(promo) });
}

export async function updatePromo(id: string, data: Partial<PromoCode>): Promise<{ promo: PromoCode }> {
  return apiClient(`/api/admin/promos/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export async function deletePromo(id: string): Promise<void> {
  return apiClient(`/api/admin/promos/${id}`, { method: 'DELETE' });
}
