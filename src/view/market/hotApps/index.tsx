import { useAppIds } from '@sentre/senhub'
import { SwiperOs } from 'components/swiperOS'
import { SwiperSlide } from 'swiper/react'

import { Col, Row, Typography } from 'antd'
import AppCard from './cardHotApp'

import './index.less'

const HotApps = () => {
  const appIds = useAppIds()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>Hot 🔥🔥🔥</Typography.Title>
      </Col>
      {/* Apps in the category */}
      <Col span={24}>
        <SwiperOs>
          {appIds.map((appId) => (
            <SwiperSlide key={appId} style={{ maxWidth: 334, width: '75vw' }}>
              <AppCard appId={appId} />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}

export default HotApps
