import { useAppIds } from '@sentre/senhub'

import { Col, Row, Typography } from 'antd'
import ListAppByCategories from 'view/market/listAppByCategories'
import ListYourApp from './listYourApp'

import { CustomCategory } from 'view/market/listAppByCategories/hooks'

const YourApps = () => {
  const yourAppIds = useAppIds()

  return (
    <Row gutter={[24, 64]}>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={2}>Your DApps</Typography.Title>
          </Col>
          <Col span={24}>
            <ListYourApp />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <ListAppByCategories
          category={CustomCategory.suggest}
          related={{ appIds: yourAppIds }}
          navigation
        />
      </Col>
    </Row>
  )
}

export default YourApps
