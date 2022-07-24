import { useHistory } from 'react-router-dom'

import { Button, Col, Row, Select, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

export type SearchProps = {
  scrollToCategory: () => void
}

const Search = ({ scrollToCategory }: SearchProps) => {
  const history = useHistory()
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <Select
          size="large"
          placeholder="Search dapp name, author"
          suffixIcon={
            <IonIcon name="search-outline" style={{ fontSize: '18px' }} />
          }
          style={{ width: '100%', border: 'none' }}
          showSearch
        ></Select>
      </Col>
      <Col xs={24} md={16} style={{ textAlign: 'right' }}>
        <Space>
          <Button
            size="large"
            style={{ borderColor: '#6333FF', color: '#6333FF' }}
            ghost
            onClick={scrollToCategory}
          >
            Categories
          </Button>
          <Button
            size="large"
            style={{ borderColor: '#6333FF', color: '#6333FF' }}
            ghost
            onClick={() => history.push('/app/' + appId + '/your-apps')}
          >
            Your dapp
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Search
