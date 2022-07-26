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
    <Row gutter={[12, 12]} justify="space-between">
      <Col xs={24} md={8}>
        <Select
          size="large"
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
      <Col
        xs={{ span: 24, offset: undefined }}
        md={{ span: 12, offset: 4 }}
        lg={{ span: 8, offset: 8 }}
      >
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Button size="large" ghost block onClick={scrollToCategory}>
              Categories
            </Button>
          </Col>
          <Col span={12}>
            <Button
              size="large"
              ghost
              block
              onClick={() => history.push('/app/' + appStoreId + '/your-apps')}
            >
              Your DApps
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Search
