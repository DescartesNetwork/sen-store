import { useCallback, useEffect, useMemo, useState } from 'react'
import { Infix, useAppWidth, useInfix } from '@sentre/senhub'
import axios from 'axios'

import { Card, Col, Row } from 'antd'
import { MAX_WIDTH } from 'contant'

const PAGE_PADDING = 24
const ELEMENT_PADDING = 24
const HEIGHT_RATIO = 1.777777
const SENTRE_DOMAIN = 'https://academy.sentre.io'
const CONTENT_KEY = '49fd240f17ab7cc0388aed0fea'

const BottomBanner = () => {
  const [posts, setPosts] = useState([])
  const width = useAppWidth()
  const infix = useInfix()

  const bannerHeightRatio = useMemo(
    () => (infix < Infix.md ? HEIGHT_RATIO : HEIGHT_RATIO * 2),
    [infix],
  )
  const bannerWidth = useMemo(
    () =>
      infix < Infix.md
        ? width - PAGE_PADDING
        : width - PAGE_PADDING - ELEMENT_PADDING,
    [infix, width],
  )

  // Tuan - 13/09 type qua dai de config
  const fetchLastedPost = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${SENTRE_DOMAIN}/ghost/api/content/posts/?key=${CONTENT_KEY}&limit=2`,
      )
      return setPosts(data.posts)
    } catch (error) {
      return setPosts([])
    }
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
                  (MAX_WIDTH - ELEMENT_PADDING) / HEIGHT_RATIO / 2,
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
