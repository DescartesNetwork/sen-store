import { useEffect } from 'react'
import { useSetBackground } from '@sentre/senhub'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Col, Layout, Row } from 'antd'
import Market from './market'
import AppInfo from 'view/appInfo'
import YourApps from './yourApps'

import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'

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
        <Row justify="center">
          <Col xs={24} xl={22}>
            <Switch>
              <Route exact path={`/app/${appId}/`} component={Market} />
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
    </Layout>
  )
}

export default View
