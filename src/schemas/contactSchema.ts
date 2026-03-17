import * as yup from 'yup';

const phoneRegex = /^(\+7|8)\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = yup.object({
  name: yup.string().required('Укажите имя').min(2, 'Минимум 2 символа'),
  contact: yup.string().required('Укажите телефон или email').test(
    'phone-or-email',
    'Введите корректный телефон или email',
    (value) => {
      if (!value) return false;
      const cleaned = value.replace(/[\s\-()]/g, '');
      return phoneRegex.test(cleaned) || emailRegex.test(value);
    },
  ),
  comment: yup.string().max(500, 'Максимум 500 символов').default(''),
});
