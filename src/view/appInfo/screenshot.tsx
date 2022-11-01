import { useAppWidth, Infix } from '@sentre/senhub'

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

const ScreenShot = ({ appId }: { appId: string }) => {
  const width = useAppWidth()

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
                slidesPerView={width < Infix.md ? 1 : 2}
                navigationId="screen_shot"
              >
                {data.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      style={{ aspectRatio: '4/3', objectFit: 'cover' }}
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
