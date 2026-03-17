import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> { children: ReactNode; hoverable?: boolean; }

export function Card({ children, hoverable = true, className = '', ...rest }: CardProps) {
  return (
    <div className={`rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] backdrop-blur-sm transition-all duration-300 ${hoverable ? 'hover:-translate-y-2 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary-glow)]' : ''} ${className}`} {...rest}>
      {children}
    </div>
  );
}
