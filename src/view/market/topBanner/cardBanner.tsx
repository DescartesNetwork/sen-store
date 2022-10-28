import { Infix, useAppWidth, useTheme } from '@sentre/senhub'

import { Button, Card, Col, Image, Row, Space, Typography } from 'antd'

import AppIcon from 'components/appIcon'

import { useGoToStore } from 'hooks/useGotoStore'

import topBgLight from 'static/images/top-bg.png'
import topBgDark from 'static/images/top-bg-dark.png'
import './index.less'
import { useMemo } from 'react'

type CardBannerProps = {
  image: string
  title: string
  description: string
  appId: string
}
const CardBanner = ({ image, appId, description, title }: CardBannerProps) => {
  const theme = useTheme()
  const width = useAppWidth()
  const onGoToApp = useGoToStore()
  const topBg = theme === 'light' ? topBgLight : topBgDark
  const titleSize = useMemo(() => {
    if (width > 1600) return { fontSize: 68 }
    if (width > 1320) return { fontSize: 54 }
    if (width > Infix.lg) return { fontSize: 42 }
    return {}
  }, [width])
  const cardTitleSize = width < 1200 ? 16 : 24

  return (
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
      <Row gutter={[24, 24]} align="middle">
        <Col
          xs={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 12, order: 1 }}
        >
          <Space
            style={{ padding: '0 32px 16px' }}
            direction="vertical"
            size={cardTitleSize}
            className="card-banner-details"
          >
            <AppIcon appId={appId} direction="horizontal" />
            <Space direction="vertical" size={16}>
              <Typography.Title level={1} style={{ ...titleSize }}>
                {title}
              </Typography.Title>
              <Typography.Text style={{ fontSize: 20 }}>
                {description}
              </Typography.Text>
            </Space>
            <Button
              className="btn-explore-now"
              onClick={() => onGoToApp({ appId })}
              size="large"
              type="primary"
            >
              Explore now
            </Button>
          </Space>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 12, order: 2 }}
          className="img-banner"
          style={{ textAlign: 'right' }}
        >
          <Image className="image-aspect-43" src={image} preview={false} />
        </Col>
      </Row>
    </Card>
  )
}

export default CardBanner
