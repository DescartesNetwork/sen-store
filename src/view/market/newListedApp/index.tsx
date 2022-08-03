import { useUI } from '@sentre/senhub'

import { Col, Row, Typography } from 'antd'
import CardNewListedApp from './cardNewListedApp'

import './index.less'

const NEW_LISTED_APP_ID = ['solend', 'any_arts', 'hedge', 'zeta_markets']

const NewListedApp = () => {
  const {
    ui: { width },
  } = useUI()

  const cardSpacing = width < 768 ? 16 : 32

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>New listed</Typography.Title>
      </Col>
      <Col xs={24} md={12}>
        <CardNewListedApp
          appId={NEW_LISTED_APP_ID[0]}
          vertical
          spacing={cardSpacing}
        />
      </Col>
      <Col xs={24} md={12}>
        <Row
          gutter={[24, 24]}
          justify="space-between"
          style={{ height: '100%' }}
        >
          {[...NEW_LISTED_APP_ID].splice(1).map((appId, idx) => (
            <Col span={24} key={idx}>
              <CardNewListedApp appId={appId} spacing={0} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default NewListedApp
