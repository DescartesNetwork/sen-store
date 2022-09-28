import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import configs from 'configs'
const {
  manifest: { appId: storeId },
} = configs

export type GoToStoreProps = {
  appId?: string
  blank?: boolean
  search?: string
}

export const useGoToStoreCallback = () => {
  const history = useHistory()

  const onGotoStoreCallback = useCallback(
    async ({ appId, blank = false, search }: GoToStoreProps = {}) => {
      const nav = blank
        ? (url: string) => window.open(url, '_blank')
        : history.push
      let url = appId ? `/app/${storeId}/${appId}` : `/app/${storeId}`
      url = search ? url + search : url
      window.scrollTo(0, 0)
      return nav(url)
    },
    [history],
  )

  return onGotoStoreCallback
}

export const useGoToStore = () => {
  const onGotoStoreCallback = useGoToStoreCallback()
  const onGotoStore = useCallback(
    async ({ appId, blank = false, search }: GoToStoreProps = {}) => {
      return onGotoStoreCallback({ appId, blank, search })
    },
    [onGotoStoreCallback],
  )

  return onGotoStore
}
