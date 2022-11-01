import { useAppWidth, Infix } from '@sentre/senhub'

import { Button, Col, Image, Row } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'

import { MultiStaticLoader } from 'components/staticLoader'

import imgError from 'static/images/error-image.svg'
import IonIcon from '@sentre/antd-ionicon'
import { DEFAULT_NEXT_CLN, DEFAULT_PREV_CLN } from 'contant'
import { Lazy, Navigation } from 'swiper'

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
              <Swiper
                modules={[Navigation, Lazy]}
                slidesPerView={width < Infix.md ? 1 : 2}
                spaceBetween={24}
                navigation={{
                  nextEl: `.screen_shot_${DEFAULT_NEXT_CLN}`,
                  prevEl: `.screen_shot_${DEFAULT_PREV_CLN}`,
                }}
                lazy
              >
                {data.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      style={{ aspectRatio: '4/3', objectFit: 'cover' }}
                      src={src}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )
          }}
        />
        <Button
          shape="circle"
          className={`screen_shot_${DEFAULT_PREV_CLN}`}
          icon={<IonIcon name="chevron-back-outline" />}
        />
        <Button
          shape="circle"
          className={`screen_shot_${DEFAULT_NEXT_CLN}`}
          icon={<IonIcon name="chevron-forward-outline" />}
        />
      </Col>
    </Row>
  )
}

export default ScreenShot
