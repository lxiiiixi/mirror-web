import { resolveImageUrl } from '@mirror/utils'
import { TokenAvatar } from '../Common/TokenAvatar'

export interface ProductShareProps {
  coverUrl?: string
  tokenCoverUrl?: string
  tokenName?: string
  tokenBalance?: number | string
  showTokenBorder?: boolean | number | null
}

export function ProductShare({
  coverUrl = '',
  tokenCoverUrl = '',
  tokenName = '',
  tokenBalance,
  showTokenBorder,
}: ProductShareProps) {
  return (
    <div className="relative overflow-hidden rounded-[12px]">
      {coverUrl ? (
        <img
          className="absolute z-1 top-0 left-0 w-full h-full object-cover bg-[#f5f5f5]"
          src={resolveImageUrl(coverUrl)}
          alt="cover"
        />
      ) : null}
      <div className="relative z-10 bg-black/70 px-[15px] py-[20px]">
        <TokenAvatar
          src={tokenCoverUrl}
          showTokenBorder={Boolean(showTokenBorder)}
          size={80}
          imageSize={65}
        />
        <div className="mt-[8px] flex items-center justify-center gap-[10px] text-[16px] font-semibold text-[#eee]">
          {tokenBalance !== undefined && tokenBalance !== null ? (
            <span>{tokenBalance}</span>
          ) : null}
          <span>{tokenName}</span>
        </div>
      </div>
    </div>
  )
}
