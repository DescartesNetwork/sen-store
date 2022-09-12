import { useCallback, useEffect, useMemo, useState } from 'react'
import { Infix, useWidth } from '@sentre/senhub'

import { Card, Col, Row } from 'antd'

const PAGE_PADDING = 20
const ELEMENT_PADDING = 24
const HEIGHT_RATIO = 1.777777
const SENTRE_DOMAIN = 'https://academy.sentre.io'
const CONTENT_KEY = '2f42a053d7da65e50e82be9166'

const BottomBanner = () => {
  const [posts, setPosts] = useState([])
  const width = useWidth()

  const bannerHeightRatio = useMemo(
    () => (width < Infix.md ? HEIGHT_RATIO : HEIGHT_RATIO * 2),
    [width],
  )
  const bannerWidth = useMemo(
    () =>
      width < Infix.md
        ? width - PAGE_PADDING
        : width - PAGE_PADDING - ELEMENT_PADDING,
    [width],
  )

  const fetchLastedPost = useCallback(async () => {
    const response = await fetch(
      `${SENTRE_DOMAIN}/ghost/api/content/posts/?key=${CONTENT_KEY}&limit=2`,
    )
    const data = await response.json()
    const posts = data.posts
    return setPosts(posts)
  }, [])

  useEffect(() => {
    fetchLastedPost()
  }, [fetchLastedPost])

  return (
    <Row gutter={[24, 16]}>
      {posts.map((item: any, index) => {
        return (
          <Col md={12} xs={24} key={index}>
            <Card
              style={{
                height: Math.min(
                  (1920 - PAGE_PADDING - ELEMENT_PADDING) / HEIGHT_RATIO / 2,
                  bannerWidth / bannerHeightRatio,
                ),
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${item.feature_image})`,
                cursor: 'pointer',
              }}
              bordered={false}
              onClick={() => window.open(item.url, '_blank')}
            />
          </Col>
        )
      })}
    </Row>
  )
}

export default BottomBanner
