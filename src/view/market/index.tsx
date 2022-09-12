import { useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useRegister } from '@sentre/senhub'

import { Row, Col } from 'antd'
import TopBanner from './topBanner'
import BottomBanner from './bottomBanner'
import Trending from './trending'
import NewListedApp from './newListedApp'
import ListingApp from './listingApp'
import HotApps from './hotApps'
import ListAppByCategories from './listAppByCategories'
import MentionsOnTwitter from 'view/appInfo/mentionsOnTwitter'

import { CustomCategory } from './listAppByCategories/hooks'
import useWalletConnected from 'hooks/useWalletConnected'

const Market = () => {
  const { search } = useLocation()
  const register = useRegister()
  const history = useHistory()
  const walletConnected = useWalletConnected()

  const category = useMemo(
    () => new URLSearchParams(search).get('category'),
    [search],
  )

  // Redirect callback
  useEffect(() => {
    const {
      location: { search },
    } = history
    const params = new URLSearchParams(search)
    const paramRedirect = params.get('redirect')
    if (!paramRedirect) return
    let redirect = decodeURIComponent(paramRedirect)
    if (walletConnected) history.push(redirect)
  }, [history, walletConnected])

  if (category)
    return <ListAppByCategories swiper={false} category={category} />

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
              related={{ appIds: Object.keys(register).splice(0, 5) }}
              title="Popular on Twitter"
            />
          </Col>
          {/* Mentions twitter */}
          <Col span={24}>
            <MentionsOnTwitter appId="sentre" />
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
