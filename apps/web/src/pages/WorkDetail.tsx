import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { artsApiClient } from '../api/artsClient'
import { Spinner } from '../ui'
import { resolveImageUrl } from '@mirror/utils'

type WorkDetailData = {
  work_id?: number
  work_type?: number
  work_name?: string
  work_creator_name?: string
  work_cover_url?: string
  work_description?: string
}

function WorkDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const workId = Number(searchParams.get('id') ?? '')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [data, setData] = useState<WorkDetailData | null>(null)

  useEffect(() => {
    if (!workId || Number.isNaN(workId)) {
      setData(null)
      setStatus('error')
      return
    }

    let isMounted = true
    setStatus('loading')

    artsApiClient.work
      .detail({ work_id: workId })
      .then((response) => {
        if (!isMounted) return
        setData(response.data as WorkDetailData)
        setStatus('success')
      })
      .catch(() => {
        if (!isMounted) return
        setStatus('error')
      })

    return () => {
      isMounted = false
    }
  }, [workId])

  const coverUrl = useMemo(
    () => resolveImageUrl(data?.work_cover_url ?? ''),
    [data?.work_cover_url],
  )

  return (
    <div className="px-[15px] pb-[60px] text-white">
      <div className="flex items-center gap-[10px] py-[12px]">
        <button
          type="button"
          className="text-[12px] text-white/80"
          onClick={() => navigate(-1)}
        >
          ← {t('ticket.ticketItemCard.back', { defaultValue: 'Back' })}
        </button>
      </div>

      {status === 'loading' ? (
        <div className="flex justify-center py-[30px]">
          <Spinner size="large" />
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="text-center text-[12px] text-[#999] py-[30px]">
          {t('ticket.empty')}
        </div>
      ) : null}

      {status === 'success' && data ? (
        <div className="flex flex-col gap-[12px]">
          {coverUrl ? (
            <img
              className="w-full rounded-[12px] object-cover bg-[#f5f5f5]"
              src={coverUrl}
              alt={data.work_name ?? 'cover'}
            />
          ) : null}
          <div className="text-[18px] font-semibold">{data.work_name}</div>
          {data.work_creator_name ? (
            <div className="text-[12px] text-white/70">{data.work_creator_name}</div>
          ) : null}
          {data.work_description ? (
            <div className="text-[12px] text-white/80 leading-[18px]">
              {data.work_description}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default WorkDetail
