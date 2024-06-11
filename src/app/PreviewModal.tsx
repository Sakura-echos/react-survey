import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import { QnItem } from './type';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

export interface SurveyProps {
  openModal: boolean;
  setOpenModal: any;
  item: QnItem;
}

const PreviewModal: React.FC<SurveyProps> = ({
  openModal,
  setOpenModal,
  item,
}) => {
  return (
    <Modal
      title="預覽問卷"
      open={openModal}
      width={'80%'}
      onOk={() => {
        setOpenModal(false);
      }}
      onCancel={() => {
        setOpenModal(false);
      }}
      footer={[
        <Button
          key={'close'}
          onClick={() => {
            setOpenModal(false);
          }}
        >
          關閉
        </Button>,
      ]}
    >
      <h1 style={{ textAlign: 'center' }}>{item.titleZhTw}</h1>
      <Form layout="vertical">
        {item.questions.map((qItem, qIndex) => {
          switch (qItem.type) {
            case 'SINGLE':
              return (
                <Form.Item
                  required={qItem.require}
                  label={`${qIndex + 1}. ${qItem.nameZhTw}`}
                >
                  <Radio.Group>
                    {qItem.options?.map((oItem, oIndex) => {
                      return (
                        <Radio value={oItem.nameZhTw}>{oItem.nameZhTw}</Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              );
            case 'MULTIPLE':
              return (
                <Form.Item label={`${qIndex + 1}. ${qItem.nameZhTw}`}>
                  <Checkbox.Group>
                    <Row gutter={30}>
                      {qItem.options?.map((oItem, oIndex) => {
                        return (
                          <Col span={8}>
                            <Checkbox
                              value={oItem.nameZhTw}
                              style={{ lineHeight: '32px' }}
                            >
                              {oItem.nameZhTw}
                            </Checkbox>
                          </Col>
                        );
                      })}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              );
            case 'DROPDOWN':
              return (
                <Form.Item label={`${qIndex + 1}. ${qItem.nameZhTw}`}>
                  <Select>
                    {qItem.options?.map((oItem, oIndex) => {
                      return (
                        <Select.Option value={oItem.nameZhTw}>
                          {oItem.nameZhTw}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              );
            case 'TEXT':
              return (
                <Form.Item label={`${qIndex + 1}. ${qItem.nameZhTw}`}>
                  <Input />
                </Form.Item>
              );
            case 'TEXTAREA':
              return (
                <Form.Item label={`${qIndex + 1}. ${qItem.nameZhTw}`}>
                  <TextArea rows={4} />
                </Form.Item>
              );
            case 'FILE':
              return (
                <Form.Item
                  label={`${qIndex + 1}. ${qItem.nameZhTw}`}
                  valuePropName="fileList"
                >
                  <Upload action="/upload.do" listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>上傳附件</div>
                    </div>
                  </Upload>
                </Form.Item>
              );
            default:
              return <></>;
          }
        })}
      </Form>
    </Modal>
  );
};

export default PreviewModal;
