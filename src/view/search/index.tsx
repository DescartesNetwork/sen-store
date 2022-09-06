import { Col, Row, Card } from 'antd'
import MenuBar from './menuBar'
import MenuSearch from './menuSearch'

import './index.less'

const Search = () => {
  return (
    <Card
      className="card-menu-categoires"
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: 16 }}
      bordered={false}
    >
      <Row gutter={[12, 12]} align="middle" style={{ position: 'relative' }}>
        <Col flex="auto">
          <MenuBar />
        </Col>
        <Col style={{ position: 'unset' }}>
          <MenuSearch />
        </Col>
      </Row>
    </Card>
  )
}

export default Search
