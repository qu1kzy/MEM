import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '@/schemas/contactSchema';
import { useConstructorStore } from '@/store/constructorStore';
import { Input, Textarea } from '@/components/ui';
import { useEffect } from 'react';

export function StepContacts() {
  const { contact, setContact } = useConstructorStore();
  const { register, formState: { errors }, watch } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: contact,
  });

  const values = watch();
  useEffect(() => { setContact(values); }, [values, setContact]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-[var(--color-text)]">Контактные данные</h3>
      <div className="flex flex-col gap-4">
        <Input label="Имя" placeholder="Ваше имя" error={errors.name?.message} {...register('name')} />
        <Input label="Телефон или Email" placeholder="+7... или email" error={errors.contact?.message} {...register('contact')} />
        <Textarea label="Комментарий" placeholder="Дополнительные пожелания..." error={errors.comment?.message} {...register('comment')} />
      </div>
    </div>
  );
}
