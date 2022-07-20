import { Row, Col, Typography } from 'antd'
import CardTwitter from './cardTwitter'

const MentionsOnTwitter = () => {
  return (
    <Row gutter={[20, 20]} align="bottom">
      {/* Title */}
      <Col span={24}>
        <Typography.Title level={2}>Mentions On Twitter</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <CardTwitter />
          </Col>
          <Col span={8}>
            <CardTwitter />
          </Col>
          <Col span={8}>
            <CardTwitter />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default MentionsOnTwitter
