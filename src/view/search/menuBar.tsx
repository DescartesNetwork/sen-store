import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useInfix, Infix, useAppRoute } from '@sentre/senhub'
import { useHistory, useLocation } from 'react-router-dom'

import { Button, Card, Segmented, Space } from 'antd'
import { SegmentedValue } from 'antd/lib/segmented'
import IconSax from '@sentre/antd-iconsax'

import { useGoToStore } from 'hooks/useGotoStore'
import { AppCategories, QueryParams, YOUR_DAPP } from 'contant'
import configs from 'configs'
import IonIcon from '@sentre/antd-ionicon'
import useWalletConnected from 'hooks/useWalletConnected'

const {
  manifest: { appId: appStoreId },
} = configs

const CATEGORIES = [
  {
    icon: <IconSax name="Category" variant="Bold" />,
    value: AppCategories.Overview,
    label: AppCategories.Overview,
  },
  {
    icon: <IconSax name="Magicpen" variant="Bold" />,
    value: AppCategories.Utility,
    label: AppCategories.Utility,
  },
  {
    icon: <IconSax name="Chart21" variant="Bold" />,
    value: AppCategories.Defi,
    label: AppCategories.Defi,
  },
  {
    icon: <IconSax name="Game" variant="Bold" />,
    value: AppCategories.Game,
    label: AppCategories.Game,
  },
  {
    icon: <IconSax name="UserOctagon" variant="Bold" />,
    value: AppCategories.Yours,
    label: AppCategories.Yours,
  },
  {
    icon: <IconSax name="MoreSquare" variant="Bold" />,
    value: AppCategories.More,
    label: AppCategories.More,
  },
  {
    icon: <IconSax name="Task" variant="Bold" />,
    value: AppCategories.All,
    label: AppCategories.All,
  },
  {
    icon: <IconSax name="CardCoin" variant="Bold" />,
    value: AppCategories.Liquidity,
    label: AppCategories.Liquidity,
  },
  {
    icon: <IonIcon name="logo-sentre" />,
    value: AppCategories.Sentre,
    label: AppCategories.Sentre,
  },
  {
    icon: <IconSax name="FormatCircle" variant="Bold" />,
    value: AppCategories.DAO,
    label: AppCategories.DAO,
  },

  {
    icon: <IconSax name="Book" variant="Bold" />,
    value: AppCategories.Portfolio,
    label: AppCategories.Portfolio,
  },
]

const MenuBar = () => {
  const [activeSegmented, setActiveSegmented] = useState<SegmentedValue>(
    AppCategories.Overview,
  )
  const [visible, setVisible] = useState(false)
  const history = useHistory()
  const onGoToStore = useGoToStore()
  const location = useLocation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { root, extend } = useAppRoute(appStoreId)
  const walletConnected = useWalletConnected()
  const infix = useInfix()

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  )
  const pathName = location.pathname
  const isMobile = infix < Infix.lg
  const urlCategory = query.get(QueryParams.category) || ''

  const { showMoreCats, showedCats } = useMemo(() => {
    let nextCategories = []
    // Disabled button when wallet not connected
    if (!isMobile)
      nextCategories = CATEGORIES.map(({ icon, label, value }) => {
        const disabled = !walletConnected && value === AppCategories.Yours
        return { icon, label, value, disabled }
      })
    // Remove label on mobile
    else
      nextCategories = CATEGORIES.map(({ icon, value }) => {
        const disabled = !walletConnected && value === AppCategories.Yours
        return { icon, value, disabled }
      })
    // Splice showing and more categories to a different array
    const indexOfMoreCat = nextCategories.findIndex(
      ({ value }) => value === AppCategories.More,
    )
    const showedCats = nextCategories.splice(0, indexOfMoreCat + 1)
    return {
      showedCats,
      showMoreCats: nextCategories,
    }
  }, [isMobile, walletConnected])

  const onClick = useCallback(
    (key: SegmentedValue) => {
      setVisible(false)
      switch (key) {
        case AppCategories.More:
          setActiveSegmented(key)
          return setVisible(true)
        case AppCategories.Overview:
          setActiveSegmented(AppCategories.Overview)
          return history.push(root)
        case AppCategories.Yours:
          setActiveSegmented(AppCategories.Yours)
          return history.push(extend(`/${YOUR_DAPP}`, { absolutePath: true }))
        case AppCategories.All:
          setActiveSegmented(AppCategories.All)
          return history.push(
            extend(`/${AppCategories.All}`, { absolutePath: true }),
          )
        default:
          setActiveSegmented(key)
          return onGoToStore({ search: `?category=${key}` })
      }
    },
    [extend, history, onGoToStore, root],
  )

  const onDefaultActiveSegmented = useCallback(() => {
    if (pathName.endsWith(YOUR_DAPP))
      return setActiveSegmented(AppCategories.Yours)

    if (pathName.endsWith(AppCategories.All))
      return setActiveSegmented(AppCategories.All)
    if (!!urlCategory.length) {
      return setActiveSegmented(urlCategory)
    }
    return setActiveSegmented(AppCategories.Overview)
  }, [pathName, urlCategory])

  useEffect(() => {
    const ctx = wrapperRef.current
    if (!ctx) return
    window.addEventListener('click', (e) => {
      if (!ctx.contains(e.target as Node)) return setVisible(false)
    })
    return () => window.removeEventListener('click', () => {})
  }, [])

  // Active segmented with category in url
  useEffect(() => {
    if (!visible) return onDefaultActiveSegmented()
  }, [onDefaultActiveSegmented, visible])

  return (
    <Fragment>
      <div style={{ width: '100%', position: 'relative' }} ref={wrapperRef}>
        {visible && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
            }}
          >
            <Card
              className="show-more-card"
              bordered={false}
              style={{ borderRadius: 8 }}
              bodyStyle={{ padding: 12 }}
            >
              <Space direction="vertical">
                {showMoreCats.map(({ value, disabled, icon }, idx) => (
                  <Button
                    className={
                      value === urlCategory || pathName.endsWith(value)
                        ? 'active'
                        : ''
                    }
                    type="text"
                    style={{
                      background: 'transparent',
                      textTransform: 'capitalize',
                    }}
                    icon={icon}
                    disabled={disabled}
                    onClick={() => onClick(value)}
                    key={idx}
                  >
                    {value}
                  </Button>
                ))}
              </Space>
            </Card>
          </div>
        )}
        <Segmented
          size="large"
          value={activeSegmented}
          onChange={onClick}
          options={showedCats}
        />
      </div>
    </Fragment>
  )
}

export default MenuBar
