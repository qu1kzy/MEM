export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[var(--color-text)]">Политика конфиденциальности</h1>
      <div className="prose text-[var(--color-text-muted)] space-y-4">
        <p>Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта МЭМ.</p>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mt-6">1. Сбор информации</h2>
        <p>Мы собираем информацию, которую вы предоставляете при заполнении форм на сайте: имя, контактные данные, данные заявок.</p>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mt-6">2. Использование информации</h2>
        <p>Собранная информация используется для обработки заявок, связи с клиентами и улучшения качества обслуживания.</p>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mt-6">3. Защита данных</h2>
        <p>Мы принимаем необходимые организационные и технические меры для защиты персональных данных.</p>
      </div>
    </div>
  );
}
