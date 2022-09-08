import { useEffect } from 'react'
import { useSetBackground, useAppRoute } from '@sentre/senhub'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Affix, Col, Layout, Row } from 'antd'
import Market from './market'
import AppInfo from 'view/appInfo'
import YourApps from './yourApps'
import Search from './search'
import ListApp from './listApp'

import { AppCategories, YOUR_DAPP } from 'contant'
import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'
import PrivateRoute from 'components/privateRoute'

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
      <Layout.Content>
        <Row justify="center" style={{ marginBottom: 96 }}>
          <Col xs={24} xl={22}>
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
              <Route path="*">
                <Redirect to={root} />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Content>
        <Affix
          style={{
            position: 'fixed',
            width: '100%',
            bottom: 5,
            left: 0,
            zIndex: 999,
          }}
        >
          <Row justify="center">
            <Col xs={24} xl={22} style={{ paddingRight: 12, paddingLeft: 12 }}>
              <Search />
            </Col>
          </Row>
        </Affix>
      </Layout.Content>
    </Layout>
  )
}

export default View
