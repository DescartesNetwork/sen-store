import { MouseEvent, useCallback, useMemo } from 'react'
import { useTheme } from '@sentre/senhub'

import { Avatar, Card, Col, Row, Space, Typography } from 'antd'

import { TwitterMentions } from 'hooks/useTwitterMentions'

const BG_COLOR_1 =
  'radial-gradient(circle 90px at 80% 60%, rgb(83 127 255 / 40%), transparent)'
const BG_COLOR_2 =
  'radial-gradient(circle 90px at 80% 60%, rgb(57 116 184 / 40%), transparent)'
const BG_COLOR_3 =
  'radial-gradient(circle 90px at 80% 60%, rgb(117 81 236 / 40%), transparent)'

export type CardTwitterProps = {
  indexColor?: number
  data: TwitterMentions
}

const CardTwitter = ({ indexColor = 0, data }: CardTwitterProps) => {
  const theme = useTheme()

  const cardBackground = useMemo(() => {
    switch (indexColor) {
      case 1:
        return BG_COLOR_1
      case 2:
        return BG_COLOR_2
      case 3:
        return BG_COLOR_3
      default:
        return BG_COLOR_1
    }
  }, [indexColor])

  const onUser = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      return window.open(`https://twitter.com/${data.username}`, '_blank')
    },
    [data.username],
  )
  const onTweet = useCallback(() => {
    return window.open(
      `https://twitter.com/${data.username}/status/${data.id}`,
      '_blank',
    )
  }, [data.username, data.id])

  return (
    <Card
      bordered={false}
      style={{
        height: '100%',
        background: theme === 'light' ? '#FFF' : undefined,
        boxShadow: 'none',
      }}
      bodyStyle={{
        height: '100%',
        background: cardBackground,
      }}
      className="card-twitter hoverable-transform"
    >
      <Row gutter={[16, 16]} align="middle">
        <Col span={24} onClick={onUser}>
          <Space size={12}>
            <Avatar size={44} src={data.avatar} />
            <Space size={0} direction="vertical">
              <Typography.Text strong>{data.name}</Typography.Text>
              <Typography.Text type="secondary">{`@${data.username}`}</Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col span={24} onClick={onTweet}>
          <Typography.Paragraph ellipsis={{ rows: 5 }}>
            {data.text}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default CardTwitter
