'use client';

import Image from 'next/image';
import styles from './page.module.css';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  Select,
  Space,
  message,
} from 'antd';
import { Col, Row } from 'antd';
import {
  AimOutlined,
  BarsOutlined,
  CheckSquareOutlined,
  FileImageOutlined,
  FontSizeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';
import QuestionType1 from './QuestionType1';
import { addQuestionData, getQuestionData } from './util';
import { QType, QnItem } from './type';
import PreviewModal from './PreviewModal';
const { Header, Footer, Sider, Content } = Layout;

export interface SurveyProps {
  qnItem: QnItem;
  setQnItem: any;
  submitSurvey: any;
}

const checkAllFieldsFilled = (questions) => {
  for (const question of questions) {
    if (
      !question.nameZhTw ||
      !question.nameZhCn ||
      !question.nameEn ||
      !question.namePt
    ) {
      return false;
    }
    for (const option of question.options) {
      if (
        !option.nameZhTw ||
        !option.nameZhCn ||
        !option.nameEn ||
        !option.namePt
      ) {
        return false;
      }
    }
  }
  return true;
};

const Survey: React.FC<SurveyProps> = (props) => {
  const [form] = Form.useForm();
  const { qnItem, setQnItem, submitSurvey } = props;
  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const inputTitleStyle = {
    transition: 'all 0.3s ease',
    border: isTitleFocus ? '1px solid #40a9ff' : 'none',
    backgroundColor: isTitleFocus ? 'white' : 'transparent',
    outline: 'none', // 移除默认的 outline
  };

  // 新增題目項
  const addItem = (type: string, qnItem: QnItem) => {
    const questionsData = getQuestionData(type, qnItem.questions);

    setQnItem({
      ...qnItem,
      questions: questionsData,
    });
  };

  // 移除某項
  const removeItem = (selectIndex: any) => {
    setQnItem((prevState: any) => {
      const newQuestions = prevState.questions.filter(
        (_: any, index: number) => index !== selectIndex,
      );
      return { ...prevState, questions: newQuestions };
    });
  };

  // 更新某个问题的 isSave 属性
  const saveItem = (selectIndex: number) => {
    // 檢查所有問題和選項是否已填寫
    const isAllFieldsFilled = checkAllFieldsFilled(qnItem.questions);
    if (!isAllFieldsFilled) {
      message.error('請完善題目');
      return;
    }

    setQnItem((prevState: any) => ({
      ...prevState,
      questions: prevState.questions.map((item: any, i: number) =>
        i === selectIndex ? { ...item, isSave: true } : item,
      ),
    }));
  };

  const onPreview = () => {
    console.log(qnItem);

    setOpenModal(true);
  };
  return (
    <div>
      <Row>
        {/* 左側功能欄 */}
        <Col
          span={6}
          style={{ borderRight: 20, borderColor: 'gray', borderWidth: 20 }}
        >
          <Row>
            <Col span={24} className="questionBtn">
              <Button
                shape="round"
                icon={<AimOutlined />}
                onClick={() => {
                  addItem(QType.Single, qnItem);
                }}
              >
                單選題
              </Button>
              <Button
                shape="round"
                icon={<CheckSquareOutlined />}
                onClick={() => {
                  addItem(QType.Multiple, qnItem);
                }}
              >
                多選題
              </Button>
            </Col>
            <Col span={24} className="questionBtn">
              <Button
                shape="round"
                icon={<FontSizeOutlined />}
                onClick={() => {
                  addItem(QType.Text, qnItem);
                }}
              >
                填空題
              </Button>
              <Button
                shape="round"
                icon={<BarsOutlined />}
                onClick={() => {
                  addItem(QType.Dropdown, qnItem);
                }}
              >
                下拉框
              </Button>
            </Col>
            <Col span={24} className="questionBtn">
              <Button
                shape="round"
                icon={<MessageOutlined />}
                onClick={() => {
                  addItem(QType.TextArea, qnItem);
                }}
              >
                簡答題
              </Button>
              <Button
                shape="round"
                icon={<FileImageOutlined />}
                onClick={() => {
                  addItem(QType.File, qnItem);
                }}
              >
                附件題
              </Button>
            </Col>
          </Row>
        </Col>

        {/* 右側問卷欄 */}
        <Col span={18}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={() => {
              form.validateFields().then((res) => {
                if (qnItem.questions.length === 0) {
                  message.error('請至少添加一個問題');
                } else {
                  submitSurvey(qnItem);
                }
              });
            }}
            onFinishFailed={() => {
              message.error('請完善表單');
            }}
            autoComplete="off"
            style={{ margin: 20 }}
          >
            <Form.Item
              label="問卷標題"
              rules={[
                {
                  required: true,
                  message: '請輸入問卷標題',
                },
              ]}
            >
              <Space direction="vertical">
                <Space direction="horizontal">
                  繁：
                  <Input
                    onChange={(e) => {
                      setQnItem({
                        ...qnItem,
                        titleZhTw: e.target.value,
                      });
                    }}
                  />
                </Space>
                <Space direction="horizontal">
                  簡：
                  <Input
                    onChange={(e) => {
                      setQnItem({
                        ...qnItem,
                        titleZhCn: e.target.value,
                      });
                    }}
                  />
                </Space>
                <Space direction="horizontal">
                  英：
                  <Input
                    onChange={(e) => {
                      setQnItem({
                        ...qnItem,
                        titleEn: e.target.value,
                      });
                    }}
                  />
                </Space>
                <Space direction="horizontal">
                  葡：
                  <Input
                    onChange={(e) => {
                      setQnItem({
                        ...qnItem,
                        titlePt: e.target.value,
                      });
                    }}
                  />
                </Space>
              </Space>
            </Form.Item>

            {qnItem.questions.map((item: any, index: number) => {
              return (
                <QuestionType1
                  key={item.id}
                  item={item}
                  index={index}
                  qnItem={qnItem}
                  setQnItem={setQnItem}
                  saveItem={saveItem}
                  removeItem={removeItem}
                />
              );
            })}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 30,
              }}
            >
              <Button
                onClick={() => {
                  onPreview();
                }}
              >
                預覽
              </Button>
              <Button type="primary" danger>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      <PreviewModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        item={qnItem}
      />
    </div>
  );
};

export default Survey;
