import { useTranslation } from 'react-i18next'
import { Notice } from '../ui'
import { HomeBanner } from '../components'

function Home() {
  const { t } = useTranslation()

  return (
    <div className="">
      <Notice message={t('notice.defaultMessage')} />
      <HomeBanner autoplay={true} interval={4000} />
      {/* 在这里加一个 Tab 组件，用于切换 RWA 和 Token ，内容都从 work 列表中筛选出来 */}
      <div className="w-full h-[1200px] bg-red-100">
        {/* 列表展示 */}
      </div>
    </div>
  )
}

export default Home
