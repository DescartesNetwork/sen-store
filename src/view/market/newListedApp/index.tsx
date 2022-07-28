import { Col, Row, Typography } from 'antd'
import CardNewListedApp from './cardNewListedApp'

import './index.less'

const NEW_LISTED_APP_ID = ['lido', 'any_arts', 'hedge', 'balansol']

const NewListedApp = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>New listed</Typography.Title>
      </Col>
      <Col xs={24} md={12}>
        <CardNewListedApp appId={NEW_LISTED_APP_ID[0]} vertical />
      </Col>
      <Col xs={24} md={12}>
        <Row
          gutter={[24, 24]}
          justify="space-between"
          style={{ height: '100%' }}
        >
          {[...NEW_LISTED_APP_ID].splice(1).map((appId, idx) => (
            <Col span={24} key={idx}>
              <CardNewListedApp appId={appId} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default NewListedApp
