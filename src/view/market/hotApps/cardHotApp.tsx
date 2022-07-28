import { CSSProperties, useEffect, useRef, useState } from 'react'

import { Card, Col, Row } from 'antd'
import { MultiStaticLoader } from 'components/staticLoader'
import FlexibleCard from 'components/flexibleCard'
import AppCardInfo from 'components/appCardInfo'

import { useGoToStore } from 'hooks/useGotoStore'

import imgError from 'static/images/error-image.svg'

const CARD_SPACING = 26

export type CardHotAppCardProps = {
  appId: string
  style?: CSSProperties
}

const CardHotAppCard = ({ appId, style = {} }: CardHotAppCardProps) => {
  const [cardHeight, setCardHeight] = useState(0)
  const ref = useRef(null)
  const onOpen = useGoToStore({ appId })

  useEffect(() => {
    setCardHeight(((ref?.current as any)?.offsetWidth - CARD_SPACING) * 0.75)
  }, [ref])

  return (
    <Row ref={ref}>
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
                      height: cardHeight,
                      borderRadius: 12,
                      ...style,
                    }}
                    bordered={false}
                    bodyStyle={{ padding: 0 }}
                    key={appId}
                    onClick={onOpen}
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
