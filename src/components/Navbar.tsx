import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (isLanding) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)] transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between" aria-label="Главная навигация">
        <Link to="/" className="text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
          М<span className="text-[var(--color-primary)]">Э</span>М
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('features')} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Возможности</button>
          <button onClick={() => scrollToSection('constructor')} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Конструктор</button>
          <button onClick={() => scrollToSection('specs')} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Характеристики</button>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="px-4 py-2 text-sm rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass)] transition-colors min-h-[44px] flex items-center">Профиль</Link>
              {isAdmin && <Link to="/admin" className="px-4 py-2 text-sm rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-glass)] transition-colors min-h-[44px] flex items-center">Админ</Link>}
              <button onClick={logout} className="px-4 py-2 text-sm rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-glass)] transition-colors min-h-[44px]">Выйти</button>
            </>
          ) : (
            <Link to="/auth" className="px-5 py-2 text-sm rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all min-h-[44px] flex items-center font-semibold">Войти</Link>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-text)]" aria-label="Меню" aria-expanded={menuOpen}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 flex flex-col gap-3">
          <button onClick={() => scrollToSection('features')} className="text-left py-3 text-[var(--color-text)] hover:text-[var(--color-primary)]">Возможности</button>
          <button onClick={() => scrollToSection('constructor')} className="text-left py-3 text-[var(--color-text)] hover:text-[var(--color-primary)]">Конструктор</button>
          <button onClick={() => scrollToSection('specs')} className="text-left py-3 text-[var(--color-text)] hover:text-[var(--color-primary)]">Характеристики</button>
        </div>
      )}
    </header>
  );
}
