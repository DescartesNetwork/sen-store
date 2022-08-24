import { Fragment, useMemo } from 'react'
import {
  useGoToApp,
  useInstallApp,
  useUninstallApp,
  useInfix,
  Infix,
} from '@sentre/senhub'

import { Button, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

export type InstalledAppProps = {
  installed: boolean
  appId: string
}

const InstalledApp = ({ installed, appId }: InstalledAppProps) => {
  const opOpen = useGoToApp({ appId })
  const onInstall = useInstallApp(appId)
  const onUninstall = useUninstallApp(appId)
  const infix = useInfix()

  const isMobile = infix < Infix.sm
  const justify = useMemo(() => (isMobile ? 'start' : 'end'), [isMobile])

  return (
    <Row gutter={[12, 12]} justify={justify}>
      {installed ? (
        <Fragment>
          <Col span={isMobile ? 12 : undefined}>
            <Button
              icon={<IonIcon name="trash-outline" />}
              onClick={onUninstall}
              block={isMobile}
              ghost
            >
              Uninstall
            </Button>
          </Col>

          <Col span={isMobile ? 12 : undefined}>
            <Button
              type="primary"
              icon={<IonIcon name="open-outline" />}
              onClick={opOpen}
              block={isMobile}
            >
              Open
            </Button>
          </Col>
        </Fragment>
      ) : (
        <Col span={isMobile ? 24 : undefined}>
          <Button
            type="primary"
            icon={<IonIcon name="download-outline" />}
            onClick={onInstall}
            block={isMobile}
          >
            Install
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default InstalledApp
