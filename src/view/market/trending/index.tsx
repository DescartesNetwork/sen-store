import { ReactNode } from 'react'
import { useTheme } from '@sentre/senhub'

import { Card, Col, Image, Row, Space, Typography } from 'antd'

import { useGoToStore } from 'hooks/useGotoStore'
import { useAppCategory } from '../listAppByCategories/hooks'

import './index.less'

import Trending1_LIGHT from 'static/images/trending/trending-1.png'
import Trending2_LIGHT from 'static/images/trending/trending-2.png'
import Trending3_LIGHT from 'static/images/trending/trending-3.png'
import Trending4_LIGHT from 'static/images/trending/trending-4.png'

import Trending1_DARK from 'static/images/trending/trending-1-dark.png'
import Trending2_DARK from 'static/images/trending/trending-2-dark.png'
import Trending3_DARK from 'static/images/trending/trending-3-dark.png'
import Trending4_DARK from 'static/images/trending/trending-4-dark.png'

import Utility from 'static/images/trending/Utility.png'
import Liquidity from 'static/images/trending/Liquidity.png'
import Game from 'static/images/trending/Game.png'
import DAO from 'static/images/trending/DAO.png'

const CATEGORIES = ['utility', 'DAO', 'game', 'liquidity']
const MULTI_BG_LIGHT = {
  trending_1: Trending1_LIGHT,
  trending_2: Trending2_LIGHT,
  trending_3: Trending3_LIGHT,
  trending_4: Trending4_LIGHT,
}
const MULTI_BG_DARK = {
  trending_1: Trending1_DARK,
  trending_2: Trending2_DARK,
  trending_3: Trending3_DARK,
  trending_4: Trending4_DARK,
}

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
  category: string
}
const CardTrending = ({
  align = 'middle',
  justify = 'start',
  bg,
  middle = false,
  children,
  bgRight,
  category,
}: CardTrendingProps) => {
  const { appIds } = useAppCategory({ category: category })
  const onGoToCateGoryApp = useGoToStore()
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
            background: 'transparent',
            cursor: 'pointer',
            zIndex: 1,
          }}
          onClick={() =>
            onGoToCateGoryApp({
              search: `?category=${category}`,
            })
          }
        >
          <Space direction="vertical">
            <Typography.Title level={4} style={{ textTransform: 'capitalize' }}>
              {category}
            </Typography.Title>
            <Typography.Text type="secondary">
              {appIds.length} DApps
            </Typography.Text>
            {children}
          </Space>
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
  const theme = useTheme()
  const BG_COLOR = theme === 'light' ? MULTI_BG_LIGHT : MULTI_BG_DARK

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>Trending topics</Typography.Title>
      </Col>
      <Col span={12}>
        <CardTrending
          align="middle"
          bg={BG_COLOR.trending_1}
          bgRight={Utility}
          category={CATEGORIES[0]}
        />
      </Col>
      <Col span={12}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <CardTrending
              align="middle"
              bg={BG_COLOR.trending_2}
              bgRight={DAO}
              category={CATEGORIES[1]}
            />
          </Col>
          <Col xs={24} md={12}>
            <CardTrending
              align="middle"
              bg={BG_COLOR.trending_3}
              bgRight={Game}
              category={CATEGORIES[2]}
            />
          </Col>
          <Col xs={24} md={12}>
            <CardTrending
              align="middle"
              bg={BG_COLOR.trending_4}
              bgRight={Liquidity}
              category={CATEGORIES[3]}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Trending
