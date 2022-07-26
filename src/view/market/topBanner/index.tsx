import { useUI } from '@sentre/senhub'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

import { Button, Card, Col, Image, Row, Space, Typography } from 'antd'

import storePanel1 from 'static/images/market/store-panel1.png'
import topBgLight from 'static/images/top-bg.png'
import topBgDark from 'static/images/top-bg-dark.png'

import './index.less'

const PANELS = [storePanel1]

const TopBanner = () => {
  const {
    ui: { theme },
  } = useUI()
  const topBg = theme === 'light' ? topBgLight : topBgDark

  return (
    <Swiper
      className="hero-banner"
      slidesPerView={1}
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
      {PANELS.map((banner, index) => {
        return (
          <SwiperSlide
            style={{
              cursor: 'pointer',
            }}
            key={index}
          >
            <Card
              style={{
                height: '100%',
                boxShadow: 'none',
                backgroundImage: `url(${topBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
              bodyStyle={{ padding: 0 }}
              bordered={false}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Space
                    style={{ padding: '56px 32px' }}
                    direction="vertical"
                    size={32}
                  >
                    <Typography.Title level={1}>
                      The Universal DAO solution for Solana.
                    </Typography.Title>
                    <Typography.Text>
                      A Customizable DAO Solution for various purposes.
                    </Typography.Text>
                    <Button onClick={() => {}} type="primary" size="large">
                      Explore now
                    </Button>
                  </Space>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  className="img-banner"
                  style={{ textAlign: 'right' }}
                >
                  <Image src={banner} preview={false} />
                </Col>
              </Row>
            </Card>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default TopBanner
