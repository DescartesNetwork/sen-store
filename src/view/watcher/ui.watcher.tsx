import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'

import { notification, message } from 'antd'
import { resize } from 'model/ui.controller'

const UIWatcher = () => {
  const [notificationAPI, notificationContextHolder] =
    notification.useNotification()
  const [mesageAPI, mesageContextHolder] = message.useMessage()
  const dispatch = useDispatch()

  // Notification system
  window.notify = ({
    type,
    description,
    onClick = () => {},
  }: SentreNotification) => {
    return notificationAPI[type]({
      message: type.toUpperCase(),
      description,
      onClick,
      style: { cursor: 'pointer' },
      closeIcon: <IonIcon name="close-outline" />,
    })
  }
  // Message system
  window.message = ({ type, description }: SentreMessage) => {
    return mesageAPI[type](description)
  }

  // Listen window events
  useEffect(() => {
    window.addEventListener('resize', () => dispatch(resize()))
    return () => window.removeEventListener('resize', () => dispatch(resize()))
  }, [dispatch])

  return (
    <Fragment>
      <Fragment key="nofitication-context-holder">
        {notificationContextHolder}
      </Fragment>
      <Fragment key="message-context-holder">{mesageContextHolder}</Fragment>
    </Fragment>
  )
}

export default UIWatcher
