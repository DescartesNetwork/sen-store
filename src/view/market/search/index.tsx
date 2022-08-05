import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useRegister, useUI, useWallet } from '@sentre/senhub'
import { account } from '@senswap/sen-js'

import { Button, Card, Col, Empty, Input, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AppIcon from 'components/appIcon'
import SearchEngine from './searchEngine'

import configs from 'configs'
import './index.less'

const {
  manifest: { appId: appStoreId },
} = configs

export enum QueryParams {
  search = 'search',
}

export type SearchProps = {
  scrollToCategory: () => void
}
let searching: NodeJS.Timeout

const Search = ({ scrollToCategory }: SearchProps) => {
  const [searchKey, setSearchKey] = useState('')
  const [appIds, setAppIds] = useState<AppIds>([])
  const [searchVisible, setSearchVisible] = useState(false)
  const {
    ui: { theme, width },
  } = useUI()
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const history = useHistory()
  const register = useRegister()
  const location = useLocation()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  )
  const urlSearchKeys = query.get(QueryParams.search) || ''
  const engine = useMemo(() => new SearchEngine(register), [register])
  const isMobile = width < 768
  const walletConnected = account.isAddress(walletAddress)

  const onSearch = useCallback(async () => {
    if (searching) clearTimeout(searching)
    searching = setTimeout(async () => {
      if (!!searchKey.length) setSearchVisible(true)
      const appIds = engine.search(searchKey)
      setAppIds(appIds)
    }, 500)
  }, [engine, searchKey])

  const onPressEnter = useCallback(() => {
    if (appIds.length > 0) history.push(`/app/${appStoreId}/${appIds[0]}`)
  }, [appIds, history])

  // using url search key for the first time
  useEffect(() => {
    ;(() => {
      if (!!urlSearchKeys.length) setSearchKey(urlSearchKeys)
    })()
  }, [urlSearchKeys])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
      throw new Error(`Node expected`)
    }
  }

  useEffect(() => {
    const ctxWrapper = wrapperRef.current
    if (!ctxWrapper) return
    document.addEventListener('click', ({ target }) => {
      assertIsNode(target)
      if (!ctxWrapper.contains(target)) setSearchVisible(false)
    })
    return () => document.removeEventListener('click', () => {})
  }, [])

  return (
    <Row gutter={[12, 12]} justify="space-between">
      <Col xs={24} md={8}>
        <div style={{ position: 'relative' }} ref={wrapperRef}>
          <Input
            size="large"
            placeholder="Search dapp name, author"
            bordered={false}
            onChange={(event) => setSearchKey(event.target.value)}
            value={searchKey}
            allowClear
            prefix={
              <Button
                type="text"
                size="small"
                style={{ fontSize: '24px' }}
                icon={
                  <IonIcon name="search-outline" style={{ fontSize: '24px' }} />
                }
              />
            }
            style={{
              background: theme === 'light' ? '#e9e6f0' : '#09090d',
            }}
            autoFocus
            onPressEnter={onPressEnter}
            onFocus={() => setSearchVisible(true)}
          />
          {searchKey.length > 0 && searchVisible && (
            <Card
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
                      onClick={() =>
                        history.push(`/app/${appStoreId}/${appId}`)
                      }
                      className="app-item-select"
                    >
                      <Space
                        size={8}
                        style={{ cursor: 'pointer', padding: '12px 16px' }}
                      >
                        <AppIcon size={32} appId={appId} name={false} />
                        <Typography.Text>
                          {register[appId]?.name}
                        </Typography.Text>
                      </Space>
                    </Col>
                  ))}
                </Row>
              )}
            </Card>
          )}
        </div>
      </Col>
      <Col span={isMobile ? 24 : undefined}>
        <Row gutter={[16, 16]}>
          <Col span={walletConnected ? 12 : 24}>
            <Button size="large" ghost block onClick={scrollToCategory}>
              Categories
            </Button>
          </Col>
          {walletConnected && (
            <Col span={12}>
              <Button
                size="large"
                ghost
                block
                onClick={() =>
                  history.push('/app/' + appStoreId + '/your-apps')
                }
              >
                Your DApps
              </Button>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default Search
