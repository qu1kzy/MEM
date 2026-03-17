import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, registerSchema, forgotSchema } from '@/schemas/authSchemas';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/ToastContext';
import { Button, Input } from '@/components/ui';
import { forgotPassword } from '@/api/auth';

type AuthTab = 'login' | 'register' | 'forgot';

export default function AuthPage() {
  const [tab, setTab] = useState<AuthTab>('login');
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm({ resolver: yupResolver(loginSchema) });
  const registerForm = useForm({ resolver: yupResolver(registerSchema) });
  const forgotForm = useForm({ resolver: yupResolver(forgotSchema) });

  const onLogin = loginForm.handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);
      toast('Вы вошли в аккаунт', 'success');
      navigate('/profile');
    } catch { toast('Неверный email или пароль', 'error'); }
  });

  const onRegister = registerForm.handleSubmit(async (data) => {
    try {
      await registerUser(data.email, data.password);
      toast('Регистрация успешна!', 'success');
      navigate('/profile');
    } catch { toast('Ошибка регистрации', 'error'); }
  });

  const onForgot = forgotForm.handleSubmit(async (data) => {
    try {
      await forgotPassword(data.email);
      toast('Инструкции отправлены на почту', 'success');
      setTab('login');
    } catch { toast('Ошибка отправки', 'error'); }
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-start justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-[var(--color-text)]">
          {tab === 'login' ? 'Вход' : tab === 'register' ? 'Регистрация' : 'Восстановление пароля'}
        </h1>

        {tab !== 'forgot' && (
          <div className="flex mb-6 rounded-lg overflow-hidden border border-[var(--color-border)]">
            <button onClick={() => setTab('login')} className={`flex-1 py-3 text-center font-semibold transition-colors ${tab === 'login' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'}`}>Вход</button>
            <button onClick={() => setTab('register')} className={`flex-1 py-3 text-center font-semibold transition-colors ${tab === 'register' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'}`}>Регистрация</button>
          </div>
        )}

        {tab === 'login' && (
          <form onSubmit={onLogin} className="flex flex-col gap-4">
            <Input label="Email" type="email" placeholder="your@email.com" error={loginForm.formState.errors.email?.message} {...loginForm.register('email')} />
            <Input label="Пароль" type="password" placeholder="Минимум 8 символов" error={loginForm.formState.errors.password?.message} {...loginForm.register('password')} />
            <Button type="submit" variant="cta" fullWidth loading={loginForm.formState.isSubmitting}>Войти</Button>
            <button type="button" onClick={() => setTab('forgot')} className="text-sm text-[var(--color-primary)] hover:underline text-center">Забыли пароль?</button>
          </form>
        )}

        {tab === 'register' && (
          <form onSubmit={onRegister} className="flex flex-col gap-4">
            <Input label="Email" type="email" placeholder="your@email.com" error={registerForm.formState.errors.email?.message} {...registerForm.register('email')} />
            <Input label="Пароль" type="password" placeholder="Минимум 8 символов" error={registerForm.formState.errors.password?.message} {...registerForm.register('password')} />
            <Button type="submit" variant="cta" fullWidth loading={registerForm.formState.isSubmitting}>Зарегистрироваться</Button>
          </form>
        )}

        {tab === 'forgot' && (
          <form onSubmit={onForgot} className="flex flex-col gap-4">
            <Input label="Email" type="email" placeholder="your@email.com" error={forgotForm.formState.errors.email?.message} {...forgotForm.register('email')} />
            <Button type="submit" variant="primary" fullWidth loading={forgotForm.formState.isSubmitting}>Отправить инструкции</Button>
            <button type="button" onClick={() => setTab('login')} className="text-sm text-[var(--color-primary)] hover:underline text-center">Вернуться к входу</button>
          </form>
        )}
      </div>
    </div>
  );
}
