import { http, HttpResponse, delay } from 'msw';
import { orders } from '../db';
import type { Order } from '@/types/order';

export const orderHandlers = [
  http.post('/api/orders', async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as Record<string, unknown>;
    const order: Order = {
      id: `order-${Date.now()}`,
      userId: (body.userId as string) || 'anonymous',
      model: body.model as string,
      modelLabel: body.model as string,
      specs: body.specs as Order['specs'],
      services: body.services as Order['services'],
      contact: body.contact as Order['contact'],
      promo: body.promo as Order['promo'],
      basePrice: body.basePrice as number,
      discount: body.discount as number,
      total: body.total as number,
      status: 'new',
      statusHistory: [{ status: 'new', changedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    };
    orders.set(order.id, order);
    return HttpResponse.json({ order });
  }),

  http.get('/api/orders', async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const result = [...orders.values()].filter(o => !userId || o.userId === userId);
    return HttpResponse.json({ orders: result });
  }),

  http.get('/api/orders/:id', async ({ params }) => {
    await delay(200);
    const order = orders.get(params.id as string);
    if (!order) return HttpResponse.json({ error: 'Заявка не найдена' }, { status: 404 });
    return HttpResponse.json({ order });
  }),
];
