import { useTheme } from '@sentre/senhub'
import { Button, Card, Space, Typography } from 'antd'

const IntegrationCard = () => {
  const theme = useTheme()
  return (
    <Card
      bordered={false}
      style={{
        boxShadow: 'none',
        background: theme === 'light' ? '#FFF' : undefined,
      }}
    >
      <Space direction="vertical">
        <Typography.Text style={{ fontSize: 32, color: '#9270FF' }}>
          Integration
        </Typography.Text>
        <Typography.Title level={2}>Ready to list your DApp?</Typography.Title>
        <Typography.Text type="secondary">
          No need to start from scratch! This directory includes open source
          tools, tutorials, and libraries built or submitted by the Sentre
          community.
        </Typography.Text>
        <Space size={12}>
          <Button
            type="primary"
            size="large"
            onClick={() =>
              window.open(
                'https://hub.sentre.io/app/connector_tester?tab=dapp-submission&autoInstall=true',
                '_blank',
              )
            }
          >
            Submit project
          </Button>
          <Button
            size="large"
            ghost
            onClick={() =>
              window.open(
                'https://academy.sentre.io/how-to-list-dapp-on-sentre/',
                '_blank',
              )
            }
          >
            Learn more
          </Button>
        </Space>
      </Space>
    </Card>
  )
}

export default IntegrationCard
