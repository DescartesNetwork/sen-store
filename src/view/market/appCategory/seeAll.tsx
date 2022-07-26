import { useGoToStore } from 'hooks/useGotoStore'

import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { CategoryOptions, useAppCategory } from './hooks'
import FlexibleCard from 'components/flexibleCard'
import AppCardInfo from 'components/appCardInfo'

const CategorySeeAll = (options: CategoryOptions) => {
  const { title, appIds } = useAppCategory(options)
  const onGoToStore = useGoToStore()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space>
          <Button
            type="text"
            icon={<IonIcon name="arrow-back-outline" />}
            onClick={onGoToStore}
          />
          <Typography.Title level={2} style={{ textTransform: 'capitalize' }}>
            {title}
          </Typography.Title>
        </Space>
      </Col>
      {appIds.map((appId) => (
        <Col xs={24} sm={12} md={12} lg={8} xl={6} key={appId}>
          <FlexibleCard type="green">
            <AppCardInfo appId={appId} radius={12} padding={12} />
          </FlexibleCard>
        </Col>
      ))}
    </Row>
  )
}

export default CategorySeeAll
