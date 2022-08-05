import { useMemo } from 'react'
import { useRegister, useUI } from '@sentre/senhub'
import { SwiperOs } from 'components/swiperOS'
import { SwiperSlide } from 'swiper/react'

import { Button, Col, Row, Space, Typography } from 'antd'
import CardHotAppCard from './cardHotApp'
import IonIcon from '@sentre/antd-ionicon'

const SENTRE_TAG = 'sentre'
const HEIGHT_RATIO = 0.75
const MOBILE_WIDTH_RATIO = 0.85
const SCREEN_RATIO = 22 / 24
const ELEMENT_SPACING = 12
const ITEM_SPACING = 24
const ITEM_BODY_SPACING = 26

const HotApps = () => {
  const {
    ui: { width },
  } = useUI()
  const register = useRegister()

  const slidePerViews = useMemo(() => {
    if (width > 1430) return 4
    if (width > 992) return 3
    if (width > 768) return 2
    return 'auto'
  }, [width])

  const slideMobile = useMemo(() => {
    if (width < 768) return { width: '85vw' }
    return {}
  }, [width])

  const screenWidth = useMemo(
    () => (width < 1200 ? width : width * SCREEN_RATIO),
    [width],
  )

  const cardHeight = useMemo(() => {
    if (slidePerViews === 'auto')
      return (width * MOBILE_WIDTH_RATIO - ITEM_BODY_SPACING) * HEIGHT_RATIO

    return (
      ((screenWidth -
        ELEMENT_SPACING * 2 -
        (slidePerViews - 1) * ITEM_SPACING) /
        slidePerViews -
        ITEM_BODY_SPACING) *
      HEIGHT_RATIO
    )
  }, [screenWidth, slidePerViews, width])

  const hotAppIds = useMemo(() => {
    if (!register) return []
    return Object.keys(register).sort((a) => {
      const app = register[a]
      if (app?.tags.includes(SENTRE_TAG)) return -1
      return 1
    })
  }, [register])

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
      <Col span={24}>
        <SwiperOs slidesPerView={slidePerViews}>
          {hotAppIds.map((appId) => (
            <SwiperSlide key={appId} style={{ paddingTop: 12, ...slideMobile }}>
              <CardHotAppCard appId={appId} style={{ height: cardHeight }} />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}

export default HotApps
