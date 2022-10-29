import { useEffect } from 'react'
import { useSetBackground, useAppRoute } from '@sentre/senhub'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Affix, Col, Row } from 'antd'
import PrivateRoute from 'components/privateRoute'
import Market from './market'
import AppInfo from 'view/appInfo'
import YourApps from './yourApps'
import Search from './search'
import ListApp from './listApp'

import { AppCategories, STORE_BODY_ID, YOUR_DAPP } from 'contant'
import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'

const {
  manifest: { appId },
} = configs

const View = () => {
  const setBackground = useSetBackground()
  const { root, extend } = useAppRoute(appId)

  useEffect(() => {
    setBackground({ light: '#f5f2fa', dark: '#16151b' })
  }, [setBackground])

  return (
    <Row id={STORE_BODY_ID} gutter={[24, 24]} justify="center">
      <Col span={24}>
        <Affix style={{ margin: -12 }}>
          <Search />
        </Affix>
      </Col>
      <Col span={24} className="store-col-container">
        <Switch>
          <Route exact path={root} component={Market} />
          <Route
            exact
            path={extend(`/${AppCategories.All}`)}
            component={ListApp}
          />
          <PrivateRoute
            exact
            path={extend(`/${YOUR_DAPP}`)}
            component={YourApps}
          />
          <Route exact path={extend('/:appId')} component={AppInfo} />
          <Redirect from="*" to={root} />
        </Switch>
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default View
