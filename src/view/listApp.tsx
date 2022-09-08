import { useRegister } from '@sentre/senhub'

import { Col, Row, Typography } from 'antd'
import AppCardInfo from 'components/appCardInfo'
import FlexibleCard from 'components/flexibleCard'

const ListApp = () => {
  const register = useRegister()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>All Apps</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {Object.keys(register).map((appId, idx) => (
            <Col xs={24} sm={12} md={12} lg={8} key={idx}>
              <FlexibleCard type="green" className="hoverable-transform">
                <AppCardInfo appId={appId} padding={12} radius={12} />
              </FlexibleCard>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default ListApp
