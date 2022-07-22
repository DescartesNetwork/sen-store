import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useRegister } from '@sentre/senhub'

import { Row, Col } from 'antd'
import TopBanner from './topBanner'
import BottomBanner from './bottomBanner'
import AppCategorySeeAll from './appCategory/seeAll'
import Trending from './trending'
import NewListedApp from './newListedApp'
import ListingApp from './listingApp'
import HotApps from './hotApps'
import ExploreApps from './exploreApps'
import ListAppByCategories from './listAppByCategories'

import { CustomCategory } from './appCategory/hooks'
import MentionsOnTwitter from 'view/appInfo/mentionsOnTwitter'

const Market = () => {
  const { search } = useLocation()
  const resgister = useRegister()

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
