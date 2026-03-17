import { apiClient } from './client';
import type { Order } from '@/types/order';

export async function createOrder(payload: Record<string, unknown>): Promise<{ order: Order }> {
  return apiClient('/api/orders', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getOrders(userId: string): Promise<{ orders: Order[] }> {
  return apiClient(`/api/orders?userId=${userId}`);
}

export async function getOrderById(id: string): Promise<{ order: Order }> {
  return apiClient(`/api/orders/${id}`);
}
