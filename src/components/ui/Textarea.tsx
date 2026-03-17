import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = '', ...rest }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">{label}</label>}
        <textarea
          ref={ref} id={inputId} aria-invalid={!!error} aria-describedby={errorId}
          className={`w-full px-4 py-3 min-h-[100px] rounded-lg resize-y bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] transition-colors duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] focus:outline-none ${error ? 'border-[var(--color-error)]' : ''} ${className}`}
          {...rest}
        />
        {error && <p id={errorId} role="alert" className="text-sm text-[var(--color-error)]">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
