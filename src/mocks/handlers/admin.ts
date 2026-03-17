import { http, HttpResponse, delay } from 'msw';
import { orders, promoCodes } from '../db';
import type { PromoCode } from '@/types/admin';

export const adminHandlers = [
  http.get('/api/admin/orders', async () => {
    await delay(300);
    const all = [...orders.values()];
    return HttpResponse.json({ orders: all, total: all.length });
  }),

  http.patch('/api/admin/orders/:id', async ({ params, request }) => {
    await delay(300);
    const order = orders.get(params.id as string);
    if (!order) return HttpResponse.json({ error: 'Не найдено' }, { status: 404 });
    const { status, comment } = (await request.json()) as { status: string; comment?: string };
    order.status = status as typeof order.status;
    order.statusHistory.push({ status: order.status, changedAt: new Date().toISOString(), comment });
    orders.set(order.id, order);
    return HttpResponse.json({ order });
  }),

  http.get('/api/admin/promos', async () => {
    await delay(200);
    return HttpResponse.json({ promos: [...promoCodes.values()] });
  }),

  http.post('/api/admin/promos', async ({ request }) => {
    await delay(300);
    const data = (await request.json()) as Omit<PromoCode, 'id' | 'usedCount' | 'createdAt'>;
    const promo: PromoCode = { ...data, id: `promo-${Date.now()}`, usedCount: 0, createdAt: new Date().toISOString() };
    promoCodes.set(promo.code, promo);
    return HttpResponse.json({ promo });
  }),

  http.patch('/api/admin/promos/:id', async ({ params, request }) => {
    await delay(300);
    const existing = [...promoCodes.values()].find(p => p.id === params.id);
    if (!existing) return HttpResponse.json({ error: 'Не найдено' }, { status: 404 });
    const updates = (await request.json()) as Partial<PromoCode>;
    const updated = { ...existing, ...updates };
    promoCodes.delete(existing.code);
    promoCodes.set(updated.code, updated);
    return HttpResponse.json({ promo: updated });
  }),

  http.delete('/api/admin/promos/:id', async ({ params }) => {
    await delay(200);
    const existing = [...promoCodes.values()].find(p => p.id === params.id);
    if (!existing) return HttpResponse.json({ error: 'Не найдено' }, { status: 404 });
    promoCodes.delete(existing.code);
    return new HttpResponse(null, { status: 204 });
  }),
];
