import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Constructor } from '@/components/constructor/Constructor';
import { useConstructorStore } from '@/store/constructorStore';
import type { ReactNode } from 'react';

// Mock lottie-react to avoid canvas issues in jsdom
vi.mock('lottie-react', () => ({
  default: () => <div data-testid="lottie-mock" />,
}));

// Mock framer-motion to avoid animation issues
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => {
      const { initial, animate, exit, transition, custom, ...rest } = props;
      void initial; void animate; void exit; void transition; void custom;
      return <div {...rest}>{children as ReactNode}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

// Mock the hooks that ConstructorSidebar uses
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ user: null, isAuthenticated: false, isAdmin: false, token: null, login: vi.fn(), register: vi.fn(), logout: vi.fn() }),
}));

vi.mock('@/components/ui/ToastContext', () => ({
  useToast: () => ({ toast: vi.fn() }),
  ToastProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => true,
}));

describe('Constructor', () => {
  beforeEach(() => {
    useConstructorStore.getState().reset();
  });

  it('renders step 1 (model selection) initially', () => {
    render(<Constructor />);
    expect(screen.getByText('Выберите модель')).toBeInTheDocument();
  });

  it('renders the progress bar with step titles', () => {
    render(<Constructor />);
    expect(screen.getByText('Модель')).toBeInTheDocument();
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Услуги')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
  });

  it('clicking "Далее" advances to step 2', async () => {
    const user = userEvent.setup();
    render(<Constructor />);

    const nextBtn = screen.getByRole('button', { name: /Далее/i });
    await user.click(nextBtn);

    expect(useConstructorStore.getState().step).toBe(2);
  });

  it('clicking "Назад" goes back from step 2 to step 1', async () => {
    useConstructorStore.getState().setStep(2);
    const user = userEvent.setup();
    render(<Constructor />);

    const backBtn = screen.getByRole('button', { name: /Назад/i });
    await user.click(backBtn);

    expect(useConstructorStore.getState().step).toBe(1);
  });

  it('"Назад" button is disabled on step 1', () => {
    render(<Constructor />);
    const backBtn = screen.getByRole('button', { name: /Назад/i });
    expect(backBtn).toBeDisabled();
  });

  it('renders sidebar with price info', () => {
    render(<Constructor />);
    expect(screen.getByText('Ваш МЭМ')).toBeInTheDocument();
    expect(screen.getByText('Итого')).toBeInTheDocument();
  });
});
