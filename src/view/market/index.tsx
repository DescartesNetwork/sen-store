import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useRegister } from '@sentre/senhub'

import { Row, Col } from 'antd'
import TopBanner from './topBanner'
import BottomBanner from './bottomBanner'
import AppCategorySeeAll from './appCategory/seeAll'
import AppCategorySlice from './appCategory/slice'
import AllApps from './exploreApps'

import { compareAliasString } from './appCategory/hooks/custom'
import Trending from './trending'
import NewListedApp from './newListedApp'
import ListingApp from './listingApp'

const CATEGORIES = ['utility']

const Market = () => {
  const { search } = useLocation()
  const register = useRegister()

  const category = useMemo(
    () => new URLSearchParams(search).get('category'),
    [search],
  )

  const tags = useMemo(() => {
    let tags: string[] = []
    for (const appId in register) {
      const newTags = register[appId]?.tags || []
      // Remove duplicate elements
      tags = Array.from(new Set([...tags, ...newTags]))
    }
    return CATEGORIES.filter((category) => compareAliasString(category, tags))
  }, [register])

  if (category) return <AppCategorySeeAll category={category} />
  return (
    <Row gutter={[16, 48]} justify="center">
      <Col span={24} className="sentre-col-container">
        <Row gutter={[16, 48]}>
          <Col span={24}>
            <TopBanner />
          </Col>
          {tags.map((tag) => (
            <Col span={24} key={tag}>
              <AppCategorySlice category={tag} />
            </Col>
          ))}
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
