import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Route, Routes } from 'react-router-dom'
import useMediaQuery from './hooks/useMediaQuery'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Status from './pages/Status'
import UIShowcase from './pages/UIShowcase'
import { Button } from './ui'

function App() {
  const { t, i18n } = useTranslation()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // 桌面端自动重定向到白皮书网站
  useEffect(() => {
    if (isDesktop) {
      window.location.href = 'https://whitepaper.mirror.fan/'
    }
  }, [isDesktop])

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? 'en'
  }, [i18n.resolvedLanguage])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full border px-4 py-2 text-sm font-semibold transition',
      isActive
        ? 'border-slate-900 bg-slate-900 text-white shadow shadow-slate-900/20'
        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900',
    ].join(' ')

  const currentLanguage = i18n.resolvedLanguage ?? 'en'

  // 如果是桌面端，先不渲染任何内容（等待重定向）
  if (isDesktop) {
    return null
  }

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:items-end">
            <nav className="flex flex-wrap gap-3">
              <NavLink className={navLinkClass} to="/">
                {t('app.nav.overview')}
              </NavLink>
              <NavLink className={navLinkClass} to="/status">
                {t('app.nav.status')}
              </NavLink>
              <NavLink className={navLinkClass} to="/ui">
                UI
              </NavLink>
            </nav>
          </div>
          {["en", "zh-CN"].map((language) => language !== currentLanguage && (
              <Button
                key={language}
                fullWidth={false}
                rounded
                onClick={() => i18n.changeLanguage(language)}
              >
                {language}  
              </Button>
            ))}
        </header>

        <main className="flex-1">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Status />} path="/status" />
            <Route element={<UIShowcase />} path="/ui" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
