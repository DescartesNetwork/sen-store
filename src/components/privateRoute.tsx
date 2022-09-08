import useWalletConnected from 'hooks/useWalletConnected'
import { ComponentProps, ElementType, useCallback } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

export type PrivateRouteProps = {
  component: ElementType
} & ComponentProps<typeof Route>

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { pathname } = useLocation()
  const walletConnected = useWalletConnected()

  const render = useCallback(
    (props) => {
      const redirect = encodeURIComponent(pathname)
      if (!walletConnected)
        return <Redirect to={'/app/store?redirect=' + redirect} />
      return <Component {...props} />
    },
    [Component, pathname, walletConnected],
  )

  return <Route {...rest} render={render} />
}

export default PrivateRoute
