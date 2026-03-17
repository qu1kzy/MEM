import type { User } from '@/context/AuthContext';
import type { Order } from '@/types/order';
import type { PromoCode } from '@/types/admin';

export const users = new Map<string, { user: User; password: string }>();
export const orders = new Map<string, Order>();
export const drafts = new Map<string, Record<string, unknown>[]>();
export const promoCodes = new Map<string, PromoCode>();

// Seed admin user
users.set('admin@mem.ru', {
  user: { id: 'admin-1', email: 'admin@mem.ru', name: 'Администратор', role: 'admin' },
  password: 'admin123',
});

// Seed promo codes
promoCodes.set('SAVE10', { id: 'promo-1', code: 'SAVE10', type: 'percent', value: 10, target: 'total', maxUses: 0, usedCount: 3, active: true, createdAt: '2026-01-01T00:00:00Z' });
promoCodes.set('FIRE5000', { id: 'promo-2', code: 'FIRE5000', type: 'fixed', value: 5000, target: 'item', targetItemId: 'fire-module', maxUses: 50, usedCount: 12, active: true, createdAt: '2026-02-15T00:00:00Z' });
