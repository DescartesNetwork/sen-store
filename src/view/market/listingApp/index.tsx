import { useAppIds } from '@sentre/senhub'

import { Col, Row, Space } from 'antd'
import IntegrationCard from './integrationCard'
import InfiniteSlideIcon from './infiniteSlideIcon'

import './index.less'

const ListingApp = () => {
  const appIds = useAppIds()

  return (
    <Row gutter={[24, 24]} style={{ margin: 0 }}>
      <Col
        span={12}
        style={{
          borderRadius: '16px 0 0 16px',
          background: '#EAE6F5',
          padding: 0,
        }}
      >
        <IntegrationCard />
      </Col>
      <Col span={12}>
        <Row
          gutter={[24, 24]}
          align="middle"
          style={{
            height: '100%',
            background: '#EAE6F5',
            borderRadius: '0 16px 16px 0',
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
