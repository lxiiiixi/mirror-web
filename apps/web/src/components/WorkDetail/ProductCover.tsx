import { useState } from 'react'
import { resolveImageUrl } from '@mirror/utils'

export interface ProductCoverProps {
  coverUrl?: string
  title?: string
  author?: string
  description?: string
}

export function ProductCover({
  coverUrl = '',
  title = '',
  author = '',
  description = '',
}: ProductCoverProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div id="product-cover" className={expanded ? '' : 'flex items-start gap-[12px]'}>
      {coverUrl ? (
        <img
          className={`rounded-[6px] border border-white/80 object-contain bg-[#f5f5f5] ${
            expanded
              ? 'float-left w-[120px] mr-[12px] mb-[6px]'
              : 'w-[120px] min-w-[120px]'
          }`}
          src={resolveImageUrl(coverUrl)}
          alt={title}
        />
      ) : null}
      <div className={expanded ? '' : 'flex flex-col gap-[6px]'}>
        <div className={`text-[16px] font-semibold ${expanded ? '' : 'line-clamp-1'}`}>
          {title}
        </div>
        <div className={`text-[12px] text-white/70 ${expanded ? '' : 'line-clamp-1'}`}>
          {author}
        </div>
        {description ? (
          <div
            className={`text-[12px] leading-[16px] text-white/70 cursor-pointer ${
              expanded ? '' : 'line-clamp-7'
            }`}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {description}
          </div>
        ) : null}
      </div>
      {expanded ? <div className="clear-both" /> : null}
    </div>
  )
}
