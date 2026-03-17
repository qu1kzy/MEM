import { forwardRef, type InputHTMLAttributes } from 'react';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  price?: number;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, price, className = '', ...rest }, ref) => {
    return (
      <label className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)] transition-all duration-200 has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-[var(--color-primary-glow)] min-h-[44px] ${className}`}>
        <input ref={ref} type="radio" className="mt-1 w-5 h-5 accent-[var(--color-primary)] flex-shrink-0" {...rest} />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-[var(--color-text)]">{label}</span>
            {price !== undefined && <span className="text-sm font-semibold text-[var(--color-primary)] whitespace-nowrap">{price.toLocaleString('ru-RU')} ₽</span>}
          </div>
          {description && <p className="text-sm text-[var(--color-text-muted)] mt-1">{description}</p>}
        </div>
      </label>
    );
  },
);
Radio.displayName = 'Radio';
