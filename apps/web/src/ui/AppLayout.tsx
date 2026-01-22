import { HTMLAttributes, ReactNode, forwardRef } from 'react'
import { images } from '@mirror/assets'

export interface AppLayoutFooterItem {
  label: ReactNode
  icon: string
  activeIcon?: string
  position?: 'left' | 'center' | 'right'
  key?: string | number
  onClick?: () => void
}

export interface AppLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Main content
   */
  children: ReactNode

  /**
   * Header display
   */
  showWalletBar?: boolean
  showPageNav?: boolean
  hideHeader?: boolean
  scrollShadow?: boolean

  /**
   * Header content
   */
  pageTitle?: ReactNode
  headerRight?: ReactNode
  languageLabel?: ReactNode
  assetsLabel?: ReactNode
  loginLabel?: ReactNode
  isLoggedIn?: boolean
  langIconSrc?: string
  logoSrc?: string
  backIconSrc?: string

  /**
   * Header actions
   */
  onLanguageClick?: () => void
  onLogoClick?: () => void
  onWalletClick?: () => void
  onBack?: () => void

  /**
   * Footer items
   */
  footerItems?: AppLayoutFooterItem[]
  activeFooterIndex?: number
  showFooter?: boolean
}

const HEADER_HEIGHT = 45
const FOOTER_HEIGHT = 86

/**
 * AppLayout component
 * Provides fixed header and footer with a scrollable middle area
 */
export const AppLayout = forwardRef<HTMLDivElement, AppLayoutProps>(
  (
    {
      children,
      showWalletBar = true,
      showPageNav = false,
      hideHeader = false,
      scrollShadow = false,
      pageTitle,
      headerRight,
      languageLabel = 'Language',
      assetsLabel = 'Assets',
      loginLabel = 'Login',
      isLoggedIn = false,
      langIconSrc = images.nav.lang,
      logoSrc = images.logo,
      backIconSrc = images.works.backBtn,
      onLanguageClick,
      onLogoClick,
      onWalletClick,
      onBack,
      footerItems = [],
      activeFooterIndex = 0,
      showFooter = true,
      className = '',
      ...props
    },
    ref,
  ) => {
    const shouldShowHeader = showWalletBar || showPageNav
    const shouldShowFooter = showFooter && footerItems.length > 0
    const contentPaddingTop = shouldShowHeader ? HEADER_HEIGHT : 0
    const contentPaddingBottom = shouldShowFooter ? FOOTER_HEIGHT : 0

    return (
      <div ref={ref} className={`app-layout ${className}`} {...props}>
        {shouldShowHeader ? (
          <div className={`header ${shouldShowHeader ? 'is-show' : ''}`}>
            <div
              className={`wrapper transition ${scrollShadow ? 'scroll-shadow' : ''} ${
                hideHeader ? 'hide-header' : ''
              }`}
            >
              {showWalletBar ? (
                <>
                  <button className="header-item" type="button" onClick={onLanguageClick}>
                    {langIconSrc ? (
                      <img className="lang-icon" src={langIconSrc} alt="" aria-hidden="true" />
                    ) : null}
                    <span className="lang">{languageLabel}</span>
                  </button>

                  <div className="nav-item-logo">
                    <button className="logo" type="button" onClick={onLogoClick} aria-label="Home">
                      {logoSrc ? <img src={logoSrc} alt="" aria-hidden="true" /> : null}
                    </button>
                  </div>

                  <button className="header-item connector" type="button" onClick={onWalletClick}>
                    <span className={`connect-btn ${isLoggedIn ? 'assets' : ''}`}>
                      <span className="text">{isLoggedIn ? assetsLabel : loginLabel}</span>
                    </span>
                  </button>
                </>
              ) : null}

              {showPageNav ? (
                <>
                  <button className="page-back" type="button" onClick={onBack} aria-label="Back">
                    {backIconSrc ? (
                      <img src={backIconSrc} alt="" aria-hidden="true" />
                    ) : null}
                  </button>
                  <div className="page-title">{pageTitle}</div>
                  <div className="header-right">{headerRight}</div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <main
          className="content"
          style={{
            paddingTop: `${contentPaddingTop}px`,
            paddingBottom: `${contentPaddingBottom}px`,
          }}
        >
          {children}
        </main>

        {shouldShowFooter ? (
          <footer
            className="footer-nav"
            style={{ backgroundImage: `url(${images.nav.footBarBg})` }}
          >
            {footerItems.map((item, index) => {
              const isActive = index === activeFooterIndex
              const positionClass = item.position ? `${item.position}-nav` : ''
              const iconSrc = isActive ? item.activeIcon || item.icon : item.icon
              return (
                <button
                  key={item.key ?? index}
                  type="button"
                  className={`nav-item ${positionClass} ${isActive ? 'active' : ''}`}
                  onClick={item.onClick}
                >
                  <span className="pr-icon">
                    <img className="nav-icon" src={iconSrc} alt="" aria-hidden="true" />
                  </span>
                  <span className="pr-text">
                    <span className="nav-text">{item.label}</span>
                  </span>
                </button>
              )
            })}
          </footer>
        ) : null}

        <style jsx>{`
          .app-layout {
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .content {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
          }

          .header {
            position: relative;
            font-family: var(--font-primary);
            color: #fff;
            z-index: 99;
          }

          .wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 999;
            padding: 0 15px;
            height: ${HEADER_HEIGHT}px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.4s;
          }

          .wrapper.scroll-shadow {
            background: rgb(18 9 44 / 90%);
          }

          .hide-header {
            transform: translateY(-${HEADER_HEIGHT}px);
          }

          .header-item {
            width: 90px;
            height: 27px;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 500;
            padding: 0;
            border: none;
            background: transparent;
            color: inherit;
            cursor: pointer;
          }

          .header-item .connect-btn {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-primary);
            border-radius: 4px;
          }

          .header-item .connect-btn.assets {
            background: var(--gradient-primary);
          }

          .nav-item-logo {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .logo {
            cursor: pointer;
            width: 119px;
            height: 31px;
            border: none;
            background: transparent;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }

          .lang-icon {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }

          .lang {
            font-size: 12px;
            font-weight: 700;
          }

          .connector .text {
            font-size: 12px;
            font-weight: 700;
            line-height: 16px;
            text-align: left;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }

          .page-back {
            z-index: 10;
            width: 20px;
            height: 20px;
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .page-back img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }

          .page-title {
            flex: 1;
            text-align: center;
            font-family: var(--font-primary);
            font-size: 16px;
            font-weight: 700;
            color: #fff;
          }

          .header-right {
            position: absolute;
            right: 10px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          .footer-nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 265px;
            height: ${FOOTER_HEIGHT}px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            position: fixed;
            z-index: 90;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            border: none;
          }

          .footer-nav .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            background: transparent;
            border: none;
          }

          .pr-icon {
            position: relative;
            width: 72px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .pr-text {
            position: relative;
            width: 72px;
            height: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .footer-nav .nav-icon {
            margin-top: 13px;
            width: 25px;
            height: 25px;
          }

          .footer-nav .nav-text {
            font-size: 12px;
            color: rgba(252, 252, 252, 1);
          }

          .footer-nav .nav-item.active .nav-icon {
            margin-top: 15px;
            width: 44px;
            height: 44px;
          }

          .footer-nav .nav-item.active .nav-text {
            color: rgba(255, 38, 150, 1);
          }

          .footer-nav .left-nav {
            margin-left: 20px;
          }

          .footer-nav .right-nav {
            margin-right: 20px;
          }

          .footer-nav .center-nav .nav-icon {
            margin-top: -2px;
            width: 43px;
            height: 43px;
          }

          .footer-nav .center-nav.active .nav-icon {
            margin-top: -2px;
            width: 62px;
            height: 62px;
          }
        `}</style>
      </div>
    )
  },
)

AppLayout.displayName = 'AppLayout'
