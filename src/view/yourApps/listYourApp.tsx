import { useAppIds } from '@sentre/senhub'

import { Col, Empty, Row } from 'antd'
import AppCardInfo from 'components/appCardInfo'
import FlexibleCard from 'components/flexibleCard'

const ListYourApp = () => {
  const appIds = useAppIds()

  if (!appIds.length) return <Empty />

  return (
    <Row gutter={[24, 24]}>
      {appIds.map((appId, idx) => (
        <Col xs={24} sm={12} md={12} lg={8} key={idx}>
          <FlexibleCard type="green" className="hoverable-transform">
            <AppCardInfo appId={appId} padding={12} radius={12} />
          </FlexibleCard>
        </Col>
      ))}
    </Row>
  )
}

export default ListYourApp
