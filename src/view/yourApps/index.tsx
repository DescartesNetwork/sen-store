import { useRegister } from '@sentre/senhub'

import { Col, Row, Typography } from 'antd'
import { CustomCategory } from 'view/market/appCategory/hooks'
import ListAppByCategories from 'view/market/listAppByCategories'
import ListYourApp from './listYourApp'

const YourApps = () => {
  const resgister = useRegister()

  return (
    <Row gutter={[24, 64]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Title level={2}>Your Dapp</Typography.Title>
          </Col>
          <Col span={24}>
            <ListYourApp />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <ListAppByCategories
          category={CustomCategory.suggest}
          related={{ appIds: Object.keys(resgister).splice(0, 5) }}
          navigation
        />
      </Col>
    </Row>
  )
}

export default YourApps
