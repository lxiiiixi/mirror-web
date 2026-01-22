import { useTranslation } from 'react-i18next'

function MobileOnly() {
  const { t } = useTranslation()

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-10 text-center shadow-lg shadow-emerald-100/40 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
        {t('mobileOnly.eyebrow')}
      </p>
      <h2 className="mt-4 text-2xl font-semibold text-slate-900">
        {t('mobileOnly.title')}
      </h2>
      <p className="mt-3 text-sm text-slate-600">
        {t('mobileOnly.description')}
      </p>
    </div>
  )
}

export default MobileOnly
