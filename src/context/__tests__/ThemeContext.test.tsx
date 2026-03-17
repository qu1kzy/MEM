import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import type { ReactNode } from 'react';

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    // Mock window.matchMedia for jsdom
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: light)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('provides a default theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(['light', 'dark']).toContain(result.current.theme);
  });

  it('sets data-theme attribute on document.documentElement', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(document.documentElement.getAttribute('data-theme')).toBe(result.current.theme);
  });

  it('toggleTheme switches between dark and light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const initial = result.current.theme;

    act(() => {
      result.current.toggleTheme();
    });

    const toggled = result.current.theme;
    expect(toggled).not.toBe(initial);
    expect(['light', 'dark']).toContain(toggled);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe(initial);
  });

  it('toggleTheme updates data-theme attribute', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe(result.current.theme);
  });

  it('setTheme sets a specific theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
  });

  it('throws when used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within ThemeProvider');
  });
});
