import { useMemo, useState } from 'react'
import { images } from '@mirror/assets'

export interface DirectoryProps {
  total?: number
  active?: number
  progress?: number
  expand?: boolean
  onChange?: (page: number) => void
  onBuyChapter?: (page: number) => void
}

type DirectoryItem = {
  name: number | string
  type: 'page' | 'expand'
  lock: boolean
}

export function Directory({
  total = 0,
  active = 0,
  progress = 0,
  expand = false,
  onChange,
  onBuyChapter,
}: DirectoryProps) {
  const [showAllPages, setShowAllPages] = useState(false)

  const items = useMemo<DirectoryItem[]>(() => {
    const list: DirectoryItem[] = []
    const shouldShowAll = showAllPages || total <= 16 || expand
    if (shouldShowAll) {
      for (let i = 1; i <= total; i += 1) {
        list.push({
          name: i,
          type: 'page',
          lock: i > progress,
        })
      }
      return list
    }

    for (let i = 1; i <= 16; i += 1) {
      list.push({
        name: i === 16 ? '...' : i,
        type: i === 16 ? 'expand' : 'page',
        lock: i > progress && i !== 16,
      })
    }
    return list
  }, [expand, progress, showAllPages, total])

  const handleClick = (item: DirectoryItem) => {
    if (item.type === 'expand') {
      setShowAllPages(true)
      return
    }
    if (item.lock) {
      if (typeof item.name === 'number') {
        onBuyChapter?.(item.name)
      }
      return
    }
    if (typeof item.name === 'number') {
      onChange?.(item.name)
    }
  }

  if (total <= 1) return null

  return (
    <div className="grid grid-cols-8 gap-x-[5px] gap-y-[8px]">
      {items.map((item) => (
        <button
          key={`${item.type}-${item.name}`}
          type="button"
          className={`relative flex h-[36px] w-[36px] items-center justify-center rounded-[9px] border border-[#606170] text-[14px] text-white ${
            active === item.name ? 'bg-[linear-gradient(149.62deg,#eb1484_-7.48%,#c81cc5_100.27%)] shadow-[0_2px_11px_rgba(214,25,172,0.6)] border-transparent' : 'bg-[#060820]'
          }`}
          onClick={() => handleClick(item)}
        >
          {item.lock ? (
            <img
              className="absolute right-[4px] top-[4px] h-[8px] w-[8px]"
              src={images.works.lock}
              alt=""
              aria-hidden="true"
            />
          ) : null}
          {item.name}
        </button>
      ))}
    </div>
  )
}
