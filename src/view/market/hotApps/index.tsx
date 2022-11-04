import { useMemo } from 'react'
import { Infix, useAppWidth } from '@sentre/senhub'

import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CardHotAppCard from './cardHotApp'
import { Swiper, SwiperSlide } from 'swiper/react'

import { DEFAULT_NEXT_CLN, DEFAULT_PREV_CLN, MAX_WIDTH } from 'contant'
import { Navigation, Pagination } from 'swiper'

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

  const slidePerViews = useMemo(() => {
    if (width > MAX_WIDTH) return 4
    if (width > Infix.lg) return 3
    if (width > Infix.md) return 2
    return 1
  }, [width])

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
                className={`hot_app_${DEFAULT_PREV_CLN}`}
                icon={<IonIcon name="chevron-back-outline" />}
              />
              {/* Button next slide */}
              <Button
                shape="circle"
                style={{ border: 'none' }}
                className={`hot_app_${DEFAULT_NEXT_CLN}`}
                icon={<IonIcon name="chevron-forward-outline" />}
              />
            </Space>
          </Col>
        </Row>
      </Col>
      {/* Apps in the category */}
      <Col span={24}>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={slidePerViews}
          spaceBetween={24}
          navigation={{
            nextEl: `.hot_app_${DEFAULT_NEXT_CLN}`,
            prevEl: `.hot_app_${DEFAULT_PREV_CLN}`,
          }}
          lazy
        >
          {HOT_APPS.map((appId) => (
            <SwiperSlide key={appId} style={{ paddingTop: 12 }}>
              <CardHotAppCard appId={appId} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </Row>
  )
}

export default HotApps
