import { ReactNode } from 'react'
import { Swiper } from 'swiper/react'
import { Lazy, Navigation, SwiperOptions } from 'swiper'

import 'swiper/css'
import './index.less'

export const DEFAULT_NEXT_CLN = 'swiper-next-element'
export const DEFAULT_PREV_CLN = 'swiper-prev-element'

export const SwiperOs = ({
  children,
  navigationId = '',
  ...rest
}: { children: ReactNode; navigationId?: string } & SwiperOptions) => {
  const navigaConfig = {
    nextEl: `.${navigationId}${DEFAULT_NEXT_CLN}`,
    prevEl: `.${navigationId}${DEFAULT_PREV_CLN}`,
  }

  return (
    <Swiper
      slidesPerView={'auto'}
      lazy
      spaceBetween={24}
      modules={[Navigation, Lazy]}
      navigation={navigaConfig}
      {...rest}
    >
      {children}
    </Swiper>
  )
}
