import { useRegister } from '@sentre/senhub'
import { Col, Row, Typography } from 'antd'
import CardNewListedApp from './cardNewListedApp'

import './index.less'

const NewListedApp = () => {
  const register = useRegister()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>New listed</Typography.Title>
      </Col>
      <Col span={12}>
        <CardNewListedApp appId={Object.keys(register)[0]} vertical />
      </Col>
      <Col span={12}>
        <Row gutter={[24, 24]}>
          {Object.keys(register)
            .splice(0, 3)
            .map((appId, idx) => (
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
