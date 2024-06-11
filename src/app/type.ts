export type QnItem = {
  titleZhTw: string;
  titleZhCn: string;
  titleEn: string;
  titlePt: string;
  questions: QuestionProps[];
};

export enum QType {
  // 單選題
  Single = 'SINGLE',
  // 多選題
  Multiple = 'MULTIPLE',
  // 下拉框
  Dropdown = 'DROPDOWN',
  // 填空題
  Text = 'TEXT',
  // 簡答題
  TextArea = 'TEXTAREA',
  // 附件題
  File = 'FILE',
}

export interface QuestionProps {
  id: string;
  nameZhTw: string;
  nameZhCn: string;
  nameEn: string;
  namePt: string;
  require: boolean;
  isSave: boolean;
  type: string;
  options?: {
    id: string;
    nameZhTw: string;
    nameZhCn: string;
    nameEn: string;
    namePt: string;
  }[];
}

const survey = {
  id: '',
  // 問卷名
  titleZhTw: '',
  titleZhCn: '',
  titleEn: '',
  titlePt: '',
  // 發佈狀態 0未發佈 1發佈中
  state: 0,
  // 開始發佈日期
  beginDate: '2024-06-01',
  // 結束發佈日期
  endDate: '2024-06-15',
  questions: [
    {
      id: '6c9098f6-30ad-405d-ba07-2c3a2ec0ce3d',
      // 題目名
      nameZhTw: '123',
      nameZhCn: '1234',
      nameEn: '12345',
      namePt: '123456',
      // 是否必填
      require: false,
      // 問題類型
      type: 'SINGLE',
      // 單選題（SINGLE），多選題（MULTIPLE），下拉框（DROPDOWN）傳數組
      // 填空題（TEXT），簡答題（TEXTAREA），附件題（FILE）直接傳[]，因為不需要用到此欄位
      options: [
        {
          id: '3c481e5d-5962-4ca6-8d2a-b2a32711b023',
          // 選項名
          nameZhTw: '1',
          nameZhCn: '2',
          nameEn: '3',
          namePt: '4',
        },
      ],
    },
  ],
};
