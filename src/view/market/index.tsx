import { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useRegister } from '@sentre/senhub'

import { Row, Col, Button } from 'antd'
import TopBanner from './topBanner'
import BottomBanner from './bottomBanner'
import Trending from './trending'
import NewListedApp from './newListedApp'
import ListingApp from './listingApp'
import HotApps from './hotApps'
import IonIcon from '@sentre/antd-ionicon'
import ListAppByCategories from './listAppByCategories'
import MentionsOnTwitter from 'view/appInfo/mentionsOnTwitter'

import { CustomCategory } from './listAppByCategories/hooks'

const Market = () => {
  const history = useHistory()
  const { search } = useLocation()
  const resgister = useRegister()

  const category = useMemo(
    () => new URLSearchParams(search).get('category'),
    [search],
  )

  const onBack = useCallback(() => history.goBack(), [history])

  if (category)
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
          <ListAppByCategories swiper={false} category={category} />
        </Col>
      </Row>
    )

  return (
    <Row gutter={[16, 48]} justify="center">
      <Col span={24} className="sentre-col-container">
        <Row gutter={[16, 48]}>
          <Col span={24}>
            <TopBanner />
          </Col>
          <Col span={24}>
            <HotApps />
          </Col>
          {/* Popular on Twitter */}
          <Col span={24}>
            <ListAppByCategories
              category={CustomCategory.suggest}
              related={{ appIds: Object.keys(resgister).splice(0, 5) }}
              title="Popular on Twitter"
            />
          </Col>
          {/* Mentions twitter */}
          <Col span={24}>
            <MentionsOnTwitter />
          </Col>
          <Col span={24}>
            <Trending />
          </Col>
          <Col span={24}>
            <NewListedApp />
          </Col>
          <Col span={24}>
            <ListingApp />
          </Col>
          <Col span={24}>
            <BottomBanner />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Market
