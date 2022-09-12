import { Infix, useRegister, useWidth } from '@sentre/senhub'

import { Col, Row, Space } from 'antd'
import IntegrationCard from './integrationCard'
import InfiniteSlideIcon from './infiniteSlideIcon'
import FlexibleCard from 'components/flexibleCard'

import './index.less'

const ListingApp = () => {
  const register = useRegister()
  const appIds = Object.keys(register)
  const width = useWidth()

  const isMobile = width < Infix.md
  const slideStyle = isMobile
    ? { paddingLeft: 12, paddingRight: 12 }
    : { paddingLeft: 0, paddingRight: 0, marginLeft: -12 }
  const paddingCard = isMobile ? { padding: '0 0 24px 0' } : { padding: 0 }

  return (
    <FlexibleCard
      type="murrey"
      spacing={0}
      bodyStyle={{ ...paddingCard }}
      bordered={false}
      transparent
    >
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12}>
          <IntegrationCard />
        </Col>
        <Col xs={24} md={12} style={{ ...slideStyle }}>
          <Space direction="vertical" style={{ width: '100%' }} size={32}>
            <InfiniteSlideIcon appIds={appIds} />
            <InfiniteSlideIcon appIds={appIds} reverse />
          </Space>
        </Col>
      </Row>
    </FlexibleCard>
  )
}

export default ListingApp
