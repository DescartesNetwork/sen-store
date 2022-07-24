import { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import { useUI } from '@sentre/senhub'

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
  const {
    ui: { width },
  } = useUI()

  const isMobile = width < 768

  const calculatePerCard = useMemo(() => {
    if (isMobile) return 3
    return 5
  }, [isMobile])

  return (
    <div>
      <Swiper
        slidesPerView={calculatePerCard}
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
