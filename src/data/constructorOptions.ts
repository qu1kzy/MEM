import type { SpecOption, ServiceOption } from '@/types/constructor';

export const specOptions: SpecOption[] = [
  { id: 'welding', label: 'Сварочный пост', description: 'Функция сварки на генераторе, безопасная работа рядом с ГСМ', price: 45000 },
  { id: 'fire-module', label: 'Пожарный модуль', description: 'Насос 150 л/мин, ёмкость для пенообразователя 100 л', price: 85000 },
  { id: 'heating', label: 'Теплоаккумулятор 2000 л', description: 'Отопление и горячее водоснабжение до 55°C', price: 120000 },
  { id: 'pump', label: 'Подкачивающая станция', description: 'Расширительный бак 100 л, автоматическая подкачка', price: 35000 },
  { id: 'insulation', label: 'Полная теплоизоляция', description: 'Внутренний подогрев 700 Вт, работа в морозы', price: 55000 },
  { id: 'irrigation', label: 'Система орошения', description: 'Автополив, внесение удобрений и гербицидов в струю', price: 40000 },
];

export const serviceOptions: ServiceOption[] = [
  { id: 'delivery', label: 'Доставка', description: 'Доставка модуля до вашего участка', price: 15000 },
  { id: 'installation', label: 'Установка и подключение', description: 'Монтаж, подключение всех систем, пуско-наладка', price: 25000 },
  { id: 'warranty-ext', label: 'Расширенная гарантия (3 года)', description: 'Продление стандартной гарантии с выездным обслуживанием', price: 30000 },
];
