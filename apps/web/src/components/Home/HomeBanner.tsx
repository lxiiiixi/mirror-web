import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Banner as UIBanner } from '../../ui'
import type { BannerItem } from '../../ui'
// import banner1 from '@mirror/assets/images/home/banner/banner1.png'
// import banner2 from '@mirror/assets/images/home/banner/banner2.png'
// import banner3 from '@mirror/assets/images/home/banner/banner3.png'
// import banner4 from '@mirror/assets/images/home/banner/banner4.png'
// import banner5 from '@mirror/assets/images/home/banner/banner5.png'
// import banner1Cn from '@mirror/assets/images/home/banner/banner1_cn.png'
// import banner2Cn from '@mirror/assets/images/home/banner/banner2_cn.png'
// import banner3Cn from '@mirror/assets/images/home/banner/banner3_cn.png'
// import banner4Cn from '@mirror/assets/images/home/banner/banner4_cn.png'
// import banner5Cn from '@mirror/assets/images/home/banner/banner5_cn.png'
import { images } from '@mirror/assets'

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

const bannerSrcMap: Record<string, string> = {
  'banner1': images.banner.banner1,
  'banner2': images.banner.banner2,
  'banner3': images.banner.banner3,
  'banner4': images.banner.banner4,
  'banner5': images.banner.banner5,
  'banner1_cn': images.banner.banner1Cn,
  'banner2_cn': images.banner.banner2Cn,
  'banner3_cn': images.banner.banner3Cn,
  'banner4_cn': images.banner.banner4Cn,
  'banner5_cn': images.banner.banner5Cn,
}

const resolveBannerSrc = (src: string) => {
  if (src in bannerSrcMap) return bannerSrcMap[src]
  return src
}

export function Banner({ autoplay = false, interval = 6000, className = '' }: HomeBannerProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const banners = useMemo<BannerItem[]>(() => {
    // 路径配置在 locales/en.json 中
    const raw = t('banners', { returnObjects: true }) as BannerLocaleItem[] | string
    if (!Array.isArray(raw)) return []
    return raw.map((item, index) => ({
      id: item.id ?? index,
      img: resolveBannerSrc(item.img),
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
