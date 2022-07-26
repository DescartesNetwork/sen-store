import { useCallback, useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Row, Col, Card, Button, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AppDetails from './appDetails'
import ScreenShot from './screenshot'
import MentionsOnTwitter from './mentionsOnTwitter'

import configs from 'configs'
import { CustomCategory, useAppCategory } from '../market/appCategory/hooks'
import './index.less'
import FlexibleCard from 'components/flexibleCard'
import AppCardInfo from 'components/appCardInfo'

const {
  manifest: { appId: appStoreId },
} = configs

const AppViewer = () => {
  const history = useHistory()
  const { appId } = useParams<{ appId: string }>()
  const related = useMemo(() => {
    return { appIds: [appId] }
  }, [appId])

  const { title: suggestTitle, appIds: suggestAppIds } = useAppCategory({
    category: CustomCategory.suggest,
    related,
  })

  const onBack = useCallback(() => history.goBack(), [history])

  useEffect(() => {
    if (appStoreId === appId) history.push('/app/' + appStoreId)
  }, [appId, history])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} className="sentre-col-container">
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
            <Card bordered={false}>
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <AppDetails appId={appId} />
                </Col>
                <Col xs={24} lg={12}>
                  <ScreenShot appId={appId} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <MentionsOnTwitter />
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Typography.Title
                  level={2}
                  style={{ textTransform: 'capitalize' }}
                >
                  {suggestTitle}
                </Typography.Title>
              </Col>
              {suggestAppIds.map((appId, idx) => (
                <Col xs={12} sm={12} md={12} lg={8} xl={6} key={idx}>
                  <FlexibleCard type="green">
                    <AppCardInfo appId={appId} radius={12} padding={12} />
                  </FlexibleCard>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AppViewer
