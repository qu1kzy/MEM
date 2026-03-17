import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';
interface ToastItem { id: number; message: string; type: ToastType; }
interface ToastContextValue { toast: (message: string, type?: ToastType) => void; }

const ToastCtx = createContext<ToastContextValue | null>(null);
let nextId = 0;

const typeColors: Record<ToastType, string> = {
  success: 'bg-[var(--color-success)]',
  error: 'bg-[var(--color-error)]',
  info: 'bg-[var(--color-primary)]',
  warning: 'bg-[var(--color-warning)]',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast: addToast }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} role="status" className={`${typeColors[t.type]} text-white px-6 py-3 rounded-full font-semibold shadow-lg`}>{t.message}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
