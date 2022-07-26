import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import FlexibleCard from 'components/flexibleCard'
import AppCardInfo from 'components/appCardInfo'

import { CategoryOptions, useAppCategory } from './hooks'

const CategorySeeAll = (options: CategoryOptions) => {
  const history = useHistory()
  const { title, appIds } = useAppCategory(options)
  const onBack = useCallback(() => history.goBack(), [history])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          type="text"
          size="small"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={onBack}
          style={{ marginLeft: -7 }}
        >
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Typography.Title level={2} style={{ textTransform: 'capitalize' }}>
          {title}
        </Typography.Title>
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
