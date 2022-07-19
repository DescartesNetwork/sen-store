import { ReactNode, useMemo } from 'react'
import { useUI } from '@sentre/senhub'
import { Swiper } from 'swiper/react'
import { Navigation, SwiperOptions } from 'swiper'

import 'swiper/css/bundle'
import './index.less'

export const SwiperOs = ({
  children,
  ...rest
}: { children: ReactNode } & SwiperOptions) => {
  const {
    ui: { infix },
  } = useUI()
  const isMobile = useMemo(() => infix === 'xs', [infix])

  return (
    <Swiper
      slidesPerView={'auto'}
      lazy
      spaceBetween={24}
      modules={isMobile ? [] : [Navigation]}
      navigation={!isMobile}
      {...rest}
    >
      {children}
    </Swiper>
  )
}
