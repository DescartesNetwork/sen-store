import { useMemo } from 'react'
import { useUI } from '@sentre/senhub'

import { Row, Col, Typography } from 'antd'

import { SwiperSlide } from 'swiper/react'
import { SwiperOs } from 'components/swiperOS'
import CardTwitter from './cardTwitter'

const MentionsOnTwitter = () => {
  const {
    ui: { width },
  } = useUI()

  const calculatePerCard = useMemo(() => {
    if (width < 768) return 1
    if (width < 991) return 2
    return 3
  }, [width])

  return (
    <Row gutter={[20, 20]} align="bottom">
      {/* Title */}
      <Col span={24}>
        <Typography.Title level={2}>Mentions On Twitter</Typography.Title>
      </Col>
      <Col span={24}>
        <SwiperOs slidesPerView={calculatePerCard}>
          {[0, 1, 2, 3].map((item) => (
            <SwiperSlide key={item} style={{ height: '250px' }}>
              <CardTwitter />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}

export default MentionsOnTwitter
