import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useFocusReturn } from '@/hooks/useFocusReturn';

interface ModalProps { isOpen: boolean; onClose: () => void; title?: string; children: ReactNode; }

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useFocusTrap<HTMLDivElement>(isOpen);
  useFocusReturn(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined} aria-label={title ? undefined : 'Диалоговое окно'} tabIndex={-1}
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-6">
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-xl font-bold text-[var(--color-text)]">{title}</h2>
            <button onClick={onClose} aria-label="Закрыть" className="p-2 rounded-lg hover:bg-[var(--color-glass)] text-[var(--color-text-muted)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">✕</button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
