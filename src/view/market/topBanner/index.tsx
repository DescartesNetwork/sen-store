import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'

import interdao from 'static/images/banner/interdao.png'
import lightningTunnel from 'static/images/banner/lightning-tunnel.png'
import anyArts from 'static/images/banner/any-arts.png'
import CardBanner from './cardBanner'

import './index.less'

const PANELS = [
  {
    image: interdao,
    title: 'The Universal DAO solution for Solana.',
    description: 'A Customizable DAO Solution for various purposes.',
    appId: 'interdao',
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

const TopBanner = () => {
  SwiperCore.use([Autoplay])
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
  )
}

export default TopBanner
