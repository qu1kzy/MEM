import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/components/ui/ToastContext';
import { AuthContext, type AuthContextValue } from '@/context/AuthContext';
import AuthPage from '@/pages/AuthPage';
import type { ReactNode } from 'react';

const mockLogin = vi.fn().mockResolvedValue(undefined);
const mockRegister = vi.fn().mockResolvedValue(undefined);
const mockLogout = vi.fn();

const mockAuth: AuthContextValue = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  login: mockLogin,
  register: mockRegister,
  logout: mockLogout,
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthContext.Provider value={mockAuth}>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthContext.Provider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };
}

describe('AuthPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form by default', () => {
    render(<AuthPage />, { wrapper: createWrapper() });
    expect(screen.getByRole('heading', { name: 'Вход' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });

  it('switching tabs shows register form', async () => {
    const user = userEvent.setup();
    render(<AuthPage />, { wrapper: createWrapper() });

    const registerTab = screen.getByRole('button', { name: 'Регистрация' });
    await user.click(registerTab);

    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
  });

  it('shows validation errors for empty submit on login', async () => {
    const user = userEvent.setup();
    render(<AuthPage />, { wrapper: createWrapper() });

    const submitBtn = screen.getByRole('button', { name: 'Войти' });
    await user.click(submitBtn);

    await waitFor(() => {
      const alerts = screen.getAllByRole('alert');
      expect(alerts.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('login form calls login on valid submission', async () => {
    const user = userEvent.setup();
    render(<AuthPage />, { wrapper: createWrapper() });

    await user.type(screen.getByLabelText('Email'), 'user@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Войти' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123');
    });
  });
});
