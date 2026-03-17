export interface ContactItem {
  icon: string;
  label: string;
  value: string;
  copyText: string;
  copyMessage: string;
}

export const contacts: ContactItem[] = [
  { icon: 'phone', label: '+7 911 900-44-77', value: '+79119004477', copyText: '+79119004477', copyMessage: 'Номер скопирован' },
  { icon: 'envelope', label: 'fateevdm@yandex.ru', value: 'fateevdm@yandex.ru', copyText: 'fateevdm@yandex.ru', copyMessage: 'Почта скопирована' },
  { icon: 'telegram', label: '@Li2cpp', value: '@Li2cpp', copyText: '@Li2cpp', copyMessage: 'Telegram скопирован' },
  { icon: 'location', label: 'Лужский р-н', value: 'Лужский р-н', copyText: 'Лужский р-н', copyMessage: 'Адрес скопирован' },
];
