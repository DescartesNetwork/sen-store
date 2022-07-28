import { useMemo } from 'react'
import { useUI } from '@sentre/senhub'

import { Row, Col, Typography } from 'antd'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import CardTwitter from './cardTwitter'

import './index.less'

const LIST_TWITTER = [
  {
    name: 'Chris Tian',
    tag: '@Stirail · Jul 24',
    reweet:
      'This is the moment we all have been waiting for! Us = with no more funds to buy more SOL hihihihi',
    appId: 'any_arts',
    avatar:
      'https://pbs.twimg.com/profile_images/1531595293946683392/iozpRS2F_400x400.jpg',
  },
  {
    name: '𝐒𝐎𝐋𝐀𝐍𝐀 𝐔𝐍𝐈𝐕𝐄𝐑𝐒𝐄 🧬',
    tag: '@SolanaUnivers',
    reweet: `🔥
      @SentreProtocol
       is an All-in-One 
      @Solana
       open platform with #dApps Store and Universal Protocol for Liquidity!
      
      🔥 $SNTR TOKEN UTILITY UPDATE 
      
      ♻️Revenue Sharing
      ⛏️Mining Tokens
      
      🔽INFO
      https://sentre.io/#/home`,
    appId: '',
    avatar:
      'https://pbs.twimg.com/profile_images/1527303517589086209/ZPbM5Gk__400x400.jpg',
  },
  {
    name: 'Thien Nguyen',
    tag: '@ThienNV_DesNet',
    reweet: `Really surprised at the cost and sending speed of Lightning Tunnel. A retweet for 
    @SentreProtocol
      ⚡️⚡️⚡️`,
    appId: 'lightning_tunnel',
    avatar:
      'https://pbs.twimg.com/profile_images/1506533084728291328/TyE_CSfQ_400x400.jpg',
  },
  {
    name: 'Thanh Tuấn Lê',
    tag: '@Tuanle1899',
    reweet:
      'Amazing! No code, no platform needed for DAO with vote by NFT and token. I think it’s a good solution for the project, frens 🤟',
    appId: 'interdao',
    avatar:
      'https://pbs.twimg.com/profile_images/1469313225707573248/cKhPXTWE_400x400.jpg',
  },
]

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
    return LIST_TWITTER.map((data, idx) => {
      if (indexColor === 3) indexColor = 0
      indexColor++
      return (
        <SwiperSlide
          style={{
            cursor: 'pointer',
            height: 260,
          }}
          key={idx}
        >
          <CardTwitter data={data} indexColor={indexColor} />
        </SwiperSlide>
      )
    })
  }

  return (
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
          modules={[Navigation, Pagination]}
          style={{ paddingTop: 12 }}
        >
          {listTwitterRender()}
        </Swiper>
      </Col>
    </Row>
  )
}

export default MentionsOnTwitter
