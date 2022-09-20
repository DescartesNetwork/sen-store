import { Infix, useInfix, useTheme } from '@sentre/senhub'
import { Button, Card, Col, Row, Space, Typography } from 'antd'

const IntegrationCard = () => {
  const theme = useTheme()
  const infix = useInfix()

  const isMobile = infix < Infix.md
  const btnSpan = isMobile ? 12 : undefined

  return (
    <Card
      bordered={false}
      style={{
        boxShadow: 'none',
        background: theme === 'light' ? '#FFF' : undefined,
      }}
    >
      <Space direction="vertical">
        <Typography.Title
          level={3}
          style={{ color: '#9270FF', fontWeight: 400 }}
        >
          Integration
        </Typography.Title>
        <Typography.Title level={2}>Ready to list your DApp?</Typography.Title>
        <Typography.Text type="secondary">
          No need to start from scratch! This directory includes open source
          tools, tutorials, and libraries built or submitted by the Sentre
          community.
        </Typography.Text>
        <Row gutter={[12, 12]}>
          <Col span={btnSpan}>
            <Button
              type="primary"
              size="large"
              onClick={() =>
                window.open(
                  'https://hub.sentre.io/app/connector_tester?tab=dapp-submission&autoInstall=true',
                  '_blank',
                )
              }
              block
            >
              Submit project
            </Button>
          </Col>
          <Col span={btnSpan}>
            <Button
              size="large"
              ghost
              onClick={() =>
                window.open(
                  'https://academy.sentre.io/how-to-list-dapp-on-sentre/',
                  '_blank',
                )
              }
              block
            >
              Learn more
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>
  )
}

export default IntegrationCard
