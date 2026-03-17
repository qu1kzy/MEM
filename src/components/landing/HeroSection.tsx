import { useToast } from '@/components/ui/ToastContext';
import { contacts } from '@/data/contacts';

export function HeroSection() {
  const { toast } = useToast();

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => toast(message, 'success'));
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-bg)] text-center overflow-hidden pt-24 pb-16 px-4" id="hero">
      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-black text-[var(--color-text)] tracking-wider uppercase mb-3">
          М<span className="text-[var(--color-primary)]">Э</span>М
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-primary)] font-light tracking-widest uppercase mb-10">
          Вода · Тепло · Электричество · Автономно
        </p>
        <div className="max-w-xl mx-auto rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-2xl mb-10">
          <img src="/images/product.jpg" alt="Многофункциональный Энергетический Модуль МЭМ" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {contacts.map((c) => (
            <button key={c.value} onClick={() => copyToClipboard(c.copyText, c.copyMessage)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-glass)] backdrop-blur-sm border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:-translate-y-1 transition-all duration-200 text-[var(--color-text)] min-h-[44px]">
              <span className="text-[var(--color-primary)]">
                {c.icon === 'phone' && '📞'}
                {c.icon === 'envelope' && '✉️'}
                {c.icon === 'telegram' && '💬'}
                {c.icon === 'location' && '📍'}
              </span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
