import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppIds, useWalletAddress } from '@sentre/senhub'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { CustomCategory } from 'view/market/listAppByCategories/hooks'
import ListAppByCategories from 'view/market/listAppByCategories'
import ListYourApp from './listYourApp'
import configs from 'configs'

const {
  manifest: { appId: appStoreId },
} = configs

const YourApps = () => {
  const walletAddress = useWalletAddress()
  const history = useHistory()
  const yourAppIds = useAppIds()
  const onBack = useCallback(() => history.goBack(), [history])

  useEffect(() => {
    if (!walletAddress) history.push('/app/' + appStoreId)
  }, [history, walletAddress])

  return (
    <Row gutter={[24, 64]}>
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
            <Typography.Title level={2}>Your DApps</Typography.Title>
          </Col>
          <Col span={24}>
            <ListYourApp />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <ListAppByCategories
          category={CustomCategory.suggest}
          related={{ appIds: yourAppIds }}
          navigation
        />
      </Col>
    </Row>
  )
}

export default YourApps
