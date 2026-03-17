import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().required('Укажите email').email('Некорректный email'),
  password: yup.string().required('Укажите пароль').min(8, 'Минимум 8 символов'),
});

export const registerSchema = yup.object({
  email: yup.string().required('Укажите email').email('Некорректный email'),
  password: yup.string().required('Укажите пароль').min(8, 'Минимум 8 символов'),
});

export const forgotSchema = yup.object({
  email: yup.string().required('Укажите email').email('Некорректный email'),
});
