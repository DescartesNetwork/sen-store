import { CategoryOptions } from './hooks'
import ListApp from './listApp'
import SwiperListApp from './swiperListApp'

type ListAppByCategoriesProps = {
  title?: string
  navigation?: boolean
  rows?: number
  spacing?: number
  swiper?: boolean
} & CategoryOptions

const ListAppByCategories = ({
  title,
  navigation = false,
  rows = 2,
  spacing = 24,
  swiper = true,
  ...options
}: ListAppByCategoriesProps) => {
  if (!swiper) return <ListApp title={title} {...options} />

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
