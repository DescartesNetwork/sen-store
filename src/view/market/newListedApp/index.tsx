import { useMemo } from 'react'

import { useAppWidth, Infix, useRegister } from '@sentre/senhub'
import { Col, Row, Typography } from 'antd'
import CardNewListedApp from './cardNewListedApp'

import './index.less'

const LIMIT_APP = 4

const NewListedApp = () => {
  const width = useAppWidth()
  const listApp = useRegister()

  const newListed = useMemo(() => {
    if (!listApp) return []
    const apps = Object.keys(listApp)
      .filter((appId) => appId !== 'notification_admin')
      .sort((a, b) => {
        const createdAt_a = new Date(listApp[a].createdAt).getTime()
        const createdAt_b = new Date(listApp[b].createdAt).getTime()
        return createdAt_b - createdAt_a
      })
    return apps.splice(0, LIMIT_APP)
  }, [listApp])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>New listed</Typography.Title>
      </Col>

      {newListed.map((appId, idx) => (
        <Col xs={24} lg={12} key={idx}>
          <CardNewListedApp
            appId={appId}
            vertical
            spacing={width < Infix.lg ? 16 : 32}
          />
        </Col>
      ))}
    </Row>
  )
}

export default NewListedApp
