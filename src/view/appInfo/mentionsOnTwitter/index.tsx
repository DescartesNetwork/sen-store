import { useMemo } from 'react'
import { Infix, useRegister, useWidth } from '@sentre/senhub'

import { Row, Col, Typography, Spin, Button } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import CardTwitter from './cardTwitter'
import IconSax from '@sentre/antd-iconsax'

import { useTwitterMentions } from 'hooks/useTwitterMentions'

import './index.less'

export type MentionsOnTwitterProps = { appId: string }

const SENTRE_ID = 'sentre'

const MentionsOnTwitter = ({ appId }: MentionsOnTwitterProps) => {
  const width = useWidth()
  const register = useRegister()
  const { data, loading } = useTwitterMentions(appId)

  const { name } = useMemo(
    () => register[appId] || ({} as ComponentManifest),
    [register, appId],
  )

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
            height: 222,
          }}
          key={mentions.id}
        >
          <CardTwitter data={mentions} indexColor={indexColor} />
        </SwiperSlide>
      )
    })
  }

  const onComment = () => {
    const TWITTER_URL = `http://twitter.com/intent/tweet?text=Loved the experience of the ${name} DApp on Sentre Protocol. The app runs smooth and I get incentives for using it via Sentre!`

    return window.open(TWITTER_URL, '_blank')
  }

  return (
    <Spin spinning={loading}>
      <Row gutter={[24, 12]} align="bottom">
        {/* Title */}
        <Col span={24}>
          <Row align="middle">
            <Col flex="auto">
              <Typography.Title level={2}>Mentions On Twitter</Typography.Title>
            </Col>
            {appId !== SENTRE_ID && (
              <Col>
                <Button
                  onClick={onComment}
                  icon={<IconSax name="Message" variant="Bold" />}
                  ghost
                >
                  Comment
                </Button>
              </Col>
            )}
          </Row>
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
            autoplay
            loop
          >
            {listTwitterRender()}
          </Swiper>
        </Col>
      </Row>
    </Spin>
  )
}

export default MentionsOnTwitter
