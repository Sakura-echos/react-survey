'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { Button, Form, Input, Layout, message } from 'antd';
import { Col, Row } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Survey from './survey';
import { QnItem } from './type';
const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  const [qnItem, setQnItem] = useState<QnItem>({
    titleZhTw: '',
    titleZhCn: '',
    titleEn: '',
    titlePt: '',
    questions: [],
  });

  const submitSurvey = (item: QnItem) => {
    if (item.questions.some((qItem) => qItem.isSave === false)) {
      message.error('請保存所有的問題再提交');
      return;
    }

    message.success('保存成功');
    console.log(item);
  };

  return (
    <main>
      <Survey
        qnItem={qnItem}
        setQnItem={setQnItem}
        submitSurvey={submitSurvey}
      />
    </main>
  );
}
