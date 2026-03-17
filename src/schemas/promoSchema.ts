import * as yup from 'yup';

export const promoSchema = yup.object({
  code: yup.string().required('Укажите код').matches(/^[A-Za-z0-9_-]+$/, 'Только латиница, цифры, - и _'),
  type: yup.string().oneOf(['percent', 'fixed'] as const).required('Укажите тип'),
  value: yup.number().required('Укажите значение').positive('Должно быть больше 0'),
  target: yup.string().oneOf(['total', 'item'] as const).required('Укажите цель'),
  targetItemId: yup.string().when('target', {
    is: 'item',
    then: (schema) => schema.required('Выберите деталь/услугу'),
    otherwise: (schema) => schema.optional(),
  }),
  maxUses: yup.number().min(0, 'Минимум 0').default(0),
  active: yup.boolean().default(true),
  expiresAt: yup.string().optional(),
});
