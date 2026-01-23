import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Notice } from '../ui'

function Home() {
  const { t } = useTranslation()

  return (
    <div className="">
      {/* <Notice message={t('notice.defaultMessage')} /> */}
      <div className="w-full h-[1200px] bg-red-100"></div>
    </div>
  )
}

export default Home
