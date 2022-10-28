import { useAppWidth } from '@sentre/senhub'

export const useSwiperOverflowGaurd = () => {
  const appWidth = useAppWidth()
  return Math.min(appWidth - 24, 1440 - 24)
}
