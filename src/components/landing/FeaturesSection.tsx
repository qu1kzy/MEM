import { features } from '@/data/features';
import { Card } from '@/components/ui';

const iconMap: Record<string, string> = {
  bolt: '⚡', 'fire-extinguisher': '🧯', droplet: '💧', truck: '🚛', snowflake: '❄️', leaf: '🌿',
};

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="features">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 border-l-4 border-[var(--color-primary)] pl-5 text-[var(--color-text)]">Возможности</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <Card key={f.title}>
            <div className="text-3xl mb-4">{iconMap[f.icon] || '🔧'}</div>
            <h3 className="text-lg font-bold mb-3 text-[var(--color-text)]">{f.title}</h3>
            <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">{f.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
