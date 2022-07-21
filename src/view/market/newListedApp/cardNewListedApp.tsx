import { useRegister } from '@sentre/senhub'

import { Card, Col, Image, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import Verification from 'components/verification'
import { useMemo } from 'react'

type CardNewListedAppProps = {
  vertical?: boolean
  appId: string
}
const CardNewListedApp = ({
  vertical = false,
  appId,
}: CardNewListedAppProps) => {
  const register = useRegister()

  const { name, verified, author, description } = useMemo(
    () => register[appId] || ({} as ComponentManifest),
    [register, appId],
  )

  const verticalSpan = vertical ? 24 : undefined
  const clnHorizontalImg = !vertical
    ? 'panel-img horizontal-panel'
    : 'panel-img'

  return (
    <Card bordered={false} className="new-listed-card">
      <Row gutter={[24, 24]} wrap={vertical}>
        <Col span={verticalSpan} className={clnHorizontalImg}>
          <Image
            src={
              'https://bafybeiefdbsycwts4chxsyu7vgm7fntmzwmiganngdfzq4pzjymdjlrjym.ipfs.infura-ipfs.io/'
            }
            preview={false}
          />
        </Col>
        <Col span={verticalSpan}>
          <Row gutter={[24, 24]}>
            {/* Group App Infos */}
            <Col span={24}>
              <Space size={16}>
                <AppIcon appId={appId} size={40} name={false} />
                <Space direction="vertical" size={0}>
                  <Space>
                    <Typography.Title level={5}>{name}</Typography.Title>
                    <Verification verified={verified} />
                  </Space>
                  <Typography.Text type="secondary">
                    {author.name}
                  </Typography.Text>
                </Space>
              </Space>
            </Col>
            {/* App pannel */}
            <Col span={24}>{description}</Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNewListedApp
