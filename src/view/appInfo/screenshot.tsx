import { useCallback } from 'react'
import { useAppWidth } from '@sentre/senhub'

import { Button, Col, Image, Row } from 'antd'
import { SwiperSlide } from 'swiper/react'
import {
  DEFAULT_NEXT_CLN,
  DEFAULT_PREV_CLN,
  SwiperOs,
} from 'components/swiperOS'

import { MultiStaticLoader } from 'components/staticLoader'

import imgError from 'static/images/error-image.svg'
import IonIcon from '@sentre/antd-ionicon'

const PADDING_CARD = 24
const PADDING_PAGE = 39 // padding 24 + width scroll bar 15

const ScreenShot = ({ appId }: { appId: string }) => {
  const width = useAppWidth()

  const calculatePerCard = useCallback(() => {
    if (width < 768) return 1
    return 2
  }, [width])
  const calculateHeightImage = useCallback(() => {
    if (width > 991)
      return (
        (3 *
          (((width - PADDING_PAGE - PADDING_CARD) / 2 - PADDING_CARD) / 2 -
            12)) /
        4
      )
    if (width <= 767)
      return (3 * (width - PADDING_PAGE - PADDING_CARD - PADDING_CARD)) / 4
    return (3 * ((width - PADDING_PAGE - PADDING_CARD) / 2 - PADDING_CARD)) / 4
  }, [width])

  return (
    <Row gutter={[24, 24]} justify="center" className="app-detail-carousel">
      <Col span={24}>
        <MultiStaticLoader
          appId={appId}
          type="panels"
          defaultData={[imgError]}
          render={(data) => {
            return (
              <SwiperOs
                slidesPerView={calculatePerCard()}
                navigationId="screen_shot"
              >
                {data.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      style={{ height: calculateHeightImage() }}
                      src={src}
                    />
                  </SwiperSlide>
                ))}
              </SwiperOs>
            )
          }}
        />
        <Button
          shape="circle"
          className={`screen_shot${DEFAULT_PREV_CLN}`}
          icon={<IonIcon name="chevron-back-outline" />}
        />
        <Button
          shape="circle"
          className={`screen_shot${DEFAULT_NEXT_CLN}`}
          icon={<IonIcon name="chevron-forward-outline" />}
        />
      </Col>
    </Row>
  )
}

export default ScreenShot
