import { useMemo, useState } from 'react'
import { useRegister } from '@sentre/senhub'

import { Button, Col, Radio, Row, Space, Typography } from 'antd'
import { compareAliasString } from '../listAppByCategories/hooks/custom'

import './index.less'
import IonIcon from '@sentre/antd-ionicon'
import ListExploreApp from './listExploreApp'

const CATEGORIES = ['utility', 'DAO', 'liquidity', 'sentre', 'game']

const ExploreApps = () => {
  const register = useRegister()
  const [category, setCategory] = useState('all')

  const tags = useMemo(() => {
    let tags: string[] = []
    for (const appId in register) {
      const newTags = register[appId]?.tags || []
      // Remove duplicate elements
      tags = Array.from(new Set([...tags, ...newTags]))
    }
    return CATEGORIES.filter((category) => compareAliasString(category, tags))
  }, [register])

  return (
    <Row gutter={[24, 32]} justify="center">
      <Col span={24}>
        <Row gutter={[24, 24]} justify="space-between" align="middle">
          <Col>
            <Typography.Title level={2}>Explore the Store</Typography.Title>
          </Col>
          <Col className="scrollbar">
            <Radio.Group
              className="explore-apps-group-btn"
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <Space>
                <Radio.Button value="all">All</Radio.Button>
                {tags.map((tag) => (
                  <Radio.Button
                    value={tag}
                    key={tag}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {tag}
                  </Radio.Button>
                ))}
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <ListExploreApp category={category} />
      </Col>
      <Col>
        <Space>
          <Button
            className="explore-app-swiper-prev"
            shape="circle"
            style={{ border: 'none' }}
            icon={<IonIcon name="chevron-back-outline" />}
          />
          <Button
            className="explore-app-swiper-next"
            shape="circle"
            style={{ border: 'none' }}
            icon={<IonIcon name="chevron-forward-outline" />}
          />
        </Space>
      </Col>
    </Row>
  )
}

export default ExploreApps
