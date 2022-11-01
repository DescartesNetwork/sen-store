import { useAppWidth, Infix } from '@sentre/senhub'

import { Col, Row, Typography } from 'antd'
import CardNewListedApp from './cardNewListedApp'

const NEW_LISTED_APP_ID = ['francium', 'meanfi', 'friktion', 'port_finance']

const NewListedApp = () => {
  const width = useAppWidth()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>New listed</Typography.Title>
      </Col>
      <Col xs={24} lg={12}>
        <CardNewListedApp
          appId={NEW_LISTED_APP_ID[0]}
          vertical
          spacing={width < Infix.lg ? 16 : 32}
        />
      </Col>
      <Col xs={24} lg={12}>
        <Row
          gutter={[24, 24]}
          justify="space-between"
          style={{ height: '100%' }}
        >
          {[...NEW_LISTED_APP_ID].splice(1).map((appId, idx) => (
            <Col span={24} key={idx}>
              <CardNewListedApp
                appId={appId}
                spacing={width < Infix.sm ? 16 : 0}
                vertical={width < Infix.sm}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default NewListedApp
