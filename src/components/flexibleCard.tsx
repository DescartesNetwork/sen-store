import { CSSProperties, ReactNode } from 'react'
import { useTheme } from '@sentre/senhub'

import { Card } from 'antd'

const MULTI_BG_LIGHT = {
  purple:
    'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(99, 51, 255, 0.1)',
  green:
    'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(14, 181, 111, 0.1)',
  blue: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(51, 139, 255, 0.1)',
  pink: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(255, 111, 216, 0.1)',
  murrey: '#EAE6F5',
}
const MULTI_BG_DARK = {
  purple: '#201A32',
  green: '#2B3330',
  blue: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(51, 139, 255, 0.1)',
  pink: '#2E252C',
  murrey: '#09090D',
}

export type FlexibleCardType = 'purple' | 'green' | 'blue' | 'pink' | 'murrey'
type FlexibleCardProps = {
  children?: ReactNode
  type?: FlexibleCardType
  style?: CSSProperties
  spacing?: number
  bodySpacing?: number
  radius?: number
  bodyRadius?: number
  bodyStyle?: CSSProperties
  transparent?: boolean
  className?: string
  bordered?: boolean
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
  bordered = true,
}: FlexibleCardProps) => {
  const theme = useTheme()
  const bgColor = theme === 'dark' ? MULTI_BG_DARK[type] : MULTI_BG_LIGHT[type]
  const styleBodyBg = transparent ? { background: 'transparent' } : {}

  return (
    <Card
      style={{
        ...style,
        background: bgColor,
        borderRadius: radius,
        boxShadow: 'unset',
        height: '100%',
      }}
      className={className}
      bodyStyle={{ padding: spacing, height: '100%' }}
      bordered={bordered}
    >
      <Card
        bordered={false}
        style={{
          ...bodyStyle,
          ...styleBodyBg,
          borderRadius: bodyRadius,
          boxShadow: 'unset',
          height: '100%',
        }}
        bodyStyle={{ padding: bodySpacing, height: '100%' }}
      >
        {children}
      </Card>
    </Card>
  )
}

export default FlexibleCard
