export type ModelId = 'standard' | 'premium' | 'pro';

export interface Model {
  id: ModelId;
  name: string;
  basePrice: number;
  description: string;
}

export interface SpecOption {
  id: string;
  label: string;
  description: string;
  price: number;
  icon?: string;
}

export interface ServiceOption {
  id: string;
  label: string;
  description: string;
  price: number;
  incompatibleWith?: string[];
}

export interface ContactInfo {
  name: string;
  contact: string;
  comment: string;
}

export interface PromoState {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  target: 'total' | 'item';
  targetItemId?: string;
}
