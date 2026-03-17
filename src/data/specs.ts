export interface Spec {
  label: string;
  value: string;
}

export const specs: Spec[] = [
  { label: 'Габариты (Д × Ш × В)', value: '4 × 1,5 × 1,8 м' },
  { label: 'Вес порожнем', value: '700 кг' },
  { label: 'Вес заполненный', value: '3 000 кг' },
  { label: 'Объём баков для воды', value: '2 000 л' },
];
