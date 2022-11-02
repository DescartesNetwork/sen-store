import { Col, Row, Card } from 'antd'
import MenuBar from './menuBar'
import MenuSearch from './menuSearch'

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
        gutter={[0, 12]}
        align="middle"
        style={{ position: 'relative' }}
        justify="space-between"
        wrap={false}
        className="store-col-container"
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
