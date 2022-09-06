import { CSSProperties, useMemo } from 'react'
import { useRegister } from '@sentre/senhub'

import { Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import FlexibleCard from 'components/flexibleCard'
import { MultiStaticLoader } from 'components/staticLoader'
import Verification from 'components/verification'

import { useGoToStore } from 'hooks/useGotoStore'

import imgError from 'static/images/error-image.svg'

const APP_DEFAULT: ComponentManifest = {
  name: '',
  verified: false,
  author: { name: '', email: '' },
  description: '',
  url: '',
  appId: '',
  tags: [],
}

type CardNewListedAppProps = {
  vertical?: boolean
  appId: string
  style?: CSSProperties
  spacing?: number
}
const CardNewListedApp = ({
  vertical = false,
  appId,
  style,
  spacing,
}: CardNewListedAppProps) => {
  const register = useRegister()
  const onOpenAppDetail = useGoToStore()

  const { name, verified, author, description } = useMemo(
    () => register[appId] || APP_DEFAULT,
    [register, appId],
  )

  const verticalSpan = vertical ? 24 : undefined

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
        onClick={() => onOpenAppDetail({ appId })}
        style={{ cursor: 'pointer' }}
      >
        <Col span={verticalSpan || 11} className="panel-img">
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
        <Col span={verticalSpan}>
          <Space direction="vertical" size={16} style={{ paddingTop: 32 }}>
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
            <Typography.Text>{description}</Typography.Text>
          </Space>
        </Col>
      </Row>
    </FlexibleCard>
  )
}

export default CardNewListedApp
