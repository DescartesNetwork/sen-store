import { useEffect } from 'react'
import { useUI } from '@sentre/senhub'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd'
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
  const { setBackground } = useUI()

  useEffect(() => {
    setBackground({ light: '#f5f2fa', dark: '#f5f2fa' })
  }, [setBackground])

  return (
    <Layout>
      <Layout.Content>
        <Switch>
          <Route exact path={`/app/${appId}/`} component={Market} />
          <Route exact path={`/app/${appId}/your-apps`} component={YourApps} />
          <Route exact path={`/app/${appId}/:appId`} component={AppInfo} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout.Content>
    </Layout>
  )
}

export default View
