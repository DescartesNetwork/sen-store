import { CSSProperties } from 'react'

import { Card, Col, Row } from 'antd'
import { MultiStaticLoader } from 'components/staticLoader'
import FlexibleCard from 'components/flexibleCard'
import AppCardInfo from 'components/appCardInfo'

import { useGoToStore } from 'hooks/useGotoStore'

import imgError from 'static/images/error-image.svg'

export type CardHotAppCardProps = {
  appId: string
  style?: CSSProperties
}

const CardHotAppCard = ({ appId, style = {} }: CardHotAppCardProps) => {
  const onOpen = useGoToStore()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <MultiStaticLoader
          defaultData={[imgError]}
          appId={appId}
          type="panels"
          render={(data) => (
            <FlexibleCard type="purple" className="hoverable-transform">
              <Row gutter={0}>
                <Col span={24} style={{ zIndex: 1 }}>
                  <Card
                    style={{
                      backgroundImage: `url(${data[0] || imgError})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      boxShadow: 'none',
                      borderRadius: 12,
                      ...style,
                    }}
                    bordered={false}
                    bodyStyle={{ padding: 0 }}
                    key={appId}
                    onClick={() => onOpen({ appId })}
                  />
                </Col>
                <Col span={24} style={{ top: -16, zIndex: 0 }}>
                  <AppCardInfo appId={appId} />
                </Col>
              </Row>
            </FlexibleCard>
          )}
        />
      </Col>
    </Row>
  )
}

export default CardHotAppCard
