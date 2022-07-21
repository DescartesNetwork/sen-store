import { useAppIds } from '@sentre/senhub'

import { Col, Row } from 'antd'
import IntegrationCard from './integrationCard'
import InfiniteSlideIcon from './infiniteSlideIcon'

import './index.less'

const ListingApp = () => {
  const appIds = useAppIds()

  return (
    <Row gutter={[24, 24]} style={{ background: '#EAE6F5' }}>
      <Col span={12}>
        <IntegrationCard />
      </Col>
      <Col span={12}>
        <InfiniteSlideIcon appIds={appIds} reverse />
      </Col>
    </Row>
  )
}

export default ListingApp
