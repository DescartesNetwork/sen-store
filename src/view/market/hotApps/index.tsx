import { useAppIds } from '@sentre/senhub'
import { SwiperOs } from 'components/swiperOS'
import { SwiperSlide } from 'swiper/react'

import { Button, Col, Row, Space, Typography } from 'antd'
import CardHotAppCard from './cardHotApp'
import IonIcon from '@sentre/antd-ionicon'

const HotApps = () => {
  const appIds = useAppIds()

  return (
    <Row gutter={[24, 24]}>
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
        <SwiperOs>
          {appIds.map((appId) => (
            <SwiperSlide key={appId} style={{ maxWidth: 334, width: '75vw' }}>
              <CardHotAppCard appId={appId} />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}

export default HotApps
