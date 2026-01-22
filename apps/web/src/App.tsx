import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import useMediaQuery from './hooks/useMediaQuery'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import UIShowcase from './pages/UIShowcase'
import { AppLayout } from './ui'
import { images } from '@mirror/assets'

function App() {
  const { t, i18n } = useTranslation()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const navigate = useNavigate()
  const location = useLocation()

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
  const activeFooterIndex = location.pathname.startsWith('/ui') ? 1 : 0
  const footerItems = [
    {
      label: t('footer.entertainFI'),
      icon: images.nav.footHome,
      activeIcon: images.nav.footHomeOn,
      position: 'left' as const,
      onClick: () => navigate('/'),
    },
    {
      label: t('footer.home'),
      icon: images.nav.footProfile,
      activeIcon: images.nav.footProfileOn,
      position: 'center' as const,
      onClick: () => navigate('/ui'),
    },
    {
      label: t('footer.kol'),
      icon: images.nav.footDiscover,
      activeIcon: images.nav.footDiscoverOn,
      position: 'right' as const,
    },
  ]

  // 如果是桌面端，先不渲染任何内容（等待重定向）
  if (isDesktop) {
    return null
  }

  return (
    <AppLayout
      showWalletBar={true}
      showPageNav={false}
      languageLabel={t('header.language')}
      assetsLabel={t('header.assets')}
      loginLabel={t('header.connect')}
      isLoggedIn={false}
      onLanguageClick={() =>
        i18n.changeLanguage(currentLanguage === 'en' ? 'zh-hk' : 'en')
      }
      onLogoClick={() => navigate('/')}
      onWalletClick={() => navigate('/')}
      footerItems={footerItems}
      activeFooterIndex={activeFooterIndex}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <main className="flex-1">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<UIShowcase />} path="/ui" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </main>
      </div>
    </AppLayout>
  )
}

export default App
