import { useCallback, useMemo } from 'react'
import { useInfix, Infix, useWalletAddress, util } from '@sentre/senhub'
import { useHistory } from 'react-router-dom'

import { Segmented } from 'antd'
import Icon from '@ant-design/icons'
import { SegmentedValue } from 'antd/lib/segmented'

import { useGoToStore } from 'hooks/useGotoStore'
import { AppCategories, YOUR_DAPP } from 'contant'

import { ReactComponent as iconOverview } from 'static/images/icons/icon-overview.svg'
import { ReactComponent as iconBuild } from 'static/images/icons/icon-build.svg'
import { ReactComponent as iconGame } from 'static/images/icons/icon-game.svg'
import { ReactComponent as iconSentre } from 'static/images/icons/icon-sentre.svg'
import { ReactComponent as iconLiquidity } from 'static/images/icons/icon-liquidity.svg'
import { ReactComponent as iconDApp } from 'static/images/icons/icon-dapp.svg'
import configs from 'configs'

const {
  manifest: { appId: appStoreId },
} = configs

const CATEGORIES = [
  {
    icon: <Icon component={iconOverview} />,
    value: AppCategories.Overview,
    label: AppCategories.Overview,
  },
  {
    icon: <Icon component={iconBuild} />,
    value: AppCategories.Utility,
    label: AppCategories.Utility,
  },
  {
    icon: <Icon component={iconLiquidity} />,
    value: AppCategories.Liquidity,
    label: AppCategories.Liquidity,
  },
  {
    icon: <Icon component={iconSentre} />,
    value: AppCategories.Sentre,
    label: AppCategories.Sentre,
  },
  {
    icon: <Icon component={iconGame} />,
    value: AppCategories.Game,
    label: AppCategories.Game,
  },
  {
    icon: <Icon component={iconDApp} />,
    value: AppCategories.DApp,
    label: AppCategories.DApp,
  },
]

const MenuBar = () => {
  const history = useHistory()
  const walletAddress = useWalletAddress()
  const onGoToCateGoryApp = useGoToStore()
  const infix = useInfix()

  const walletConnected = util.isAddress(walletAddress)
  const isMobile = infix < Infix.lg

  const filteredSegmented = useMemo(() => {
    // Disabled button when wallet not connected
    if (!isMobile)
      return CATEGORIES.map(({ icon, label, value }) => {
        const disabled = !walletConnected && value === AppCategories.DApp
        return { icon, label, value, disabled }
      })
    // Remove label
    return CATEGORIES.map(({ icon, value }) => {
      const disabled = !walletConnected && value === AppCategories.DApp
      return { icon, value, disabled }
    })
  }, [isMobile, walletConnected])

  const onClick = useCallback(
    (key: SegmentedValue) => {
      if (key === AppCategories.Overview)
        return history.push(`/app/${appStoreId}`)
      if (key === AppCategories.DApp)
        return history.push(`/app/${appStoreId}/${YOUR_DAPP}`)

      return onGoToCateGoryApp({ search: `?category=${key}` })
    },
    [history, onGoToCateGoryApp],
  )

  return (
    <Segmented
      target="root"
      size="large"
      onChange={onClick}
      options={filteredSegmented}
    />
  )
}

export default MenuBar
