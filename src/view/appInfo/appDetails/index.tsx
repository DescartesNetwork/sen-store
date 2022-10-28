import { useMemo } from 'react'
import {
  useRegister,
  useAppIds,
  useWalletAddress,
  useInfix,
  Infix,
} from '@sentre/senhub'
import { account } from '@senswap/sen-js'

import { Row, Col, Typography, Space } from 'antd'
import AppIcon from 'components/appIcon'
import Verification from 'components/verification'
import ReadmeLoader from 'components/readmeLoader'
import InstalledApp from './installedApp'
import AppTags from './appTags'
import AppAuthor from './appAuthor'
import AppShare from './appShare'

const AppDetails = ({ appId }: { appId: string }) => {
  const register = useRegister()
  const appIds = useAppIds()
  const walletAddress = useWalletAddress()

  const { author, name, tags, verified } = useMemo(
    () => register[appId] || ({} as ComponentManifest),
    [register, appId],
  )
  const infix = useInfix()

  const isMobile = infix < Infix.sm
  const floatSocialButton = useMemo(
    () => (isMobile ? 'start' : 'end'),
    [isMobile],
  )
  const installed = useMemo(
    () => account.isAddress(walletAddress) && appIds.includes(appId),
    [walletAddress, appIds, appId],
  )

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={isMobile ? 24 : 14}>
            <Row gutter={[24, 24]} wrap={false}>
              <Col>
                <AppIcon appId={appId} size={96} name={false} />
              </Col>
              <Col flex="auto">
                <Space direction="vertical" size={16}>
                  <Typography.Title level={2} className="title-align-icon">
                    {name} <Verification verified={verified} />
                  </Typography.Title>
                  <AppTags tags={tags} />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={isMobile ? 24 : 10}>
            <Row gutter={[16, 16]} justify={floatSocialButton}>
              <Col span={24}>
                <InstalledApp appId={appId} installed={installed} />
              </Col>
              <Col>
                <AppShare appId={appId} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <AppAuthor author={author} />
      </Col>
      <Col span={24}>
        <ReadmeLoader appId={appId} />
      </Col>
    </Row>
  )
}

export default AppDetails
