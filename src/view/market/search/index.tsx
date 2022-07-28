import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRegister, useUI, useWallet } from '@sentre/senhub'

import { Button, Card, Col, Input, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AppIcon from 'components/appIcon'

import configs from 'configs'
import SearchEngine from './searchEngine'

import './index.less'

const {
  manifest: { appId: appStoreId },
} = configs

export type SearchProps = {
  scrollToCategory: () => void
}
let searching: NodeJS.Timeout

const Search = ({ scrollToCategory }: SearchProps) => {
  const [searchKey, setSearchKey] = useState('')
  const [appIds, setAppIds] = useState<AppIds>([])
  const [searchVisible, setSearchVisible] = useState(false)

  const {
    ui: { theme },
  } = useUI()
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const history = useHistory()
  const register = useRegister()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const engine = useMemo(() => new SearchEngine(register), [register])

  const onSearch = useCallback(async () => {
    if (searching) clearTimeout(searching)
    searching = setTimeout(async () => {
      const appIds = engine.search(searchKey)
      setAppIds(appIds)
      if (!!appIds.length) setSearchVisible(true)
    }, 500)
  }, [engine, searchKey])

  const onPressEnter = useCallback(() => {
    if (appIds.length > 0) history.push(`/app/${appStoreId}/${appIds[0]}`)
  }, [appIds, history])

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
          {appIds.length > 0 && searchVisible && (
            <Card
              className="list-apps-search"
              bordered={false}
              bodyStyle={{ padding: '8px 0' }}
            >
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
            </Card>
          )}
        </div>
      </Col>
      <Col
        xs={{ span: 24, offset: undefined }}
        md={{ span: 12, offset: 4 }}
        lg={{ span: 8, offset: 8 }}
      >
        <Row gutter={[12, 0]} justify="end">
          <Col span={12}>
            <Button size="large" ghost block onClick={scrollToCategory}>
              Categories
            </Button>
          </Col>
          {walletAddress && (
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
