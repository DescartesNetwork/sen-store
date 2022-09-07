import { useCallback, useEffect, useMemo, useState } from 'react'
import { useInfix, Infix, useWalletAddress, util } from '@sentre/senhub'
import { useHistory, useLocation } from 'react-router-dom'

import { Segmented } from 'antd'
import { SegmentedValue } from 'antd/lib/segmented'
import IconSax from '@sentre/antd-iconsax'
import IonIcon from '@sentre/antd-ionicon'

import { useGoToStore } from 'hooks/useGotoStore'
import { AppCategories, QueryParams, YOUR_DAPP } from 'contant'
import configs from 'configs'

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
  const [activeSegmented, setActiveSegmented] = useState<SegmentedValue>(
    AppCategories.Overview,
  )
  const history = useHistory()
  const walletAddress = useWalletAddress()
  const onGoToStore = useGoToStore()
  const location = useLocation()

  const infix = useInfix()
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  )

  const walletConnected = util.isAddress(walletAddress)
  const isMobile = infix < Infix.lg
  const urlCategory = query.get(QueryParams.category) || ''

  const filteredSegmented = useMemo(() => {
    // Disabled button when wallet not connected
    if (!isMobile)
      return CATEGORIES.map(({ icon, label, value }) => {
        const disabled = !walletConnected && value === AppCategories.Yours
        return { icon, label, value, disabled }
      })
    // Remove label on mobile
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

  // Active segmented with category in the first time
  useEffect(() => {
    if (!!urlCategory.length) return setActiveSegmented(urlCategory)
    return setActiveSegmented(AppCategories.Overview)
  }, [urlCategory])

  return (
    <Segmented
      size="large"
      value={activeSegmented}
      onChange={onClick}
      options={filteredSegmented}
    />
  )
}

export default MenuBar
