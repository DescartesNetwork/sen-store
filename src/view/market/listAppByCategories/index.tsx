import { CSSProperties } from 'react'
import { CategoryOptions } from './hooks'
import ListApp from './listApp'
import SwiperListApp from './swiperListApp'

type ListAppByCategoriesProps = {
  title?: string
  navigation?: boolean
  rows?: number
  spacing?: number
  swiper?: boolean
  padding?: CSSProperties['padding']
} & CategoryOptions

const ListAppByCategories = ({
  title,
  navigation = false,
  rows = 2,
  spacing = 24,
  swiper = true,
  padding = 12,
  ...options
}: ListAppByCategoriesProps) => {
  if (!swiper)
    return (
      <ListApp title={title} {...options} spacing={spacing} padding={padding} />
    )

  return (
    <SwiperListApp
      title={title}
      rows={rows}
      spacing={spacing}
      navigation={navigation}
      {...options}
    />
  )
}

export default ListAppByCategories
