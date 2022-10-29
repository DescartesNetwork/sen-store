import { Col, Row } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import CardBanner from './cardBanner'

import { useSwiperOverflowGaurd } from 'hooks/useOverflowGaurd'

import interdao from 'static/images/banner/interdao.png'
import lightningTunnel from 'static/images/banner/lightning-tunnel.png'
import anyArts from 'static/images/banner/any-arts.png'
import balansol from 'static/images/banner/balansol.png'
import solend from 'static/images/banner/solend.png'
import './index.less'

const PANELS = [
  {
    image: balansol,
    title: 'Your Balancer Pool Model on Solana',
    description:
      'Provide a one-stop solution to launch up to 8 types of tokens with limited funds while bringing a good boding curve.',
    appId: 'balansol',
  },
  {
    image: solend,
    title: 'Decentralized lending and borrowing protocol.',
    description: 'The autonomous interest rate machine for lending.',
    appId: 'solend',
  },
  {
    image: interdao,
    title: 'The Universal DAO solution for Solana.',
    description: 'A Customizable DAO Solution for various purposes.',
    appId: 'inter_dao',
  },
  {
    image: anyArts,
    title: 'The Most Powerful NFT Aggregator',
    description: 'Multi-token support & Fast Inclusive',
    appId: 'any_arts',
  },
  {
    image: lightningTunnel,
    title: 'One-time sign for bulk transaction',
    description: 'Supper speed & Fee saving',
    appId: 'lightning_tunnel',
  },
]

SwiperCore.use([Autoplay])

const TopBanner = () => {
  const swiperWidth = useSwiperOverflowGaurd()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24} style={{ width: swiperWidth, zIndex: -1 }}>
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
          autoplay
          loop
        >
          {PANELS.map(({ appId, description, image, title }, index) => {
            return (
              <SwiperSlide
                style={{
                  cursor: 'pointer',
                }}
                key={index}
              >
                <CardBanner
                  image={image}
                  appId={appId}
                  title={title}
                  description={description}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Col>
    </Row>
  )
}

export default TopBanner
