import { useMemo } from 'react'
import { Infix, useAppWidth } from '@sentre/senhub'

import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { SwiperSlide } from 'swiper/react'
import { SwiperOs } from 'components/swiperOS'
import CardHotAppCard from './cardHotApp'

import { MAX_WIDTH } from 'contant'
import { useSwiperOverflowGaurd } from 'hooks/useOverflowGaurd'

const HEIGHT_RATIO = 0.75
const MOBILE_WIDTH_RATIO = 0.85
const ELEMENT_SPACING = 12
const ITEM_SPACING = 24
const ITEM_BODY_SPACING = 26
const HOT_APPS = [
  'balansol',
  'sen_farming_v2',
  'any_arts',
  'lucky_wheel',
  'lightning_tunnel',
  'solend',
]

const HotApps = () => {
  const width = useAppWidth()
  const swiperWidth = useSwiperOverflowGaurd()

  const slidePerViews = useMemo(() => {
    if (width > MAX_WIDTH) return 4
    if (width > Infix.lg) return 3
    if (width > Infix.md) return 2
    return 1
  }, [width])

  const screenWidth = useMemo(
    () => (width < MAX_WIDTH ? width - ELEMENT_SPACING * 2 : MAX_WIDTH),
    [width],
  )

  const cardHeight = useMemo(() => {
    if (slidePerViews === 1)
      return (width * MOBILE_WIDTH_RATIO - ITEM_BODY_SPACING) * HEIGHT_RATIO

    return (
      ((screenWidth - (slidePerViews - 1) * ITEM_SPACING) / slidePerViews -
        ITEM_BODY_SPACING) *
      HEIGHT_RATIO
    )
  }, [screenWidth, slidePerViews, width])

  return (
    <Row gutter={[24, 12]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={2}>Hot 🔥🔥🔥</Typography.Title>
          </Col>
          <Col>
            <Space>
              {/* Button previous slide */}
              <Button
                shape="circle"
                style={{ border: 'none' }}
                className="swiper-prev-element"
                icon={<IonIcon name="chevron-back-outline" />}
              />
              {/* Button next slide */}
              <Button
                shape="circle"
                style={{ border: 'none' }}
                className="swiper-next-element"
                icon={<IonIcon name="chevron-forward-outline" />}
              />
            </Space>
          </Col>
        </Row>
      </Col>
      {/* Apps in the category */}
      <Col span={24} style={{ width: swiperWidth }}>
        <SwiperOs slidesPerView={slidePerViews}>
          {HOT_APPS.map((appId) => (
            <SwiperSlide key={appId} style={{ paddingTop: 12 }}>
              <CardHotAppCard appId={appId} style={{ height: cardHeight }} />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}

export default HotApps
