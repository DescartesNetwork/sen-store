import { useUI } from '@sentre/senhub'
import { Avatar, Card, Col, Row, Space, Typography } from 'antd'
import { useMemo } from 'react'

import AvatarImage from 'static/images/logo.png'

const BG_COLOR_1 =
  'radial-gradient(circle 90px at 80% 60%, rgb(83 127 255 / 40%), transparent)'
const BG_COLOR_2 =
  'radial-gradient(circle 90px at 80% 60%, rgb(57 116 184 / 40%), transparent)'
const BG_COLOR_3 =
  'radial-gradient(circle 90px at 80% 60%, rgb(117 81 236 / 40%), transparent)'

export type CardTwitterProps = {
  indexColor?: number
}

const CardTwitter = ({ indexColor = 0 }: CardTwitterProps) => {
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
      className="card-twitter"
    >
      <Row gutter={[24, 24]} align="middle">
        <Col>
          <Avatar size={44} src={AvatarImage} />
        </Col>
        <Col flex="auto">
          <Space size={4} direction="vertical">
            <Typography.Text strong>Ca-Koii</Typography.Text>
            <Typography.Text type="secondary">@DongBui73755226</Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Paragraph ellipsis={{ rows: 5 }}>
            @Saros is just getting started. They are the gold standard for
            Solana projects IMO. @Saros is just getting started. They are the
            gold standard for Solana projects IMO....@Saros is just ..... for
            Solana projects IMO....@Saros is just .....
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default CardTwitter
