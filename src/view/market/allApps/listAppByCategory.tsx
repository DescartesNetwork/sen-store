import { useAppIds } from '@sentre/senhub'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Grid } from 'swiper'

import { Card } from 'antd'
import CardAppCateogry from './cardAppCateogry'

import { CategoryOptions, useAppCategory } from '../appCategory/hooks'

type AppByCategoryProps = {
  seeAll?: boolean
  spacing?: number
  slicePerView?: number
  rows?: number
} & CategoryOptions
const ListAppByCategory = ({
  seeAll = false,
  rows = 2,
  slicePerView = 4,
  spacing = 48,
  ...options
}: AppByCategoryProps) => {
  const allAppIds = useAppIds()
  const { appIds } = useAppCategory(options)
  const { category } = options

  const listAppId = seeAll || category === 'all' ? allAppIds : appIds

  return (
    <Card bordered={false}>
      <Swiper
        modules={[Grid, Navigation]}
        grid={{ rows: rows, fill: 'row' }}
        slidesPerView={slicePerView}
        spaceBetween={spacing}
        navigation
        className="apps-grid-view"
      >
        {listAppId.map((appId, idx) => (
          <SwiperSlide key={idx}>
            <CardAppCateogry appId={appId} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  )
}

export default ListAppByCategory
