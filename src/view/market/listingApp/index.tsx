import { useRegister, useUI } from '@sentre/senhub'

import { Card, Col, Row, Space } from 'antd'
import IntegrationCard from './integrationCard'
import InfiniteSlideIcon from './infiniteSlideIcon'

import './index.less'

const ListingApp = () => {
  const register = useRegister()
  const appIds = Object.keys(register)
  const {
    ui: { theme, width },
  } = useUI()

  const isLightTheme = theme === 'light'
  const isMobile = width < 768
  const slideStyle = isMobile
    ? { padding: '0 12px' }
    : { padding: 0, marginLeft: -12 }
  const paddingBottom = isMobile ? { paddingBottom: 24 } : {}

  return (
    <Card
      bordered={false}
      style={{
        height: '100%',
        background: isLightTheme ? '#EAE6F5' : '#09090D',
        boxShadow: 'unset',
      }}
      bodyStyle={{ padding: 0, ...paddingBottom }}
    >
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12}>
          <IntegrationCard />
        </Col>
        <Col xs={24} md={12} style={{ ...slideStyle }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <InfiniteSlideIcon appIds={appIds} />
            <InfiniteSlideIcon appIds={appIds} reverse />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default ListingApp
