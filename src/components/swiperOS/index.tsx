import { ReactNode } from 'react'
import { Swiper } from 'swiper/react'
import { Navigation, SwiperOptions } from 'swiper'

import 'swiper/css/bundle'
import './index.less'

export const SwiperOs = ({
  children,
  navigationId = '',
  ...rest
}: { children: ReactNode; navigationId?: string } & SwiperOptions) => {
  const navigaConfig = {
    nextEl: `.${navigationId}swiper-next-element`,
    prevEl: `.${navigationId}swiper-prev-element`,
  }

  return (
    <Swiper
      slidesPerView={'auto'}
      lazy
      spaceBetween={24}
      modules={[Navigation]}
      navigation={navigaConfig}
      {...rest}
    >
      {children}
    </Swiper>
  )
}
