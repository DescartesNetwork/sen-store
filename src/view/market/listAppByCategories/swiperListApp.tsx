import { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Grid } from 'swiper'
import { useUI } from '@sentre/senhub'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Row, Space, Typography } from 'antd'
import AppCardInfo from 'components/appCardInfo'
import FlexibleCard from 'components/flexibleCard'

import { CategoryOptions, useAppCategory } from './hooks'

type SwiperListAppProps = {
  title?: string
  navigation?: boolean
  rows?: number
  spacing?: number
} & CategoryOptions
const SwiperListApp = ({
  title,
  navigation = false,
  rows = 2,
  spacing = 24,
  ...options
}: SwiperListAppProps) => {
  const {
    ui: { width },
  } = useUI()
  const { title: suggestTitle, appIds: suggestAppIds } = useAppCategory(options)

  const { title: displayTitle, lowerTitle } = useMemo(() => {
    const nextTitle = title || suggestTitle
    const lowerTitle = nextTitle.toLowerCase().replace(/\s/g, '-')
    return { title: nextTitle, lowerTitle }
  }, [suggestTitle, title])

  const slicePerView = useMemo(() => {
    if (width < 768) return 1
    if (width < 991) return 2
    if (width < 1390) return 3
    return 4
  }, [width])

  return (
    <Row gutter={[24, 12]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={2} style={{ textTransform: 'capitalize' }}>
              {displayTitle}
            </Typography.Title>
          </Col>
          {navigation && (
            <Col>
              <Space>
                <Button
                  shape="circle"
                  style={{ border: 'none' }}
                  icon={<IonIcon name="chevron-back-outline" />}
                  className={`${lowerTitle}-explore-app-swiper-prev`}
                />
                <Button
                  shape="circle"
                  style={{ border: 'none' }}
                  icon={<IonIcon name="chevron-forward-outline" />}
                  className={`${lowerTitle}-explore-app-swiper-next`}
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
            nextEl: `.${lowerTitle}-explore-app-swiper-next`,
            prevEl: `.${lowerTitle}-explore-app-swiper-prev`,
          }}
          style={{ paddingTop: 12 }}
          className="apps-grid-view"
        >
          {suggestAppIds.map((appId, idx) => (
            <SwiperSlide key={idx}>
              <FlexibleCard type="green" className="hoverable-transform">
                <AppCardInfo appId={appId} radius={12} padding={12} />
              </FlexibleCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </Row>
  )
}

export default SwiperListApp
