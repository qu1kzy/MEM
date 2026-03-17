import type { Model } from '@/types/constructor';

export const models: Model[] = [
  { id: 'standard', name: 'Стандарт', basePrice: 450000, description: 'Базовая комплектация с генератором и системой водоснабжения' },
  { id: 'premium', name: 'Премиум', basePrice: 650000, description: 'Расширенная комплектация с пожарным модулем и теплоаккумулятором' },
  { id: 'pro', name: 'Про', basePrice: 890000, description: 'Максимальная комплектация: все модули, полная теплоизоляция, система орошения' },
];
