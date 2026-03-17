const sizeClasses = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className="flex items-center justify-center" role="status" aria-label="Загрузка">
      <div className={`${sizeClasses[size]} border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}
