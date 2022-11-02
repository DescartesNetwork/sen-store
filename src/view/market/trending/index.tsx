import { CSSProperties, ReactNode } from 'react'
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
import { Utility } from 'static/images/trending/utility'
import { DAO } from 'static/images/trending/dao'
import { Game } from 'static/images/trending/game'
import { Liquidity } from 'static/images/trending/liquidity'

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
const DEFAULT_CLN = 'hoverable-transform hoverable-svg'

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
  bgRight?: ReactNode
  category: string
  style?: CSSProperties
  className?: string
}
const CardTrending = ({
  align = 'middle',
  justify = 'start',
  bg,
  middle = false,
  children,
  bgRight,
  category,
  style,
  className,
}: CardTrendingProps) => {
  const { appIds } = useAppCategory({ category: category })
  const onGoToStore = useGoToStore()
  const colWithAlign = !middle ? 24 : undefined
  return (
    <Row
      gutter={[24, 24]}
      justify={justify}
      align={align}
      className={[DEFAULT_CLN, className].join(' ')}
      style={{ height: '100%', ...style }}
    >
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
          onClick={() => onGoToStore({ search: `?category=${category}` })}
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
          <div className="store-image">{bgRight}</div>
        </Col>
      )}
    </Row>
  )
}

const Trending = () => {
  const theme = useTheme()
  const BG_COLOR = theme === 'light' ? MULTI_BG_LIGHT : MULTI_BG_DARK

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Typography.Title level={2}>Trending topics</Typography.Title>
      </Col>
      <Col xs={24} md={12}>
        <CardTrending
          align="top"
          style={{ minHeight: 220 }}
          bg={BG_COLOR.trending_1}
          bgRight={<Utility />}
          category={CATEGORIES[0]}
          className="utility"
        />
      </Col>
      <Col xs={24} md={12}>
        <Row gutter={[24, 24]} style={{ height: '100%' }}>
          <Col span={24}>
            <CardTrending
              bg={BG_COLOR.trending_2}
              bgRight={<DAO />}
              category={CATEGORIES[1]}
              className="dao"
            />
          </Col>
          <Col xs={24} md={12}>
            <CardTrending
              bg={BG_COLOR.trending_3}
              bgRight={<Game />}
              category={CATEGORIES[2]}
              className="game"
            />
          </Col>
          <Col xs={24} md={12}>
            <CardTrending
              bg={BG_COLOR.trending_4}
              bgRight={<Liquidity />}
              category={CATEGORIES[3]}
              className="liquidity"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Trending
