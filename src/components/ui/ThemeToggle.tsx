import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      className="p-2 rounded-lg hover:bg-[var(--color-glass)] text-[var(--color-text)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center text-xl">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
