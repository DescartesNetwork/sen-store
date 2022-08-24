import { Infix, useTheme, useWidth } from '@sentre/senhub'

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
  const width = useWidth()
  const onGoToApp = useGoToStore({ appId })
  const topBg = theme === 'light' ? topBgLight : topBgDark
  const titleSize = useMemo(() => {
    if (width > 1600) return { fontSize: 72 }
    if (width > 1320) return { fontSize: 54 }
    if (width > Infix.lg) return { fontSize: 42 }
    return {}
  }, [width])
  const cardTitleSize = width < 1200 ? 16 : 32

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
      <Row gutter={[24, 24]}>
        <Col
          xs={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 12, order: 1 }}
        >
          <Space
            style={{ padding: '56px 32px' }}
            direction="vertical"
            size={cardTitleSize}
          >
            <AppIcon appId={appId} direction="horizontal" />
            <Typography.Title level={1} style={{ ...titleSize }}>
              {title}
            </Typography.Title>
            <Typography.Text style={{ fontSize: 20 }}>
              {description}
            </Typography.Text>
            <Button
              className="btn-explore-now"
              onClick={onGoToApp}
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
