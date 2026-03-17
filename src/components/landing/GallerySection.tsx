import { useState } from 'react';
import { galleryImages } from '@/data/gallery';

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null);
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % galleryImages.length : null);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="gallery">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 border-l-4 border-[var(--color-primary)] pl-5 text-[var(--color-text)]">Галерея</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((img, i) => (
          <button key={img.src} onClick={() => setLightboxIndex(i)}
            className="h-64 rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500" loading="lazy" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onKeyDown={(e) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); }}
          tabIndex={0} role="dialog" aria-modal="true" aria-label="Просмотр изображения">
          <button onClick={close} className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[var(--color-glass)] border border-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors z-10" aria-label="Закрыть">✕</button>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--color-glass)] border border-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors z-10" aria-label="Предыдущее">‹</button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--color-glass)] border border-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors z-10" aria-label="Следующее">›</button>
          <img src={galleryImages[lightboxIndex]!.src} alt={galleryImages[lightboxIndex]!.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl border-2 border-[var(--color-primary)]" />
        </div>
      )}
    </section>
  );
}
