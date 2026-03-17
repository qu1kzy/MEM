import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { galleryImages } from '@/data/gallery';
import { AnimatedSection } from '@/components/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), []);
  const next = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % galleryImages.length : null), []);

  return (
    <AnimatedSection>
      <section className="py-24 px-4 bg-[var(--color-surface)]/30" id="gallery">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 mb-4">
              Фото
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">Галерея</h2>
            <p className="mt-3 text-[var(--color-text-muted)] max-w-xl mx-auto">
              МЭМ в реальных условиях эксплуатации
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightboxIndex(i)}
                className="group relative h-64 rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 cursor-pointer hover:shadow-[0_8px_30px_var(--color-primary-glow)]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-sm font-medium">{img.alt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => { if (e.target === e.currentTarget) close(); }}
              onKeyDown={(e) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); }}
              tabIndex={0}
              role="dialog"
              aria-modal="true"
              aria-label="Просмотр изображения"
            >
              <button onClick={close} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10 text-xl" aria-label="Закрыть">&times;</button>
              <button onClick={prev} className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10 text-2xl" aria-label="Предыдущее">&lsaquo;</button>
              <button onClick={next} className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10 text-2xl" aria-label="Следующее">&rsaquo;</button>
              <motion.img
                key={lightboxIndex}
                src={galleryImages[lightboxIndex]!.src}
                alt={galleryImages[lightboxIndex]!.alt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === lightboxIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                    aria-label={`Изображение ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </AnimatedSection>
  );
}
