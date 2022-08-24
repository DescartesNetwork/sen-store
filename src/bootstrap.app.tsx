import { Provider } from 'react-redux'
import { WalletProvider, AntdProvider } from '@sentre/senhub'

import View from 'view'

import model from 'model'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <AntdProvider appId={appId} prefixCls={appId}>
      <WalletProvider>
        <Provider store={model}>
          <View />
        </Provider>
      </WalletProvider>
    </AntdProvider>
  )
}

export * from 'static.app'
