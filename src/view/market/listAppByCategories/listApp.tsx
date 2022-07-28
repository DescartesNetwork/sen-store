import { Col, Empty, Row, Typography } from 'antd'
import AppCardInfo from 'components/appCardInfo'
import FlexibleCard, { FlexibleCardType } from 'components/flexibleCard'

import { CategoryOptions, useAppCategory } from './hooks'

type ListAppProps = {
  title?: string
  type?: FlexibleCardType
} & CategoryOptions
const ListApp = ({ title, type = 'green', ...options }: ListAppProps) => {
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
        <Col xs={24} md={12} xl={8} xxl={6} key={idx}>
          <FlexibleCard type="green" className="hoverable-transform">
            <AppCardInfo appId={appId} />
          </FlexibleCard>
        </Col>
      ))}
    </Row>
  )
}

export default ListApp
