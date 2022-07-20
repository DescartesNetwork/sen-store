import { Redirect, Route, Switch } from 'react-router-dom'

import { Layout } from 'antd'

import Market from './market'
import AppInfo from 'view/appInfo'

import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'

const {
  manifest: { appId },
} = configs

const View = () => {
  return (
    <Layout>
      <Layout.Content>
        <Switch>
          <Route exact path={`/app/${appId}/`} component={Market} />
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
