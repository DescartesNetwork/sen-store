import { useRegister } from '@sentre/senhub'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { CustomCategory } from 'view/market/appCategory/hooks'
import ListAppByCategories from 'view/market/listAppByCategories'
import ListYourApp from './listYourApp'
import { useGoToStore } from 'hooks/useGotoStore'

const YourApps = () => {
  const resgister = useRegister()
  const onGoToStore = useGoToStore()

  return (
    <Row gutter={[24, 64]}>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Button
              type="text"
              size="small"
              icon={<IonIcon name="arrow-back-outline" />}
              onClick={onGoToStore}
              style={{ marginLeft: -7 }}
            >
              Back
            </Button>
          </Col>
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
          related={{ appIds: Object.keys(resgister).splice(0, 5) }}
          navigation
        />
      </Col>
    </Row>
  )
}

export default YourApps
