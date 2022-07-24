import { useMemo } from 'react'
import {
  useAppIds,
  useGoToApp,
  useInstallApp,
  useRegister,
} from '@sentre/senhub'

import { Button, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import Verification from 'components/verification'

import { shortenString } from 'helper'

type CardAppCateogryProps = { appId: string }
const CardAppCateogry = ({ appId }: CardAppCateogryProps) => {
  const register = useRegister()
  const appIds = useAppIds()
  const onInstallApp = useInstallApp(appId)
  const onGoToApp = useGoToApp({ appId })

  const { name, verified, description } = useMemo(
    () => register[appId] || ({} as ComponentManifest),
    [register, appId],
  )
  const installed = useMemo(() => appIds.includes(appId), [appIds, appId])

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col>
        <AppIcon appId={appId} size={64} name={false} />
      </Col>
      <Col>
        <Space direction="vertical" size={0}>
          <Space size={4}>
            <Typography.Title level={5}>{name}</Typography.Title>
            <Verification verified={verified} />
          </Space>
          <Typography.Text type="secondary">
            {shortenString(description)}
          </Typography.Text>
          {installed ? (
            <Button onClick={onGoToApp} size="small" ghost>
              Open
            </Button>
          ) : (
            <Button onClick={onInstallApp} size="small" type="primary">
              Install
            </Button>
          )}
        </Space>
      </Col>
    </Row>
  )
}
export default CardAppCateogry
