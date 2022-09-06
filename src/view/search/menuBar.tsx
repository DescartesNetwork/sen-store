import { useCallback, useMemo } from 'react'
import { useInfix, Infix, useWalletAddress, util } from '@sentre/senhub'
import { useHistory } from 'react-router-dom'

import { Segmented } from 'antd'
import IconSax from '@sentre/antd-iconsax'
import { SegmentedValue } from 'antd/lib/segmented'
import IonIcon from '@sentre/antd-ionicon'

import configs from 'configs'
import { useGoToStore } from 'hooks/useGotoStore'
import { AppCategories, YOUR_DAPP } from 'contant'

const {
  manifest: { appId: appStoreId },
} = configs

const CATEGORIES = [
  {
    icon: <IconSax name="Category" />,
    value: AppCategories.Overview,
    label: AppCategories.Overview,
  },
  {
    icon: <IconSax name="Magicpen" />,
    value: AppCategories.Utility,
    label: AppCategories.Utility,
  },
  {
    icon: <IconSax name="Convertshape2" />,
    value: AppCategories.Liquidity,
    label: AppCategories.Liquidity,
  },
  {
    icon: <IonIcon name="logo-sentre" />,
    value: AppCategories.Sentre,
    label: AppCategories.Sentre,
  },
  {
    icon: <IconSax name="Game" />,
    value: AppCategories.Game,
    label: AppCategories.Game,
  },
  {
    icon: <IconSax name="UserOctagon" />,
    value: AppCategories.Yours,
    label: AppCategories.Yours,
  },
]

const MenuBar = () => {
  const history = useHistory()
  const walletAddress = useWalletAddress()
  const onGoToStore = useGoToStore()
  const infix = useInfix()

  const walletConnected = util.isAddress(walletAddress)
  const isMobile = infix < Infix.lg

  const filteredSegmented = useMemo(() => {
    // Disabled button when wallet not connected
    if (!isMobile)
      return CATEGORIES.map(({ icon, label, value }) => {
        const disabled = !walletConnected && value === AppCategories.Yours
        return { icon, label, value, disabled }
      })
    // Remove label
    return CATEGORIES.map(({ icon, value }) => {
      const disabled = !walletConnected && value === AppCategories.Yours
      return { icon, value, disabled }
    })
  }, [isMobile, walletConnected])

  const onClick = useCallback(
    (key: SegmentedValue) => {
      if (key === AppCategories.Overview)
        return history.push(`/app/${appStoreId}`)
      if (key === AppCategories.Yours)
        return history.push(`/app/${appStoreId}/${YOUR_DAPP}`)
      return onGoToStore({ search: `?category=${key}` })
    },
    [history, onGoToStore],
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
