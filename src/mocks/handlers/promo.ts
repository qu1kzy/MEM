import { http, HttpResponse, delay } from 'msw';
import { promoCodes } from '../db';

export const promoHandlers = [
  http.post('/api/promo/validate', async ({ request }) => {
    await delay(300);
    const { code } = (await request.json()) as { code: string };
    const promo = promoCodes.get(code.toUpperCase());
    if (!promo || !promo.active) return HttpResponse.json({ valid: false, code, message: 'Промокод не найден или неактивен' });
    if (promo.maxUses > 0 && promo.usedCount >= promo.maxUses) return HttpResponse.json({ valid: false, code, message: 'Промокод исчерпан' });
    if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) return HttpResponse.json({ valid: false, code, message: 'Промокод истёк' });
    return HttpResponse.json({ valid: true, code: promo.code, type: promo.type, value: promo.value, target: promo.target, targetItemId: promo.targetItemId, message: `Промокод применён: ${promo.type === 'percent' ? promo.value + '%' : promo.value + '₽'} скидка` });
  }),
];
