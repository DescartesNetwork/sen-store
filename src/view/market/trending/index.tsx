import { ReactNode } from 'react'

import { Button, Card, Col, Image, Row, Space, Typography } from 'antd'

import './index.less'
import IonIcon from '@sentre/antd-ionicon'

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
}
const CardTrending = ({
  align = 'middle',
  justify = 'start',
  bg,
  middle = false,
  children,
}: CardTrendingProps) => {
  const colWithAlign = !middle ? 24 : undefined

  return (
    <Row gutter={[24, 24]} justify={justify} align={align}>
      {bg && (
        <Col className="bg-trending" span={24}>
          <Image src={bg} preview={false} />
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
    </Row>
  )
}

const Trending = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={5}>Trending topics</Typography.Title>
      </Col>
      <Col span={12}>
        <CardTrending
          align="middle"
          bg="https://bafybeiefdbsycwts4chxsyu7vgm7fntmzwmiganngdfzq4pzjymdjlrjym.ipfs.infura-ipfs.io/"
          middle
          justify="center"
        >
          <Space direction="vertical">
            <Typography.Title level={4}>
              BEST NFT Marketingplace
            </Typography.Title>
            <Typography.Text>FOR BEGINNERS</Typography.Text>
            <Button onClick={() => {}} type="text">
              <Space size={4}>
                6 App
                <IonIcon name="chevron-forward-outline" />
              </Space>
            </Button>
          </Space>
        </CardTrending>
      </Col>
      <Col span={12}>
        <Row gutter={[24, 24]}>
          {[24, 12, 12].map((span, idx) => (
            <Col span={span} key={idx}>
              <CardTrending
                align="middle"
                bg="https://bafybeiefdbsycwts4chxsyu7vgm7fntmzwmiganngdfzq4pzjymdjlrjym.ipfs.infura-ipfs.io/"
              >
                <Space direction="vertical">
                  <Typography.Title level={4}>
                    BEST NFT Marketingplace
                  </Typography.Title>
                  <Typography.Text>FOR BEGINNERS</Typography.Text>
                  <Button onClick={() => {}} type="text">
                    <Space size={4}>
                      6 App
                      <IonIcon name="chevron-forward-outline" />
                    </Space>
                  </Button>
                </Space>
              </CardTrending>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Trending
