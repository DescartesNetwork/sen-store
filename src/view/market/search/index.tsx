import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRegister } from '@sentre/senhub'

import { Button, Col, Row, Select, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import AppIcon from 'components/appIcon'

import configs from 'configs'
import SearchEngine from './searchEngine'

const {
  manifest: { appId: appStoreId },
} = configs

export type SearchProps = {
  scrollToCategory: () => void
}
let searching: NodeJS.Timeout

const Search = ({ scrollToCategory }: SearchProps) => {
  const [search, setSearch] = useState('')
  const [appIds, setAppIds] = useState<AppIds>([])

  const history = useHistory()
  const register = useRegister()

  const engine = useMemo(() => new SearchEngine(register), [register])

  const onSearch = useCallback(async () => {
    if (searching) clearTimeout(searching)
    searching = setTimeout(async () => {
      const appIds = engine.search(search)
      setAppIds(appIds)
    }, 500)
  }, [engine, search])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <Select
          size="large"
          value={search}
          onSearch={setSearch}
          placeholder="Search dapp name, author"
          suffixIcon={
            <IonIcon name="search-outline" style={{ fontSize: '18px' }} />
          }
          style={{ width: '100%', border: 'none' }}
          showSearch
          notFoundContent={null}
          onSelect={(value: string) =>
            history.push(`/app/${appStoreId}/${value}`)
          }
        >
          {appIds.map((appId) => (
            <Select.Option value={appId} key={appId}>
              <Space size={8}>
                <AppIcon size={32} appId={appId} name={false} />
                <Typography.Text>{register[appId]?.name}</Typography.Text>
              </Space>
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} md={16} style={{ textAlign: 'right' }}>
        <Space>
          <Button size="large" ghost onClick={scrollToCategory}>
            Categories
          </Button>
          <Button
            size="large"
            ghost
            onClick={() => history.push('/app/' + appStoreId + '/your-apps')}
          >
            Your dapps
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Search
