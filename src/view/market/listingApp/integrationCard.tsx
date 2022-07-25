import { Button, Card, Space, Typography } from 'antd'

const IntegrationCard = () => {
  return (
    <Card bordered={false} style={{ boxShadow: 'none', background: '#FFF' }}>
      <Space direction="vertical">
        <Typography.Text style={{ fontSize: 32 }}>Integration</Typography.Text>
        <Typography.Title level={2}>Ready to list your DApp?</Typography.Title>
        <Typography.Text type="secondary">
          No need to start from scratch! This directory includes open source
          tools, tutorials, and libraries built or submitted by the Sentre
          community.
        </Typography.Text>
        <Space size={12}>
          <Button type="primary" size="large">
            Submit project
          </Button>
          <Button size="large" onClick={() => {}}>
            Learn more
          </Button>
        </Space>
      </Space>
    </Card>
  )
}

export default IntegrationCard
