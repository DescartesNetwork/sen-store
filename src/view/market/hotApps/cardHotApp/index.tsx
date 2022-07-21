import { CSSProperties, useEffect, useRef, useState } from 'react'

import { Card, Col, Row } from 'antd'
import { MultiStaticLoader } from 'components/staticLoader'
import CardInfo from './cardInfo'
import FlexibleCard from 'components/flexibleCard'

import { useGoToStore } from 'hooks/useGotoStore'

import imgError from 'static/images/error-image.svg'

export type AppCardProps = {
  appId: string
  style?: CSSProperties
}

const AppCard = ({ appId, style = {} }: AppCardProps) => {
  const [cardHeight, setCardHeight] = useState(0)
  const ref = useRef(null)
  const onOpen = useGoToStore({ appId })

  useEffect(() => {
    setCardHeight((ref?.current as any)?.offsetWidth * 0.75)
  }, [ref])

  return (
    <Row ref={ref}>
      <Col span={24}>
        <MultiStaticLoader
          defaultData={[imgError]}
          appId={appId}
          type="panels"
          render={(data) => (
            <FlexibleCard type="purple">
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
                    bodyStyle={{ padding: 0 }}
                    key={appId}
                    onClick={onOpen}
                  />
                </Col>
                <Col span={24} style={{ top: -16, zIndex: 0 }}>
                  <CardInfo appId={appId} />
                </Col>
              </Row>
            </FlexibleCard>
          )}
        />
      </Col>
    </Row>
  )
}

export default AppCard
