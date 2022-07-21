import { useAppIds } from '@sentre/senhub'
import { Col, Row, Typography } from 'antd'
import AppCardInfo from 'components/appCardInfo'
import FlexibleCard from 'components/flexibleCard'

const AppsPopularTwitter = () => {
  const appIds = useAppIds()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>Popular on Twitter</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 36]}>
          {[...appIds].splice(0, 6).map((appId, idx) => (
            <Col xs={24} sm={12} lg={8} key={idx}>
              <FlexibleCard type="green">
                <AppCardInfo appId={appId} radius={12} padding={12} />
              </FlexibleCard>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default AppsPopularTwitter
