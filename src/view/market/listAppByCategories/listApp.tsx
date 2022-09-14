import { Col, Empty, Row, Typography } from 'antd'
import AppCardInfo from 'components/appCardInfo'
import FlexibleCard, { FlexibleCardType } from 'components/flexibleCard'
import { CSSProperties } from 'react'

import { CategoryOptions, useAppCategory } from './hooks'

type ListAppProps = {
  title?: string
  type?: FlexibleCardType
  spacing?: number
  padding?: CSSProperties['padding']
} & CategoryOptions
const ListApp = ({
  title,
  type = 'green',
  spacing,
  padding,
  ...options
}: ListAppProps) => {
  const { title: suggestTitle, appIds: suggestAppIds } = useAppCategory(options)

  if (!suggestAppIds.length) return <Empty />

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2} style={{ textTransform: 'capitalize' }}>
          {title || suggestTitle}
        </Typography.Title>
      </Col>
      {suggestAppIds.map((appId, idx) => (
        <Col xs={24} md={12} lg={8} xl={6} key={idx}>
          <FlexibleCard
            spacing={spacing}
            type="green"
            className="hoverable-transform"
          >
            <AppCardInfo appId={appId} radius={12} padding={padding} />
          </FlexibleCard>
        </Col>
      ))}
    </Row>
  )
}

export default ListApp
