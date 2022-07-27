import { useRegister, useUI } from '@sentre/senhub'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Grid } from 'swiper'

import { Card } from 'antd'
import CardAppCateogry from './cardExploreApp'
import FlexibleCard from 'components/flexibleCard'

import { CategoryOptions, useAppCategory } from '../listAppByCategories/hooks'
import { useMemo } from 'react'

type ListExploreAppProps = {
  seeAll?: boolean
  spacing?: number
  rows?: number
} & CategoryOptions
const ListExploreApp = ({
  seeAll = false,
  rows = 2,
  spacing = 48,
  ...options
}: ListExploreAppProps) => {
  const register = useRegister()
  const { appIds } = useAppCategory(options)
  const {
    ui: { width },
  } = useUI()
  const { category } = options

  const listAppId =
    seeAll || category === 'all' ? Object.keys(register) : appIds

  const calSlicePerView = useMemo(() => {
    if (width < 768) return 1
    if (width < 991) return 2
    if (width < 1200) return 3
    return 4
  }, [width])

  return (
    <FlexibleCard type="green">
      <Card bordered={false}>
        <Swiper
          modules={[Grid, Navigation]}
          grid={{ rows: rows, fill: 'row' }}
          slidesPerView={calSlicePerView}
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
