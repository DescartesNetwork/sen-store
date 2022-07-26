import { useRegister, useUI } from '@sentre/senhub'

import { Col, Row, Space } from 'antd'
import IntegrationCard from './integrationCard'
import InfiniteSlideIcon from './infiniteSlideIcon'

import './index.less'

const ListingApp = () => {
  const register = useRegister()
  const appIds = Object.keys(register)
  const {
    ui: { theme },
  } = useUI()

  const isLightTheme = theme === 'light'

  return (
    <Row
      gutter={[24, 24]}
      style={{ background: isLightTheme ? '#EAE6F5' : '#09090D' }}
      align="middle"
    >
      <Col span={12}>
        <IntegrationCard />
      </Col>
      <Col span={12}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <InfiniteSlideIcon appIds={appIds} />
          <InfiniteSlideIcon appIds={appIds} reverse />
        </Space>
      </Col>
    </Row>
  )
}

export default ListingApp
