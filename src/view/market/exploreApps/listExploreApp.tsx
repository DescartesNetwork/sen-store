import { useAppIds } from '@sentre/senhub'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Grid } from 'swiper'

import { Card } from 'antd'
import CardAppCateogry from './cardExploreApp'
import FlexibleCard from 'components/flexibleCard'

import { CategoryOptions, useAppCategory } from '../appCategory/hooks'

type ListExploreAppProps = {
  seeAll?: boolean
  spacing?: number
  slicePerView?: number
  rows?: number
} & CategoryOptions
const ListExploreApp = ({
  seeAll = false,
  rows = 2,
  slicePerView = 4,
  spacing = 48,
  ...options
}: ListExploreAppProps) => {
  const allAppIds = useAppIds()
  const { appIds } = useAppCategory(options)
  const { category } = options

  const listAppId = seeAll || category === 'all' ? allAppIds : appIds

  return (
    <FlexibleCard type="green">
      <Card bordered={false}>
        <Swiper
          modules={[Grid, Navigation]}
          grid={{ rows: rows, fill: 'row' }}
          slidesPerView={slicePerView}
          spaceBetween={spacing}
          navigation={{
            nextEl: '.explore-app-swiper-next',
            prevEl: '.explore-app-swiper-prev',
          }}
          className="apps-grid-view"
        >
          {listAppId.map((appId, idx) => (
            <SwiperSlide key={idx}>
              <CardAppCateogry appId={appId} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Card>
    </FlexibleCard>
  )
}

export default ListExploreApp
