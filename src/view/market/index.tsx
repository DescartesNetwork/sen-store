import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { Row, Col } from 'antd'
import TopBanner from './topBanner'
import BottomBanner from './bottomBanner'
import AppCategorySeeAll from './appCategory/seeAll'
import AllApps from './exploreApps'

import Trending from './trending'
import NewListedApp from './newListedApp'
import ListingApp from './listingApp'
import HotApps from './hotApps'
import AppsPopularTwitter from './appsPopularTwitter'

const Market = () => {
  const { search } = useLocation()

  const category = useMemo(
    () => new URLSearchParams(search).get('category'),
    [search],
  )

  if (category) return <AppCategorySeeAll category={category} />
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
          <Col span={24}>
            <AppsPopularTwitter />
          </Col>
          <Col span={24}>
            <Trending />
          </Col>
          <Col span={24}>
            <AllApps />
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
