import { useEffect } from 'react'
import { useSetBackground } from '@sentre/senhub'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Affix, Col, Layout, Row } from 'antd'
import Market from './market'
import AppInfo from 'view/appInfo'
import YourApps from './yourApps'

import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'
import Search from './search'

const {
  manifest: { appId },
} = configs

const View = () => {
  const setBackground = useSetBackground()

  useEffect(() => {
    setBackground({ light: '#f5f2fa', dark: '#16151b' })
  }, [setBackground])

  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" style={{ marginBottom: 96 }}>
          <Col xs={24} xl={22}>
            <Switch>
              <Route exact path={`/app/${appId}`} component={Market} />
              <Route
                exact
                path={`/app/${appId}/your-apps`}
                component={YourApps}
              />
              <Route exact path={`/app/${appId}/:appId`} component={AppInfo} />
              <Route path="*">
                <Redirect to="/" />
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
