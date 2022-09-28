import { useEffect } from 'react'
import { useSetBackground, useAppRoute } from '@sentre/senhub'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Col, Layout, Row } from 'antd'
import PrivateRoute from 'components/privateRoute'
import Market from './market'
import AppInfo from 'view/appInfo'
import YourApps from './yourApps'
import Search from './search'
import ListApp from './listApp'

import { AppCategories, STORE_BODY_ID, YOUR_DAPP } from 'contant'
import UIWatcher from './watcher/ui.watcher'
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
    <Layout>
      <Row
        id={STORE_BODY_ID}
        gutter={[24, 24]}
        justify="center"
        style={{ marginBottom: 96 }}
      >
        <Col
          span={24}
          style={{
            position: 'sticky',
            top: 0,
            paddingLeft: 0,
            paddingRight: 0,
            zIndex: 99,
          }}
        >
          <Search />
        </Col>
        <Col xs={24} className="store-col-container">
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
        <UIWatcher />
      </Row>
    </Layout>
  )
}

export default View
