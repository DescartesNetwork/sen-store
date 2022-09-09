import { useMemo } from 'react'
import { Infix, useWidth } from '@sentre/senhub'

import { Row, Col, Typography, Spin } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import CardTwitter from './cardTwitter'

import './index.less'
import { useTwitterMentions } from 'hooks/useTwitterMentions'

export type MentionsOnTwitterProps = { appId: string }

const MentionsOnTwitter = ({ appId }: MentionsOnTwitterProps) => {
  const width = useWidth()
  const { data, loading } = useTwitterMentions(appId)

  const calculatePerCard = useMemo(() => {
    if (width < Infix.md) return 1
    if (width < Infix.lg) return 2
    return 3
  }, [width])

  const listTwitterRender = () => {
    let indexColor = 0
    return data.map((mentions) => {
      if (indexColor === 3) indexColor = 0
      indexColor++
      return (
        <SwiperSlide
          style={{
            cursor: 'pointer',
            height: 260,
          }}
          key={mentions.id}
        >
          <CardTwitter data={mentions} indexColor={indexColor} />
        </SwiperSlide>
      )
    })
  }

  return (
    <Spin spinning={loading}>
      <Row gutter={[24, 12]} align="bottom">
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
            modules={[Navigation, Pagination, Autoplay]}
            style={{ paddingTop: 12 }}
            autoplay={{ pauseOnMouseEnter: true }}
          >
            {listTwitterRender()}
          </Swiper>
        </Col>
      </Row>
    </Spin>
  )
}

export default MentionsOnTwitter
