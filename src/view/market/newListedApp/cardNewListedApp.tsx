import { CSSProperties, useMemo } from 'react'
import { useRegister, useUI } from '@sentre/senhub'

import { Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import FlexibleCard from 'components/flexibleCard'
import { MultiStaticLoader } from 'components/staticLoader'
import Verification from 'components/verification'

import { useGoToStore } from 'hooks/useGotoStore'

import imgError from 'static/images/error-image.svg'

type CardNewListedAppProps = {
  vertical?: boolean
  appId: string
  style?: CSSProperties
}
const CardNewListedApp = ({
  vertical = false,
  appId,
  style,
}: CardNewListedAppProps) => {
  const register = useRegister()
  const onOpenAppDetail = useGoToStore({ appId })
  const {
    ui: { width },
  } = useUI()

  const { name, verified, author, description } = useMemo(
    () => register[appId] || ({} as ComponentManifest),
    [register, appId],
  )

  const verticalSpan = vertical ? 24 : undefined
  const clnHorizontalImg = !vertical
    ? 'panel-img horizontal-panel'
    : 'panel-img'
  const spacing = width < 768 ? 16 : 32

  return (
    <FlexibleCard
      className="new-listed-card hoverable-transform"
      transparent
      type="pink"
      spacing={spacing}
    >
      <Row
        gutter={[24, 24]}
        wrap={vertical}
        onClick={onOpenAppDetail}
        style={{ cursor: 'pointer' }}
      >
        <Col span={verticalSpan || 8} className={clnHorizontalImg}>
          <MultiStaticLoader
            defaultData={[imgError]}
            appId={appId}
            type="panels"
            render={(data) => (
              <Card
                className="listed-card-img"
                bordered={false}
                style={{
                  backgroundImage: `url(${data[0] || imgError})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  borderRadius: 12,
                  ...style,
                }}
                bodyStyle={{ padding: 0 }}
              />
            )}
          />
        </Col>
        <Col span={verticalSpan || 16}>
          <Row gutter={[24, 24]}>
            {/* Group App Infos */}
            <Col span={24}>
              <Space size={16} align="start">
                <AppIcon appId={appId} size={40} name={false} />
                <Space direction="vertical" size={0}>
                  <Space>
                    <Typography.Title level={5}>{name}</Typography.Title>
                    <Verification verified={verified} />
                  </Space>
                  <Typography.Text type="secondary">
                    {author.name}
                  </Typography.Text>
                </Space>
              </Space>
            </Col>
            {/* App pannel */}
            <Col span={24}>{description}</Col>
          </Row>
        </Col>
      </Row>
    </FlexibleCard>
  )
}

export default CardNewListedApp
