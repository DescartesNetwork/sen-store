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
    const apps = Object.keys(listApp).sort((a, b) => {
      const dataA = listApp[a]
      const dataB = listApp[b]
      if ([a, b].includes('notification_admin')) return -1
      return (
        new Date(dataB.createdAt).getTime() -
        new Date(dataA.createdAt).getTime()
      )
    })
    return apps.splice(0, LIMIT_APP)
  }, [listApp])

  return (
    <Row gutter={[24, 24]} align="top">
      <Col span={24}>
        <Typography.Title level={2}>New listed</Typography.Title>
      </Col>
      <Col xs={24} lg={12}>
        <CardNewListedApp
          appId={newListed[0]}
          vertical
          spacing={width < Infix.lg ? 16 : 32}
        />
      </Col>
      <Col xs={24} lg={12}>
        <Row gutter={[24, 24]} justify="space-between">
          {[...newListed].splice(1).map((appId, idx) => (
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
