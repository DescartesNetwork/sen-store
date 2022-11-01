import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import { Infix, useAppWidth } from '@sentre/senhub'

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
  spacing = 24,
  speed = 7000,
}: InfiniteSlideIconProps) => {
  SwiperCore.use([Autoplay])
  const width = useAppWidth()

  return (
    <div>
      <Swiper
        slidesPerView={width < Infix.lg ? 3 : 5}
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
