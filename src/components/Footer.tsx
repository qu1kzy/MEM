import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-[var(--color-text)] mb-1">
              М<span className="text-[var(--color-primary)]">Э</span>М
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">Комфорт в любом месте</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/privacy" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Политика конфиденциальности</Link>
            <a href="tel:+79119004477" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">+7 911 900-44-77</a>
            <a href="mailto:info@mem-module.ru" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">info@mem-module.ru</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-[var(--color-text-muted)] text-sm">&copy; 2026 Проект «МЭМ». Лужский район, Ленинградская область</p>
        </div>
      </div>
    </footer>
  );
}
