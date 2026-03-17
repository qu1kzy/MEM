import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectOption { value: string; label: string; }

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, className = '', ...rest }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-text)]">{label}</label>}
        <select
          ref={ref} id={selectId} aria-invalid={!!error}
          className={`w-full px-4 py-3 min-h-[44px] rounded-lg appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] transition-colors duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] focus:outline-none ${error ? 'border-[var(--color-error)]' : ''} ${className}`}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {error && <p role="alert" className="text-sm text-[var(--color-error)]">{error}</p>}
      </div>
    );
  },
);
Select.displayName = 'Select';
