import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

import { Button, Card, Col, Image, Row, Space, Typography } from 'antd'

import storePanel1 from 'static/images/market/store-panel1.png'
import storePanel2 from 'static/images/market/store-panel2.png'
import storePanel3 from 'static/images/market/store-panel3.png'
import storePanel4 from 'static/images/market/store-panel4.png'
import './index.less'

const PANELS = [storePanel1, storePanel2, storePanel3, storePanel4]

const TopBanner = () => {
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
              }}
              bodyStyle={{ padding: 0 }}
              bordered={false}
            >
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Space
                    style={{ padding: '56px 32px' }}
                    direction="vertical"
                    size={32}
                  >
                    <Typography.Title level={1}>
                      TFT - Dragonlands: Todos los campeones del Set
                    </Typography.Title>
                    <Typography.Text>
                      Personalised ads and content, ad and content measurement,
                      audience insights and product development, Precise
                      geolocation data, and identification through device
                      scanning, Storage and access to geolocation
                    </Typography.Text>
                    <Button onClick={() => {}} type="primary">
                      Explore now
                    </Button>
                  </Space>
                </Col>
                <Col span={12} className="img-banner">
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
