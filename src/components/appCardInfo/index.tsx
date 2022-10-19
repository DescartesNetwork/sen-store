import { MouseEvent, useCallback, useMemo } from 'react'
import {
  useGoToApp,
  useInstallApp,
  useRegister,
  useAppIds,
} from '@sentre/senhub'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import Verification from 'components/verification'
import AppTags from 'view/appInfo/appDetails/appTags'

import { useGoToStore } from 'hooks/useGotoStore'

import './index.less'

const LIMIT_TAG = 2
const START_SPLICE = 0

export type AppCardInfoProps = {
  appId: string
  radius?: string | number
  padding?: string | number
}
const AppCardInfo = ({
  appId,
  radius = '0 0 12px 12px',
  padding = '28px 16px 12px 16px',
}: AppCardInfoProps) => {
  const register = useRegister()
  const appIds = useAppIds()
  const onInstallApp = useInstallApp(appId)
  const onGoToApp = useGoToApp({ appId })
  const onOpenAppDetail = useGoToStore()

  const { name, verified, description, tags } = useMemo(
    () => register[appId] || ({} as ComponentManifest),
    [register, appId],
  )
  const installed = useMemo(() => appIds.includes(appId), [appIds, appId])

  const onOpen = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      return onGoToApp()
    },
    [onGoToApp],
  )

  return (
    <Card
      bordered={false}
      style={{
        boxShadow: 'unset',
        borderRadius: radius,
        cursor: 'pointer',
      }}
      bodyStyle={{
        padding,
      }}
      onClick={() => onOpenAppDetail({ appId })}
    >
      <Row align="top" gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[16, 16]} wrap={false}>
            <Col>
              <AppIcon size={52} appId={appId} name={false} />
            </Col>
            <Col flex="auto">
              <Row gutter={[2, 2]}>
                <Col span={24}>
                  <Space className="wrap-app-name">
                    <Typography.Title ellipsis={{ tooltip: true }} level={5}>
                      {name}
                    </Typography.Title>
                    <Verification verified={verified} />
                  </Space>
                </Col>
                <Col span={24}>
                  <AppTags
                    tags={[...tags].splice(START_SPLICE, LIMIT_TAG)}
                    wrap={false}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              {installed ? (
                <Button
                  ghost
                  size="small"
                  onClick={onOpen}
                  id="open-action-button"
                >
                  Open
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    onInstallApp()
                  }}
                  size="small"
                  id="install-action-button"
                >
                  Install
                </Button>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Text type="secondary" ellipsis={{ tooltip: true }}>
            {description}
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default AppCardInfo
