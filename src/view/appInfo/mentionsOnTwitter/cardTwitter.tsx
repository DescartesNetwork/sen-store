import { Avatar, Card, Col, Row, Space, Typography } from 'antd'

import AvatarImage from 'static/images/logo.png'

const CardTwitter = () => {
  return (
    <Card bordered={false} style={{ boxShadow: 'none', height: '100%' }}>
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
