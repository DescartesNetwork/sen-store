import { Space, Tag } from 'antd'

import { util } from '@sentre/senhub'

export type AppTagsProps = { tags?: string[]; wrap?: boolean }

const AppTags = ({ tags = [], wrap = true }: AppTagsProps) => {
  return (
    <Space size={8} wrap={wrap}>
      {tags.map((tag, index) => (
        <Tag
          style={{
            margin: 0,
            borderRadius: 4,
            color: util.randomColor(tag),
            textTransform: 'capitalize',
          }}
          color={util.randomColor(tag, 0.2)}
          key={index}
        >
          {tag}
        </Tag>
      ))}
    </Space>
  )
}

export default AppTags
