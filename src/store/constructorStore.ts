import { create } from 'zustand';
import type { ModelId, SpecOption, ServiceOption, ContactInfo, PromoState } from '@/types/constructor';
import { models } from '@/data/models';
import * as draftsApi from '@/api/drafts';
import * as ordersApi from '@/api/orders';

interface ConstructorState {
  step: number;
  model: ModelId;
  selectedSpecs: SpecOption[];
  selectedServices: ServiceOption[];
  contact: ContactInfo;
  promo: PromoState | null;
  isDraftSaved: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean;
  orderId: string | null;

  setStep: (step: number) => void;
  setModel: (model: ModelId) => void;
  toggleSpec: (spec: SpecOption) => void;
  toggleService: (service: ServiceOption) => void;
  setContact: (contact: Partial<ContactInfo>) => void;
  applyPromo: (promo: PromoState) => void;
  clearPromo: () => void;
  getBasePrice: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  saveDraft: (userId: string) => Promise<void>;
  submitOrder: (userId?: string) => Promise<void>;
  reset: () => void;
  loadDraft: (draft: Record<string, unknown>) => void;
}

const initialContact: ContactInfo = { name: '', contact: '', comment: '' };

export const useConstructorStore = create<ConstructorState>((set, get) => ({
  step: 1,
  model: 'standard',
  selectedSpecs: [],
  selectedServices: [],
  contact: { ...initialContact },
  promo: null,
  isDraftSaved: false,
  isSubmitting: false,
  submitSuccess: false,
  orderId: null,

  setStep: (step) => set({ step }),
  setModel: (model) => set({ model }),

  toggleSpec: (spec) => set((state) => {
    const exists = state.selectedSpecs.find(s => s.id === spec.id);
    return {
      selectedSpecs: exists
        ? state.selectedSpecs.filter(s => s.id !== spec.id)
        : [...state.selectedSpecs, spec],
    };
  }),

  toggleService: (service) => set((state) => {
    const exists = state.selectedServices.find(s => s.id === service.id);
    return {
      selectedServices: exists
        ? state.selectedServices.filter(s => s.id !== service.id)
        : [...state.selectedServices, service],
    };
  }),

  setContact: (contact) => set((state) => ({
    contact: { ...state.contact, ...contact },
  })),

  applyPromo: (promo) => set({ promo }),
  clearPromo: () => set({ promo: null }),

  getBasePrice: () => {
    const model = models.find(m => m.id === get().model);
    return model?.basePrice ?? 0;
  },

  getDiscount: () => {
    const state = get();
    const promo = state.promo;
    if (!promo) return 0;

    if (promo.target === 'total') {
      const subtotal = state.getBasePrice()
        + state.selectedSpecs.reduce((s, sp) => s + sp.price, 0)
        + state.selectedServices.reduce((s, sv) => s + sv.price, 0);
      if (promo.type === 'percent') return Math.min(subtotal, Math.round(subtotal * promo.value / 100));
      return Math.min(subtotal, promo.value);
    }

    const item = [...state.selectedSpecs, ...state.selectedServices].find(i => i.id === promo.targetItemId);
    if (!item) return 0;
    if (promo.type === 'percent') return Math.min(item.price, Math.round(item.price * promo.value / 100));
    return Math.min(item.price, promo.value);
  },

  getTotal: () => {
    const state = get();
    const base = state.getBasePrice();
    const specsTotal = state.selectedSpecs.reduce((s, sp) => s + sp.price, 0);
    const servicesTotal = state.selectedServices.reduce((s, sv) => s + sv.price, 0);
    const discount = state.getDiscount();
    return Math.max(0, base + specsTotal + servicesTotal - discount);
  },

  saveDraft: async (userId) => {
    const state = get();
    await draftsApi.saveDraft(userId, {
      model: state.model,
      specs: state.selectedSpecs,
      services: state.selectedServices,
      contact: state.contact,
      promo: state.promo,
    });
    set({ isDraftSaved: true });
  },

  submitOrder: async (userId) => {
    set({ isSubmitting: true });
    try {
      const state = get();
      const res = await ordersApi.createOrder({
        userId,
        model: state.model,
        specs: state.selectedSpecs,
        services: state.selectedServices,
        contact: state.contact,
        promo: state.promo,
        basePrice: state.getBasePrice(),
        discount: state.getDiscount(),
        total: state.getTotal(),
      });
      set({ submitSuccess: true, orderId: res.order.id, isSubmitting: false });
    } catch {
      set({ isSubmitting: false });
      throw new Error('Ошибка при отправке заявки');
    }
  },

  reset: () => set({
    step: 1, model: 'standard', selectedSpecs: [], selectedServices: [],
    contact: { ...initialContact }, promo: null, isDraftSaved: false,
    isSubmitting: false, submitSuccess: false, orderId: null,
  }),

  loadDraft: (draft) => set({
    model: (draft.model as ModelId) || 'standard',
    selectedSpecs: (draft.specs as SpecOption[]) || [],
    selectedServices: (draft.services as ServiceOption[]) || [],
    contact: (draft.contact as ContactInfo) || { ...initialContact },
    promo: (draft.promo as PromoState) || null,
    step: 1, isDraftSaved: false, submitSuccess: false,
  }),
}));
