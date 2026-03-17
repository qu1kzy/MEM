export interface PromoCode {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  target: 'total' | 'item';
  targetItemId?: string;
  maxUses: number;
  usedCount: number;
  active: boolean;
  expiresAt?: string;
  createdAt: string;
}
