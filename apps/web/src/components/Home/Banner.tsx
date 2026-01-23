import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Banner as UIBanner } from '../../ui'
import type { BannerItem } from '../../ui'

interface HomeBannerProps {
  autoplay?: boolean
  interval?: number
  className?: string
}

type BannerLocaleItem = {
  id?: string | number
  img: string
  link?: string
  alt?: string
}

export function Banner({ autoplay = false, interval = 6000, className = '' }: HomeBannerProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const banners = useMemo<BannerItem[]>(() => {
    // 路径配置在 locales/en.json 中
    const raw = t('banners', { returnObjects: true }) as BannerLocaleItem[] | string
    console.log('[Home_Banner] raw', raw)
    if (!Array.isArray(raw)) return []
    return raw.map((item, index) => ({
      id: item.id ?? index,
      img: item.img, // url
      link: item.link,
      alt: item.alt,
    }))
  }, [t, i18n.language, i18n.resolvedLanguage])

  const handleCardClick = (banner: BannerItem) => {
    if (!banner.link) return
    if (/^https?:\/\//i.test(banner.link)) {
      window.location.href = banner.link
      return
    }
    navigate(banner.link)
  }

  return (
    <UIBanner
      className={className}
      banners={banners}
      autoplay={autoplay}
      interval={interval}
      onCardClick={handleCardClick}
    />
  )
}
