import { useEffect, useCallback, useState, Fragment, useMemo } from 'react'
import { Remarkable } from 'remarkable'

import { Row, Col, Typography, Modal } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { StaticLoader } from 'components/staticLoader'

const ReadMoreModal = ({ content }: { content: string }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <Typography.Text
        style={{ cursor: 'pointer', color: '#F9575E' }}
        onClick={() => setVisible(true)}
        type="danger"
      >
        Read more
      </Typography.Text>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close" />}
        footer={null}
        centered
        bodyStyle={{ padding: 32 }}
        className="readmore-modal"
      >
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Typography.Title level={4}>Description</Typography.Title>
          </Col>
          <Col span={24}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

const Markdown = ({ src }: { src: string }) => {
  const [text, setText] = useState('')

  const fetchData = useCallback(async () => {
    let txt = ''
    try {
      // Parse data
      if (!src) throw new Error('Invalid source url ')
      txt = await (await fetch(src)).text()
    } catch (er) {
      txt = 'Cannot load the README.md'
    }
    setText(txt)
  }, [src])

  const innerHtml = useMemo(() => {
    const md = new Remarkable({ html: true })
    return md.render(text)
  }, [text])
  const lineCount = useMemo(() => text.match(/\r?\n/g), [text])

  const isShowReadMore = useMemo(() => {
    if (lineCount && lineCount.length > 3) return true
    if (text.length > 200) return true

    return false
  }, [lineCount, text.length])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Row>
      <Col className="readme-loader" span={24}>
        <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
        {isShowReadMore && <div className="read-more" />}
      </Col>
      {isShowReadMore && (
        <Col span={24}>
          <ReadMoreModal content={innerHtml} />
        </Col>
      )}
    </Row>
  )
}

export type ReadmeLoaderProps = {
  appId: string
}

const ReadmeLoader = (props: ReadmeLoaderProps) => {
  const { appId } = props
  return (
    <StaticLoader
      type="readme"
      appId={appId}
      render={(src) => <Markdown src={src} />}
    />
  )
}

export default ReadmeLoader
