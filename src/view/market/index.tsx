import { useCallback, useMemo, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useRegister } from '@sentre/senhub'

import { Row, Col, Button } from 'antd'
import TopBanner from './topBanner'
import BottomBanner from './bottomBanner'
import Trending from './trending'
import NewListedApp from './newListedApp'
import ListingApp from './listingApp'
import HotApps from './hotApps'
import ExploreApps from './exploreApps'
import Search from './search'

import { CustomCategory } from './listAppByCategories/hooks'
import MentionsOnTwitter from 'view/appInfo/mentionsOnTwitter'
import ListAppByCategories from './listAppByCategories'
import IonIcon from '@sentre/antd-ionicon'

const Market = () => {
  const history = useHistory()
  const { search } = useLocation()
  const resgister = useRegister()
  const categoryRef = useRef<HTMLDivElement>(null)

  const category = useMemo(
    () => new URLSearchParams(search).get('category'),
    [search],
  )

  const onBack = useCallback(() => history.goBack(), [history])

  const scrollToCategory = () => {
    if (categoryRef.current) window.scrollTo(0, categoryRef.current.offsetTop)
  }

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
            <Search scrollToCategory={scrollToCategory} />
          </Col>
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
          <Col span={24} ref={categoryRef}>
            <ExploreApps />
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
