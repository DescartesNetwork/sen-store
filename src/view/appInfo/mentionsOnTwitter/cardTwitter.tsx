import { useMemo } from 'react'
import { useUI } from '@sentre/senhub'

import { Avatar, Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'

const BG_COLOR_1 =
  'radial-gradient(circle 90px at 80% 60%, rgb(83 127 255 / 40%), transparent)'
const BG_COLOR_2 =
  'radial-gradient(circle 90px at 80% 60%, rgb(57 116 184 / 40%), transparent)'
const BG_COLOR_3 =
  'radial-gradient(circle 90px at 80% 60%, rgb(117 81 236 / 40%), transparent)'

export type DataTweet = {
  name: string
  reweet: string
  tag: string
  appId: string
  avatar: string
}
export type CardTwitterProps = {
  indexColor?: number
  data: DataTweet
}

const CardTwitter = ({ indexColor = 0, data }: CardTwitterProps) => {
  const {
    ui: { theme },
  } = useUI()

  const cardBackground = useMemo(() => {
    switch (indexColor) {
      case 1:
        return BG_COLOR_1
      case 2:
        return BG_COLOR_2
      case 3:
        return BG_COLOR_3
      default:
        return BG_COLOR_1
    }
  }, [indexColor])

  return (
    <Card
      bordered={false}
      style={{
        height: '100%',
        background: theme === 'light' ? '#FFF' : undefined,
        boxShadow: 'none',
      }}
      bodyStyle={{
        height: '100%',
        background: cardBackground,
      }}
      className="card-twitter hoverable-transform"
    >
      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Avatar size={44} src={data.avatar} />
        </Col>
        <Col flex="auto">
          <Space size={4} direction="vertical">
            <Typography.Text strong>{data.name}</Typography.Text>
            <Typography.Text type="secondary">{data.tag}</Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Paragraph ellipsis={{ rows: 5 }}>
            {data.reweet}
          </Typography.Paragraph>
        </Col>
        {!!data.appId && (
          <Col span={24}>
            <Card
              style={{
                borderRadius: 8,
                background: 'transparent',
                boxShadow: 'unset',
              }}
              bodyStyle={{ padding: '12px 16px' }}
            >
              <AppIcon size={24} direction="horizontal" appId={data.appId} />
            </Card>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default CardTwitter
