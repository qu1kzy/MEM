import { apiClient } from './client';

export interface PromoValidateResponse {
  valid: boolean;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  target: 'total' | 'item';
  targetItemId?: string;
  message: string;
}

export async function validatePromo(code: string): Promise<PromoValidateResponse> {
  return apiClient('/api/promo/validate', { method: 'POST', body: JSON.stringify({ code }) });
}
