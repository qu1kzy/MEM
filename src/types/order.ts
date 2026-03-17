export type OrderStatus = 'new' | 'processing' | 'approved' | 'completed' | 'rejected';

export interface StatusHistoryEntry {
  status: OrderStatus;
  changedAt: string;
  comment?: string;
}

export interface Order {
  id: string;
  userId: string;
  model: string;
  modelLabel: string;
  specs: { id: string; label: string; price: number }[];
  services: { id: string; label: string; price: number }[];
  contact: { name: string; contact: string; comment: string };
  promo?: { code: string; type: 'percent' | 'fixed'; value: number; target: 'total' | 'item'; targetItemId?: string };
  basePrice: number;
  discount: number;
  total: number;
  status: OrderStatus;
  statusHistory: StatusHistoryEntry[];
  createdAt: string;
}

export interface Draft {
  id: string;
  userId: string;
  model: string;
  specs: { id: string; label: string; price: number }[];
  services: { id: string; label: string; price: number }[];
  contact: { name?: string; contact?: string; comment?: string };
  promo?: { code: string; type: string; value: number; target: string; targetItemId?: string };
  createdAt: string;
}
