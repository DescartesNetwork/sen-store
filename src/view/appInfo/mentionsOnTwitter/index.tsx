import { useMemo } from 'react'
import { useUI } from '@sentre/senhub'

import { Row, Col, Typography } from 'antd'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import CardTwitter from './cardTwitter'

import './index.less'

const listTwitter = [0, 1, 2, 3, 4]

const MentionsOnTwitter = () => {
  const {
    ui: { width },
  } = useUI()

  const calculatePerCard = useMemo(() => {
    if (width < 768) return 1
    if (width < 991) return 2
    return 3
  }, [width])

  const listTwitterRender = () => {
    let indexColor = 0
    return listTwitter.map((item) => {
      if (indexColor === 3) indexColor = 0
      indexColor++
      return (
        <SwiperSlide
          style={{
            cursor: 'pointer',
            height: '250px',
          }}
          key={item}
        >
          <CardTwitter indexColor={indexColor} />
        </SwiperSlide>
      )
    })
  }

  return (
    <Row gutter={[20, 20]} align="bottom">
      {/* Title */}
      <Col span={24}>
        <Typography.Title level={2}>Mentions On Twitter</Typography.Title>
      </Col>
      <Col span={24}>
        <Swiper
          className="twitter-mention-swiper"
          slidesPerView={calculatePerCard}
          spaceBetween={24}
          navigation={false}
          pagination={{
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
              return `<span class="${className} indicator" key="${index}"></span>`
            },
          }}
          modules={[Navigation, Pagination]}
        >
          {listTwitterRender()}
        </Swiper>
      </Col>
    </Row>
  )
}

export default MentionsOnTwitter
