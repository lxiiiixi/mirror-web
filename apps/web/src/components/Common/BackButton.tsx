import { images } from '@mirror/assets'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function BackButton() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <button
          type="button"
          className="w-[20px] h-[20px] fixed top-[15px] left-[15px] z-50"
          onClick={() => navigate(-1)}
          aria-label={t('ticket.ticketItemCard.back', { defaultValue: 'Back' })}
        >
          <img
            src={images.works.backBtn}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain"
          />
        </button>
  )
}