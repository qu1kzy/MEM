import { loginSchema, registerSchema, forgotSchema } from '@/schemas/authSchemas';

describe('loginSchema', () => {
  it('passes with valid email and password', async () => {
    const result = await loginSchema.validate({
      email: 'user@example.com',
      password: 'password123',
    });
    expect(result.email).toBe('user@example.com');
  });

  it('fails with invalid email', async () => {
    await expect(
      loginSchema.validate({ email: 'not-an-email', password: 'password123' })
    ).rejects.toThrow('Некорректный email');
  });

  it('fails with empty email', async () => {
    await expect(
      loginSchema.validate({ email: '', password: 'password123' })
    ).rejects.toThrow('Укажите email');
  });

  it('fails with password shorter than 8 chars', async () => {
    await expect(
      loginSchema.validate({ email: 'user@example.com', password: '1234567' })
    ).rejects.toThrow('Минимум 8 символов');
  });

  it('fails with empty password', async () => {
    await expect(
      loginSchema.validate({ email: 'user@example.com', password: '' })
    ).rejects.toThrow('Укажите пароль');
  });
});

describe('registerSchema', () => {
  it('passes with valid data', async () => {
    const result = await registerSchema.validate({
      email: 'new@example.com',
      password: 'securepass',
    });
    expect(result.email).toBe('new@example.com');
  });

  it('fails with invalid email', async () => {
    await expect(
      registerSchema.validate({ email: 'bad', password: 'securepass' })
    ).rejects.toThrow('Некорректный email');
  });

  it('fails with short password', async () => {
    await expect(
      registerSchema.validate({ email: 'new@example.com', password: 'short' })
    ).rejects.toThrow('Минимум 8 символов');
  });
});

describe('forgotSchema', () => {
  it('passes with valid email', async () => {
    const result = await forgotSchema.validate({ email: 'user@example.com' });
    expect(result.email).toBe('user@example.com');
  });

  it('fails with invalid email', async () => {
    await expect(
      forgotSchema.validate({ email: 'not-valid' })
    ).rejects.toThrow('Некорректный email');
  });

  it('fails with empty email', async () => {
    await expect(
      forgotSchema.validate({ email: '' })
    ).rejects.toThrow('Укажите email');
  });
});
