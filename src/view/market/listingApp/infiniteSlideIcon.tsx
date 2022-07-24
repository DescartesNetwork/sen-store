import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'

import AppIcon from 'components/appIcon'

type InfiniteSlideIconProps = {
  appIds: AppIds
  size?: number
  reverse?: boolean
  slidePerView?: number | 'auto'
  spacing?: number
  speed?: number
}

const InfiniteSlideIcon = ({
  appIds,
  size = 84,
  reverse = false,
  slidePerView = 5,
  spacing = 24,
  speed = 7000,
}: InfiniteSlideIconProps) => {
  SwiperCore.use([Autoplay])

  return (
    <div>
      <Swiper
        slidesPerView={slidePerView}
        spaceBetween={spacing}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverse,
        }}
        speed={speed}
        loop
        className="apps-slide-infinite"
      >
        {appIds.map((appId, idx) => (
          <SwiperSlide key={idx}>
            <AppIcon size={size} appId={appId} name={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default InfiniteSlideIcon
