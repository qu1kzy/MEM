import { specs } from '@/data/specs';

export function TechSpecsSection() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="specs">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 border-l-4 border-[var(--color-primary)] pl-5 text-[var(--color-text)]">Характеристики</h2>
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] backdrop-blur-sm p-8 flex flex-wrap justify-between gap-8">
        {specs.map((s) => (
          <div key={s.label} className="flex-1 min-w-[200px] text-center">
            <div className="text-[var(--color-primary)] font-bold uppercase text-sm mb-2">{s.label}</div>
            <div className="text-2xl font-light text-[var(--color-text)]">{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
