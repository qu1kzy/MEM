import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps { isOpen: boolean; onClose: () => void; title?: string; children: ReactNode; }

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      dialogRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      previousFocus.current?.focus();
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-6">
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text)]">{title}</h2>
            <button onClick={onClose} aria-label="Закрыть" className="p-2 rounded-lg hover:bg-[var(--color-glass)] text-[var(--color-text-muted)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">✕</button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
