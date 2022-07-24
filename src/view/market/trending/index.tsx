import { ReactNode } from 'react'

import { Card, Col, Image, Row, Space, Typography } from 'antd'

import './index.less'

import Trending1 from 'static/images/trending/trending-1.png'
import Trending2 from 'static/images/trending/trending-2.png'
import Trending3 from 'static/images/trending/trending-3.png'
import Trending4 from 'static/images/trending/trending-4.png'

import Utility from 'static/images/trending/Utility.png'
import Liquidity from 'static/images/trending/Liquidity.png'
import Game from 'static/images/trending/Game.png'
import DAO from 'static/images/trending/DAO.png'

type CardTrendingProps = {
  align?: 'top' | 'bottom' | 'middle' | 'stretch'
  justify?:
    | 'center'
    | 'start'
    | 'end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  bg?: string
  middle?: boolean
  children?: ReactNode
  bgRight?: string
}
const CardTrending = ({
  align = 'middle',
  justify = 'start',
  bg,
  middle = false,
  children,
  bgRight,
}: CardTrendingProps) => {
  const colWithAlign = !middle ? 24 : undefined

  return (
    <Row gutter={[24, 24]} justify={justify} align={align}>
      {bg && (
        <Col className="bg-trending" span={24}>
          <Image src={bg} preview={false} style={{ borderRadius: '16px' }} />
        </Col>
      )}
      <Col span={colWithAlign}>
        <Card
          bordered={false}
          style={{
            boxShadow: 'unset',
            borderRadius: 0,
            background: 'transparent',
          }}
        >
          {children}
        </Card>
      </Col>
      {bgRight && (
        <Col className="bg-trending-right" span={24}>
          <Image
            src={bgRight}
            preview={false}
            style={{ borderRadius: '16px', width: '70%' }}
          />
        </Col>
      )}
    </Row>
  )
}

const Trending = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>Trending topics</Typography.Title>
      </Col>
      <Col span={12}>
        <CardTrending align="middle" bg={Trending1} bgRight={Utility}>
          <Space direction="vertical">
            <Typography.Title level={4}>Utility</Typography.Title>
            <Typography.Text type="secondary" style={{ cursor: 'pointer' }}>
              6 dapps
            </Typography.Text>
          </Space>
        </CardTrending>
      </Col>
      <Col span={12}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <CardTrending align="middle" bg={Trending2} bgRight={DAO}>
              <Space direction="vertical">
                <Typography.Title level={4}>DAO</Typography.Title>
                <Typography.Text type="secondary" style={{ cursor: 'pointer' }}>
                  6 dapps
                </Typography.Text>
              </Space>
            </CardTrending>
          </Col>
          <Col xs={24} md={12}>
            <CardTrending align="middle" bg={Trending3} bgRight={Game}>
              <Space direction="vertical">
                <Typography.Title level={4}>Game</Typography.Title>
                <Typography.Text type="secondary" style={{ cursor: 'pointer' }}>
                  6 dapps
                </Typography.Text>
              </Space>
            </CardTrending>
          </Col>
          <Col xs={24} md={12}>
            <CardTrending align="middle" bg={Trending4} bgRight={Liquidity}>
              <Space direction="vertical">
                <Typography.Title level={4}>Liquidity</Typography.Title>
                <Typography.Text type="secondary" style={{ cursor: 'pointer' }}>
                  6 dapps
                </Typography.Text>
              </Space>
            </CardTrending>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Trending
