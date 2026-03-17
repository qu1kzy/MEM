import { useConstructorStore } from '@/store/constructorStore';
import type { SpecOption, ServiceOption, PromoState } from '@/types/constructor';

const spec1: SpecOption = { id: 'welding', label: 'Сварочный пост', description: '', price: 45000 };
const spec2: SpecOption = { id: 'fire-module', label: 'Пожарный модуль', description: '', price: 85000 };
const service1: ServiceOption = { id: 'delivery', label: 'Доставка', description: '', price: 15000 };
const service2: ServiceOption = { id: 'installation', label: 'Установка и подключение', description: '', price: 25000 };

function resetStore() {
  useConstructorStore.getState().reset();
}

describe('constructorStore', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('initial state', () => {
    it('has step=1, model=standard, empty arrays, null promo', () => {
      const state = useConstructorStore.getState();
      expect(state.step).toBe(1);
      expect(state.model).toBe('standard');
      expect(state.selectedSpecs).toEqual([]);
      expect(state.selectedServices).toEqual([]);
      expect(state.promo).toBeNull();
      expect(state.contact).toEqual({ name: '', contact: '', comment: '' });
    });
  });

  describe('setStep', () => {
    it('changes the step', () => {
      useConstructorStore.getState().setStep(3);
      expect(useConstructorStore.getState().step).toBe(3);
    });
  });

  describe('setModel', () => {
    it('changes the model', () => {
      useConstructorStore.getState().setModel('premium');
      expect(useConstructorStore.getState().model).toBe('premium');
    });
  });

  describe('toggleSpec', () => {
    it('adds a spec to selectedSpecs', () => {
      useConstructorStore.getState().toggleSpec(spec1);
      expect(useConstructorStore.getState().selectedSpecs).toEqual([spec1]);
    });

    it('removes a spec if already selected', () => {
      useConstructorStore.getState().toggleSpec(spec1);
      useConstructorStore.getState().toggleSpec(spec1);
      expect(useConstructorStore.getState().selectedSpecs).toEqual([]);
    });

    it('adds multiple specs', () => {
      useConstructorStore.getState().toggleSpec(spec1);
      useConstructorStore.getState().toggleSpec(spec2);
      expect(useConstructorStore.getState().selectedSpecs).toEqual([spec1, spec2]);
    });
  });

  describe('toggleService', () => {
    it('adds a service to selectedServices', () => {
      useConstructorStore.getState().toggleService(service1);
      expect(useConstructorStore.getState().selectedServices).toEqual([service1]);
    });

    it('removes a service if already selected', () => {
      useConstructorStore.getState().toggleService(service1);
      useConstructorStore.getState().toggleService(service1);
      expect(useConstructorStore.getState().selectedServices).toEqual([]);
    });
  });

  describe('setContact', () => {
    it('updates contact info partially', () => {
      useConstructorStore.getState().setContact({ name: 'Ivan' });
      expect(useConstructorStore.getState().contact.name).toBe('Ivan');
      expect(useConstructorStore.getState().contact.contact).toBe('');
    });

    it('merges with existing contact', () => {
      useConstructorStore.getState().setContact({ name: 'Ivan' });
      useConstructorStore.getState().setContact({ contact: 'ivan@mail.com' });
      const contact = useConstructorStore.getState().contact;
      expect(contact.name).toBe('Ivan');
      expect(contact.contact).toBe('ivan@mail.com');
    });
  });

  describe('getBasePrice', () => {
    it('returns standard model base price (450000)', () => {
      expect(useConstructorStore.getState().getBasePrice()).toBe(450000);
    });

    it('returns premium model base price (650000)', () => {
      useConstructorStore.getState().setModel('premium');
      expect(useConstructorStore.getState().getBasePrice()).toBe(650000);
    });

    it('returns pro model base price (890000)', () => {
      useConstructorStore.getState().setModel('pro');
      expect(useConstructorStore.getState().getBasePrice()).toBe(890000);
    });
  });

  describe('applyPromo — percent on total', () => {
    it('calculates percent discount on subtotal correctly', () => {
      useConstructorStore.getState().toggleSpec(spec1); // 45000
      useConstructorStore.getState().toggleService(service1); // 15000
      // subtotal = 450000 + 45000 + 15000 = 510000
      const promo: PromoState = { code: 'SALE10', type: 'percent', value: 10, target: 'total' };
      useConstructorStore.getState().applyPromo(promo);
      // 10% of 510000 = 51000
      expect(useConstructorStore.getState().getDiscount()).toBe(51000);
    });
  });

  describe('applyPromo — fixed on total', () => {
    it('calculates fixed discount on total correctly', () => {
      // subtotal = 450000 (standard, no specs/services)
      const promo: PromoState = { code: 'FIX50K', type: 'fixed', value: 50000, target: 'total' };
      useConstructorStore.getState().applyPromo(promo);
      expect(useConstructorStore.getState().getDiscount()).toBe(50000);
    });

    it('caps fixed discount at subtotal', () => {
      const promo: PromoState = { code: 'HUGE', type: 'fixed', value: 999999, target: 'total' };
      useConstructorStore.getState().applyPromo(promo);
      expect(useConstructorStore.getState().getDiscount()).toBe(450000);
    });
  });

  describe('applyPromo — percent on item', () => {
    it('discounts only the targeted item', () => {
      useConstructorStore.getState().toggleSpec(spec1); // 45000
      useConstructorStore.getState().toggleSpec(spec2); // 85000
      const promo: PromoState = { code: 'ITEM20', type: 'percent', value: 20, target: 'item', targetItemId: 'welding' };
      useConstructorStore.getState().applyPromo(promo);
      // 20% of 45000 = 9000
      expect(useConstructorStore.getState().getDiscount()).toBe(9000);
    });

    it('returns 0 if target item is not selected', () => {
      const promo: PromoState = { code: 'ITEM20', type: 'percent', value: 20, target: 'item', targetItemId: 'nonexistent' };
      useConstructorStore.getState().applyPromo(promo);
      expect(useConstructorStore.getState().getDiscount()).toBe(0);
    });
  });

  describe('applyPromo — fixed on item', () => {
    it('discounts only the targeted item by fixed amount', () => {
      useConstructorStore.getState().toggleService(service1); // 15000
      const promo: PromoState = { code: 'ITEMFIX', type: 'fixed', value: 5000, target: 'item', targetItemId: 'delivery' };
      useConstructorStore.getState().applyPromo(promo);
      expect(useConstructorStore.getState().getDiscount()).toBe(5000);
    });

    it('caps fixed item discount at item price', () => {
      useConstructorStore.getState().toggleService(service1); // 15000
      const promo: PromoState = { code: 'ITEMFIX', type: 'fixed', value: 99999, target: 'item', targetItemId: 'delivery' };
      useConstructorStore.getState().applyPromo(promo);
      expect(useConstructorStore.getState().getDiscount()).toBe(15000);
    });
  });

  describe('clearPromo', () => {
    it('removes the promo', () => {
      const promo: PromoState = { code: 'SALE10', type: 'percent', value: 10, target: 'total' };
      useConstructorStore.getState().applyPromo(promo);
      useConstructorStore.getState().clearPromo();
      expect(useConstructorStore.getState().promo).toBeNull();
      expect(useConstructorStore.getState().getDiscount()).toBe(0);
    });
  });

  describe('getDiscount', () => {
    it('returns 0 when no promo is applied', () => {
      expect(useConstructorStore.getState().getDiscount()).toBe(0);
    });
  });

  describe('getTotal', () => {
    it('returns basePrice + specs + services - discount', () => {
      useConstructorStore.getState().toggleSpec(spec1); // 45000
      useConstructorStore.getState().toggleService(service1); // 15000
      const promo: PromoState = { code: 'FIX10K', type: 'fixed', value: 10000, target: 'total' };
      useConstructorStore.getState().applyPromo(promo);
      // 450000 + 45000 + 15000 - 10000 = 500000
      expect(useConstructorStore.getState().getTotal()).toBe(500000);
    });

    it('never goes below 0', () => {
      const promo: PromoState = { code: 'HUGE', type: 'fixed', value: 999999, target: 'total' };
      useConstructorStore.getState().applyPromo(promo);
      expect(useConstructorStore.getState().getTotal()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('reset', () => {
    it('returns to initial state', () => {
      useConstructorStore.getState().setStep(3);
      useConstructorStore.getState().setModel('pro');
      useConstructorStore.getState().toggleSpec(spec1);
      useConstructorStore.getState().toggleService(service1);
      useConstructorStore.getState().setContact({ name: 'Test' });
      useConstructorStore.getState().applyPromo({ code: 'X', type: 'fixed', value: 100, target: 'total' });

      useConstructorStore.getState().reset();

      const state = useConstructorStore.getState();
      expect(state.step).toBe(1);
      expect(state.model).toBe('standard');
      expect(state.selectedSpecs).toEqual([]);
      expect(state.selectedServices).toEqual([]);
      expect(state.promo).toBeNull();
      expect(state.contact).toEqual({ name: '', contact: '', comment: '' });
      expect(state.isDraftSaved).toBe(false);
      expect(state.isSubmitting).toBe(false);
      expect(state.submitSuccess).toBe(false);
      expect(state.orderId).toBeNull();
    });
  });
});
