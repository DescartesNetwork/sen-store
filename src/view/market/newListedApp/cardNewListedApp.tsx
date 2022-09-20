import { CSSProperties, useMemo } from 'react'
import { useRegister } from '@sentre/senhub'

import { Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import FlexibleCard from 'components/flexibleCard'
import { MultiStaticLoader } from 'components/staticLoader'
import Verification from 'components/verification'

import { useGoToStore } from 'hooks/useGotoStore'

import imgError from 'static/images/error-image.svg'
import AppTags from 'view/appInfo/appDetails/appTags'

const LIMIT_TAG = 2
const START_SPLICE = 0

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

  const { name, verified, author, description, tags } = useMemo(
    () => register[appId] || APP_DEFAULT,
    [register, appId],
  )

  const verticalSpan = vertical ? 24 : undefined
  const horizontalColPadding = !vertical
    ? { paddingTop: 12, paddingBottom: 12 }
    : {}

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
        style={{ cursor: 'pointer', height: '100%' }}
        align="middle"
        justify={vertical ? 'space-between' : 'start'}
      >
        <Col
          span={verticalSpan || 11}
          style={{ height: !vertical ? '100%' : '' }}
          className="panel-img"
        >
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
                  borderRadius: 16,
                  height: '100%',
                  ...style,
                }}
                bodyStyle={{ padding: 0 }}
              />
            )}
          />
        </Col>
        <Col span={verticalSpan} style={{ ...horizontalColPadding }}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Row gutter={[8, 8]}>
              <Col span={!vertical ? 24 : undefined} flex="auto">
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
              <Col span={!vertical ? 24 : undefined}>
                <AppTags
                  tags={[...tags].splice(START_SPLICE, LIMIT_TAG)}
                  wrap={false}
                />
              </Col>
            </Row>
            <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 2 }}>
              {description}
            </Typography.Paragraph>
          </Space>
        </Col>
      </Row>
    </FlexibleCard>
  )
}

export default CardNewListedApp
