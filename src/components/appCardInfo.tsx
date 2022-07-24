import { MouseEvent, useCallback, useMemo } from 'react'
import { account } from '@senswap/sen-js'
import {
  useGoToApp,
  useInstallApp,
  useWallet,
  useRegister,
  useAppIds,
} from '@sentre/senhub'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import Verification from 'components/verification'
import AppTags from 'view/appInfo/appDetails/appTags'

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
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const onInstallApp = useInstallApp(appId)
  const onGoToApp = useGoToApp({ appId })

  const { name, verified, description, tags } = useMemo(
    () => register[appId] || ({} as ComponentManifest),
    [register, appId],
  )
  const installed = useMemo(() => appIds.includes(appId), [appIds, appId])

  const onInstall = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!account.isAddress(walletAddress))
        throw new Error('Please connect the wallet!')
      return onInstallApp()
    },
    [onInstallApp, walletAddress],
  )

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
      }}
      bodyStyle={{
        padding,
      }}
    >
      <Row align="top" gutter={[8, 8]}>
        <Col>
          <AppIcon size={52} appId={appId} name={false} />
        </Col>
        <Col flex="auto">
          <Space direction="vertical" size={0}>
            <Space align="center" style={{ lineHeight: 1 }}>
              <Typography.Title level={5}>{name}</Typography.Title>
              <Verification verified={verified} />
            </Space>
            <AppTags tags={[...tags].splice(START_SPLICE, LIMIT_TAG)} />
          </Space>
        </Col>
        <Col>
          {installed ? (
            <Button ghost size="small" onClick={onOpen} id="open-action-button">
              Open
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={onInstall}
              size="small"
              id="install-action-button"
            >
              Install
            </Button>
          )}
        </Col>
        <Col span={24}>
          <Typography.Text type="secondary" ellipsis>
            {description}
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default AppCardInfo
