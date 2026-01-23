import { useTranslation } from 'react-i18next'
import { Notice } from '../ui'
import { HomeBanner } from '../components'

function Home() {
  const { t } = useTranslation()

  return (
    <div className="">
      <Notice message={t('notice.defaultMessage')} />
      <HomeBanner autoplay={true} interval={4000} />
      <div className="w-full h-[1200px] bg-red-100"></div>
    </div>
  )
}

export default Home
