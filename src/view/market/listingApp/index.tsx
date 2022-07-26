import { useRegister, useUI } from '@sentre/senhub'

import { Col, Row, Space } from 'antd'
import IntegrationCard from './integrationCard'
import InfiniteSlideIcon from './infiniteSlideIcon'

import './index.less'

const ListingApp = () => {
  const register = useRegister()
  const {
    ui: { width, theme },
  } = useUI()

  const isMobile = width < 768
  const isLightTheme = theme === 'light'

  return (
    <Row style={{ marginLeft: 0, marginRight: 0 }}>
      <Col
        xs={24}
        md={12}
        style={{
          borderRadius: !isMobile ? '16px 0px 0px 16px' : '16px 16px 0 0',
          background: isLightTheme ? '#EAE6F5' : '#09090D',
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
            background: isLightTheme ? '#EAE6F5' : '#09090D',
            borderRadius: !isMobile ? '0px 16px 16px 0px' : '0 0 16px 16px',
            padding: isMobile ? '32px 0' : undefined,
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <Col span={24}>
            <Space size={24} direction="vertical" style={{ width: '100%' }}>
              <InfiniteSlideIcon appIds={Object.keys(register)} />
              <InfiniteSlideIcon appIds={Object.keys(register)} reverse />
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ListingApp
