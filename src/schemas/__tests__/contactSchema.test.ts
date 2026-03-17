import { contactSchema } from '@/schemas/contactSchema';

describe('contactSchema', () => {
  it('passes with valid data (email contact)', async () => {
    const result = await contactSchema.validate({
      name: 'Иван',
      contact: 'ivan@mail.ru',
      comment: 'Комментарий',
    });
    expect(result.name).toBe('Иван');
    expect(result.contact).toBe('ivan@mail.ru');
  });

  it('passes with valid phone contact', async () => {
    const result = await contactSchema.validate({
      name: 'Иван',
      contact: '+79991234567',
    });
    expect(result.contact).toBe('+79991234567');
  });

  it('passes with phone formatted with dashes and spaces', async () => {
    const result = await contactSchema.validate({
      name: 'Иван',
      contact: '+7 (999) 123-45-67',
    });
    expect(result.contact).toBe('+7 (999) 123-45-67');
  });

  it('fails for empty name (required)', async () => {
    await expect(
      contactSchema.validate({ name: '', contact: 'ivan@mail.ru' })
    ).rejects.toThrow('Укажите имя');
  });

  it('fails for name shorter than 2 chars', async () => {
    await expect(
      contactSchema.validate({ name: 'И', contact: 'ivan@mail.ru' })
    ).rejects.toThrow('Минимум 2 символа');
  });

  it('fails for empty contact (required)', async () => {
    await expect(
      contactSchema.validate({ name: 'Иван', contact: '' })
    ).rejects.toThrow('Укажите телефон или email');
  });

  it('fails for invalid contact', async () => {
    await expect(
      contactSchema.validate({ name: 'Иван', contact: 'not-valid' })
    ).rejects.toThrow('Введите корректный телефон или email');
  });

  it('fails for comment over 500 chars', async () => {
    const longComment = 'a'.repeat(501);
    await expect(
      contactSchema.validate({ name: 'Иван', contact: 'ivan@mail.ru', comment: longComment })
    ).rejects.toThrow('Максимум 500 символов');
  });

  it('comment is optional', async () => {
    const result = await contactSchema.validate({
      name: 'Иван',
      contact: 'ivan@mail.ru',
    });
    expect(result.comment).toBe('');
  });
});
