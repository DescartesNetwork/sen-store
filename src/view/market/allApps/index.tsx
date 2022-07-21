import { useMemo, useState } from 'react'
import { useRegister } from '@sentre/senhub'

import { Col, Radio, Row, Space, Typography } from 'antd'
import { compareAliasString } from '../appCategory/hooks/custom'
import ListAppByCategory from './listAppByCategory'

import './index.less'

const CATEGORIES = ['utility', 'DAO', 'liquidity', 'sentre', 'game']

const AllApps = () => {
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
    <Row gutter={[24, 32]}>
      <Col span={24}>
        <Row gutter={[24, 24]} justify="space-between">
          <Col>
            <Typography.Title level={2}>Explore the Store</Typography.Title>
          </Col>
          <Col>
            <Radio.Group
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <Space>
                <Radio.Button value="all">All</Radio.Button>
                {tags.map((tag) => (
                  <Radio.Button value={tag} key={tag}>
                    {tag}
                  </Radio.Button>
                ))}
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <ListAppByCategory category={category} />
      </Col>
    </Row>
  )
}

export default AllApps
