import { useMemo } from 'react'
import { images } from '@mirror/assets'

export interface ExternalLinkItem {
  link_id: number
  link_url: string
  link_type: string
}

export interface ExternalLinkProps {
  links?: ExternalLinkItem[]
}

const normalizeType = (value: string) => value.trim().toLowerCase()

const typeIconMap: Record<string, string> = {
  twitter: images.works.twLogo,
  x: images.works.twLogo,
  '1': images.works.twLogo,
  youtube: images.works.youtubeLogo,
  '2': images.works.youtubeLogo,
  instagram: images.works.insLogo,
  '3': images.works.insLogo,
  facebook: images.works.fbLogo,
  '4': images.works.fbLogo,
}

export function ExternalLink({ links = [] }: ExternalLinkProps) {
  const mapped = useMemo(() => {
    return links
      .map((item) => {
        const key = normalizeType(item.link_type)
        const icon = typeIconMap[key]
        return icon
          ? {
              ...item,
              icon,
            }
          : null
      })
      .filter(Boolean) as Array<ExternalLinkItem & { icon: string }>
  }, [links])

  if (mapped.length === 0) return null

  return (
    <div className="flex justify-end gap-[6px]">
      {mapped.map((item) => (
        <button
          key={item.link_id}
          type="button"
          className="h-[24px] w-[24px]"
          onClick={() => window.open(item.link_url, '_blank', 'noopener,noreferrer')}
        >
          <img className="h-full w-full" src={item.icon} alt="" aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
