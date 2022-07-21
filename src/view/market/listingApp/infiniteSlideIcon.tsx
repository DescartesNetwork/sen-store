import AppIcon from 'components/appIcon'
import { useCallback, useEffect } from 'react'

type InfiniteSlideIconProps = {
  appIds: AppIds
  size?: number
  reverse?: boolean
}
let timer: NodeJS.Timer

const InfiniteSlideIcon = ({
  appIds,
  size = 84,
  reverse = false,
}: InfiniteSlideIconProps) => {
  // const [listAppId, setListAppId] = useState<AppIds>([])
  const clnDirection = reverse ? 'slide-reverse' : 'slide-stream'

  // const detectViewPort = useCallback(() => {
  //   const lastId = appIds[appIds.length - 1]
  //   const element = document.getElementById(lastId)
  //   if (!element) return false

  //   const bounding = element.getBoundingClientRect()
  //   return (
  //     bounding.left >= 0 &&
  //     bounding.right <=
  //       (window.innerWidth || document.documentElement.clientWidth)
  //   )
  // }, [appIds])

  // const rollingRepeatElement = useCallback(() => {
  //   if (!!timer) clearTimeout(timer)

  //   let right = 0
  //   const element = document.getElementById('parent_slide')
  //   console.log(element, 0)
  //   if (!element || !element.firstElementChild) return
  //   const firstElm = element.firstElementChild
  //   const firstElmBounding = firstElm.getBoundingClientRect()
  //   console.log(firstElmBounding, 1)

  //   const scroll = () => {
  //     right += 0.5
  //     console.log(firstElmBounding.right, 2, right)
  //     if (right >= firstElmBounding.right - 84) {
  //       console.log(firstElmBounding.right, 3)
  //       right = 0
  //       firstElm.setAttribute('style', `margin-left: ${right}`)
  //       // element.appendChild(firstElm)
  //     } else firstElm.setAttribute('style', `margin-left: -${right}px`)
  //   }
  //   timer = setInterval(() => scroll(), 50)
  // }, [])

  // useEffect(() => {
  //   rollingRepeatElement()
  //   return () => clearTimeout(timer)
  // }, [rollingRepeatElement])

  // set list app id
  // useEffect(() => {
  //   if (!!appIds.length) setListAppId(appIds)
  // }, [appIds])

  // set first app id to last list
  // useEffect(() => {
  //   if (timer) clearInterval(timer)
  //   timer = setInterval(() => {
  //     const isInViewPort = detectViewPort()
  //     if (isInViewPort) {
  //       const nextData = [...listAppId]
  //       nextData.push(nextData.shift() || '')
  //       setListAppId(nextData)
  //     }
  //   }, 1000)

  //   return () => clearInterval(timer)
  // }, [detectViewPort, listAppId])

  // (function(){
  //   var right=0;
  //   var par = document.getElementById('par')
  //   var scroll = function() {
  //     right++;
  //     if( right>=par.firstElementChild.offsetRight )
  //     {
  //       //first element is out of sight, so move to the end of the list
  //       right=0;
  //       par.firstElementChild.style.marginRight='';//reset to -
  //       par.appendChild(par.firstElementChild);
  //     }
  //     else
  //     {
  //        par.firstElementChild.style.marginRight='-'+right+'px';
  //     }
  //     setTimeout(scroll, 100)
  //   }
  //   scroll();
  //   })()

  return (
    <div className="infinite-slide-wrapper">
      <div className={`slide-element ${clnDirection}`} id="parent_slide">
        {appIds.map((appId) => (
          <div className="slide-item" id={appId} key={appId}>
            <AppIcon size={size} appId={appId} name={false} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfiniteSlideIcon
