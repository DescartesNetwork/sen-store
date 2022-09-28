import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Infix, useInfix, useRegister, useTheme } from '@sentre/senhub'

import {
  Button,
  Card,
  Col,
  Empty,
  Input,
  InputRef,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AppIcon from 'components/appIcon'
import SearchEngine from './searchEngine'
import { LoadingOutlined } from '@ant-design/icons'

import { QueryParams } from 'contant'
import configs from 'configs'

const {
  manifest: { appId: appStoreId },
} = configs

let searching: NodeJS.Timeout

type ButtonSearchProps = {
  clearable?: boolean
  onClick?: () => void
  loading?: boolean
}
const ButtonSearch = ({
  clearable = false,
  onClick = () => {},
  loading = false,
}: ButtonSearchProps) => {
  if (loading)
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} />
    )
  if (clearable)
    return (
      <Button
        type="text"
        size="small"
        icon={<IonIcon name="trash-outline" />}
        onClick={onClick}
      />
    )
  return (
    <Button
      type="text"
      size="small"
      style={{ fontSize: 24 }}
      icon={<IonIcon name="search-outline" />}
    />
  )
}

type MenuSearchProps = { closeabel?: boolean; onClose?: () => void }
const MenuSearch = ({
  closeabel = false,
  onClose = () => {},
}: MenuSearchProps) => {
  const [searchKey, setSearchKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [appIds, setAppIds] = useState<AppIds>([])
  const [searchVisible, setSearchVisible] = useState(false)
  const history = useHistory()
  const register = useRegister()
  const location = useLocation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const ipRef = useRef<InputRef>(null)

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  )
  const urlSearchKeys = query.get(QueryParams.search) || ''
  const engine = useMemo(() => new SearchEngine(register), [register])

  const onSearch = useCallback(async () => {
    try {
      setLoading(true)
      if (searching) clearTimeout(searching)
      searching = await setTimeout(async () => {
        if (!!searchKey.length) setSearchVisible(true)
        const appIds = await engine.search(searchKey)
        setAppIds(appIds)
      }, 500)
    } catch (err) {
      //  Nothing
    } finally {
      setLoading(false)
    }
  }, [engine, searchKey])

  const onPressEnter = useCallback(() => {
    if (appIds.length > 0) history.push(`/app/${appStoreId}/${appIds[0]}`)
  }, [appIds, history])

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    const ipElm = ipRef.current
    if (!ipElm) return

    const key = e.code
    const shiftKey = e.shiftKey
    if (shiftKey && key === 'KeyS') ipElm.focus()
  }, [])

  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
      throw new Error(`Node expected`)
    }
  }

  // using url search key for the first time
  useEffect(() => {
    ;(() => {
      if (!!urlSearchKeys.length) setSearchKey(urlSearchKeys)
    })()
  }, [urlSearchKeys])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  useEffect(() => {
    const ctxWrapper = wrapperRef.current
    if (!ctxWrapper) return
    document.addEventListener('click', ({ target }) => {
      assertIsNode(target)
      if (!ctxWrapper.contains(target)) setSearchVisible(false)
    })
    return () => document.removeEventListener('click', () => {})
  }, [])

  //  Shift + S to search
  useEffect(() => {
    document.addEventListener('keypress', onKeyPress)
    return () => document.removeEventListener('keypress', onKeyPress)
  })

  return (
    <div style={{ position: 'relative' }} ref={wrapperRef}>
      <Input
        ref={ipRef}
        size="large"
        placeholder="Search dapp name, author"
        bordered={false}
        onChange={(event) => setSearchKey(event.target.value)}
        value={searchKey}
        prefix={
          <ButtonSearch
            clearable={!!searchKey}
            onClick={() => setSearchKey('')}
            loading={loading}
          />
        }
        suffix={
          closeabel && (
            <Button
              type="text"
              icon={<IonIcon name="close-outline" />}
              onClick={onClose}
            />
          )
        }
        style={{
          background: theme === 'light' ? '#e9e9eb' : '#373947',
        }}
        autoFocus
        onPressEnter={onPressEnter}
        onFocus={() => setSearchVisible(true)}
      />
      {searchKey.length > 0 && searchVisible && (
        <Card
          ref={popupRef}
          className="list-apps-search"
          bordered={false}
          bodyStyle={{ padding: '8px 0' }}
        >
          {appIds.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <Row className="scrollbar">
              {appIds.map((appId) => (
                <Col
                  key={appId}
                  span={24}
                  onClick={() => history.push(`/app/${appStoreId}/${appId}`)}
                  className="app-item-select"
                >
                  <Space
                    size={8}
                    style={{ cursor: 'pointer', padding: '12px 16px' }}
                  >
                    <AppIcon size={32} appId={appId} name={false} />
                    <Typography.Text>{register[appId]?.name}</Typography.Text>
                  </Space>
                </Col>
              ))}
            </Row>
          )}
        </Card>
      )}
    </div>
  )
}

const MobileSearch = () => {
  const [visible, setVisible] = useState(false)
  const visibleStyle = visible
    ? { width: '100%', opacity: 1 }
    : { width: 0, opacity: 0 }

  return (
    <Fragment>
      {!visible && (
        <Button
          style={{ position: 'relative', zIndex: 101 }}
          type="text"
          icon={<IonIcon name="search-outline" />}
          onClick={() => setVisible(true)}
        />
      )}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'all .3s linear',
          zIndex: 100,
          ...visibleStyle,
        }}
      >
        <MenuSearch closeabel onClose={() => setVisible(false)} />
      </div>
    </Fragment>
  )
}

const WrapSearch = () => {
  const infix = useInfix()
  const isMobile = infix < Infix.lg

  if (isMobile) return <MobileSearch />
  return <MenuSearch />
}

export default WrapSearch
