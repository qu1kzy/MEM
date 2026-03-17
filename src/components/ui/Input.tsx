import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...rest }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">{label}</label>}
        <input
          ref={ref} id={inputId} aria-invalid={!!error} aria-describedby={errorId}
          className={`w-full px-4 py-3 min-h-[44px] rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] transition-colors duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] focus:outline-none ${error ? 'border-[var(--color-error)]' : ''} ${className}`}
          {...rest}
        />
        {error && <p id={errorId} role="alert" className="text-sm text-[var(--color-error)]">{error}</p>}
        {hint && !error && <p className="text-sm text-[var(--color-text-muted)]">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
