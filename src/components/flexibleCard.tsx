import { Card } from 'antd'
import { CSSProperties, ReactNode } from 'react'

const MULTI_BG = {
  purple:
    'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(99, 51, 255, 0.1)',
  green:
    'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(14, 181, 111, 0.1)',
  blue: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(51, 139, 255, 0.1)',
  pink: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(255, 111, 216, 0.1)',
}

type FlexibleCardProps = {
  children?: ReactNode
  type?: 'purple' | 'green' | 'blue' | 'pink'
  style?: CSSProperties
  spacing?: number
  bodySpacing?: number
  radius?: number
  bodyRadius?: number
  bodyStyle?: CSSProperties
  transparent?: boolean
  className?: string
}
const FlexibleCard = ({
  children,
  type = 'purple',
  spacing = 12,
  bodySpacing = 0,
  bodyRadius = 12,
  radius = 16,
  style,
  bodyStyle,
  transparent = false,
  className = '',
}: FlexibleCardProps) => {
  const bgColor = MULTI_BG[type]
  const styleBodyBg = transparent ? { background: 'transparent' } : {}

  return (
    <Card
      style={{
        ...style,
        background: bgColor,
        borderRadius: radius,
        boxShadow: 'unset',
      }}
      className={className}
      bodyStyle={{ padding: spacing }}
    >
      <Card
        bordered={false}
        style={{
          ...bodyStyle,
          ...styleBodyBg,
          borderRadius: bodyRadius,
          boxShadow: 'unset',
        }}
        bodyStyle={{ padding: bodySpacing }}
      >
        {children}
      </Card>
    </Card>
  )
}

export default FlexibleCard
