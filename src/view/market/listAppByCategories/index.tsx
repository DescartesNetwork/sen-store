import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Grid } from 'swiper'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Row, Space, Typography } from 'antd'
import AppCardInfo from 'components/appCardInfo'
import FlexibleCard from 'components/flexibleCard'
import { useUI } from '@sentre/senhub'
import { CategoryOptions, useAppCategory } from '../appCategory/hooks'

const SLICE_PER_VIEW_MOBILE = 1
const SLICE_PER_VIEW_DESKTOP = 4

type ListAppByCategoriesProps = {
  title?: string
  navigation?: boolean
  rows?: number
  spacing?: number
} & CategoryOptions

const ListAppByCategories = ({
  title,
  navigation = false,
  rows = 2,
  spacing = 24,
  ...options
}: ListAppByCategoriesProps) => {
  const {
    ui: { width },
  } = useUI()
  const { title: suggestTitle, appIds: suggestAppIds } = useAppCategory(options)

  const isMobile = width < 768
  const slicePerView = isMobile ? SLICE_PER_VIEW_MOBILE : SLICE_PER_VIEW_DESKTOP

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={2} style={{ textTransform: 'capitalize' }}>
              {title || suggestTitle}
            </Typography.Title>
          </Col>
          {navigation && (
            <Col>
              <Space>
                <Button
                  shape="circle"
                  style={{ border: 'none' }}
                  icon={<IonIcon name="chevron-back-outline" />}
                  className="explore-app-swiper-prev"
                />
                <Button
                  shape="circle"
                  style={{ border: 'none' }}
                  icon={<IonIcon name="chevron-forward-outline" />}
                  className="explore-app-swiper-next"
                />
              </Space>
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24}>
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
          {suggestAppIds.map((appId, idx) => (
            <SwiperSlide key={idx}>
              <FlexibleCard type="green">
                <AppCardInfo appId={appId} radius={12} padding={12} />
              </FlexibleCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </Row>
  )
}

export default ListAppByCategories
