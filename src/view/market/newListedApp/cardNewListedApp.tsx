import { CSSProperties, useMemo } from 'react'
import { useRegister } from '@sentre/senhub'

import { Card, Col, Image, Row, Space, Typography } from 'antd'
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

  const imgWidth = useMemo(() => (vertical ? '100%' : 185), [vertical])
  const verticalSpan = useMemo(() => (vertical ? 24 : undefined), [vertical])
  const horizontalColPadding = useMemo(
    () => (!vertical ? { paddingTop: 12, paddingBottom: 12 } : {}),
    [vertical],
  )
  const ellipsisRow = useMemo(() => (vertical ? 3 : 1), [vertical])

  return (
    <FlexibleCard
      className="new-listed-card hoverable-transform"
      style={{ cursor: 'pointer' }}
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
        <Col span={verticalSpan}>
          <MultiStaticLoader
            defaultData={[imgError]}
            appId={appId}
            type="panels"
            render={(data) => (
              <Card
                bordered={false}
                style={{
                  background: 'transparent',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  borderRadius: 16,
                  ...style,
                }}
                bodyStyle={{ padding: 0 }}
              >
                <Image
                  src={data[0] || imgError}
                  preview={false}
                  style={{
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    width: imgWidth,
                  }}
                />
              </Card>
            )}
          />
        </Col>
        <Col
          span={verticalSpan}
          style={{ ...horizontalColPadding, overflow: 'hidden' }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Row gutter={[8, 8]} justify="space-between">
              <Col span={!vertical ? 24 : undefined}>
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
            <Typography.Paragraph
              style={{ margin: 0 }}
              ellipsis={{ rows: ellipsisRow }}
            >
              {description}
            </Typography.Paragraph>
          </Space>
        </Col>
      </Row>
    </FlexibleCard>
  )
}

export default CardNewListedApp
