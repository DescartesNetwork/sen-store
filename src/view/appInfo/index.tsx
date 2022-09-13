import { useCallback, useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Row, Col, Card, Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AppDetails from './appDetails'
import ScreenShot from './screenshot'
import MentionsOnTwitter from './mentionsOnTwitter'
import ListAppByCategories from 'view/market/listAppByCategories'

import { CustomCategory } from '../market/listAppByCategories/hooks'
import configs from 'configs'
import './index.less'

const {
  manifest: { appId: appStoreId },
} = configs

const AppViewer = () => {
  const history = useHistory()
  const { appId } = useParams<{ appId: string }>()
  const related = useMemo(() => {
    return { appIds: [appId] }
  }, [appId])

  const onBack = useCallback(() => history.goBack(), [history])

  useEffect(() => {
    if (appStoreId === appId) history.push('/app/' + appStoreId)
  }, [appId, history])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24} className="sentre-col-container">
        <Row gutter={[64, 64]}>
          {/* App Details */}
          <Col span={24}>
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
            </Row>
          </Col>

          {/* Mention on twitter */}
          <Col span={24}>
            <MentionsOnTwitter appId={appId} />
          </Col>

          {/* Related app */}
          <Col span={24}>
            <ListAppByCategories
              category={CustomCategory.suggest}
              navigation
              related={related}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AppViewer
