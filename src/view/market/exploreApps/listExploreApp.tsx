import { useMemo } from 'react'
import { Infix, useRegister, useWidth } from '@sentre/senhub'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Grid } from 'swiper'

import { Card } from 'antd'
import CardAppCateogry from './cardExploreApp'
import FlexibleCard from 'components/flexibleCard'

import { CategoryOptions, useAppCategory } from '../listAppByCategories/hooks'

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
  const width = useWidth()
  const { category } = options

  const listAppId =
    seeAll || category === 'all' ? Object.keys(register) : appIds

  const calSlicePerView = useMemo(() => {
    if (width < Infix.md) return 1
    if (width < Infix.lg) return 2
    if (width < 1390) return 3
    return 4
  }, [width])

  return (
    <FlexibleCard type="green">
      <Card bordered={false} style={{ boxShadow: 'none' }}>
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
