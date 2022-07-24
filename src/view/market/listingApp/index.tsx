import { useAppIds, useUI } from '@sentre/senhub'

import { Col, Row, Space } from 'antd'
import IntegrationCard from './integrationCard'
import InfiniteSlideIcon from './infiniteSlideIcon'

import './index.less'

const ListingApp = () => {
  const appIds = useAppIds()
  const {
    ui: { width },
  } = useUI()

  const isMobile = width < 768

  return (
    <Row gutter={[24, 24]} style={{ marginLeft: 0, marginRight: 0 }}>
      <Col
        xs={24}
        md={12}
        style={{
          borderRadius: !isMobile ? '16px 0px 0px 16px' : '16px',
          background: '#EAE6F5',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <IntegrationCard />
      </Col>
      <Col xs={24} md={12}>
        <Row
          gutter={[24, 24]}
          align="middle"
          style={{
            height: '100%',
            background: '#EAE6F5',
            borderRadius: !isMobile ? '0px 16px 16px 0px' : '16px',
          }}
        >
          <Col span={24}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <InfiniteSlideIcon appIds={appIds} />
              <InfiniteSlideIcon appIds={appIds} reverse />
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ListingApp
