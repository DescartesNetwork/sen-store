import { Col, Row, Card } from 'antd'
import MenuBar from './menuBar'
import MenuSearch from './menuSearch'

import { MAX_WIDTH } from 'contant'
import './index.less'

const Search = () => {
  return (
    <Card
      className="card-menu-categoires"
      style={{ borderRadius: 0 }}
      bodyStyle={{
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Row
        gutter={[12, 12]}
        align="middle"
        style={{ position: 'relative', maxWidth: MAX_WIDTH, width: '100%' }}
        justify="space-between"
        wrap={false}
      >
        <Col style={{ position: 'unset' }}>
          <MenuSearch />
        </Col>
        <Col>
          <MenuBar />
        </Col>
      </Row>
    </Card>
  )
}

export default Search
