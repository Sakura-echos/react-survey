import { v4 as uuidv4 } from 'uuid';
import { QType, QuestionProps } from './type';

// 新增單選，多選，下拉數據
export const addQuestionData = (questionsData: any, type: string) => {
  // 初始化baseQuestion物件
  let baseQuestion: QuestionProps = {
    id: uuidv4(),
    nameZhTw: '',
    nameZhCn: '',
    nameEn: '',
    namePt: '',
    require: false,
    isSave: false,
    options: [],
    type: type,
  };

  // 根據type的值動態更新baseQuestion物件
  switch (type) {
    case QType.Text:
    case QType.TextArea:
    case QType.File:
    default:
      break;
    case QType.Single:
    case QType.Multiple:
    case QType.Dropdown:
      baseQuestion = {
        ...baseQuestion,
        options: [
          {
            id: uuidv4(),
            nameZhTw: '',
            nameZhCn: '',
            nameEn: '',
            namePt: '',
          },
        ],
      };
      break;
  }

  questionsData.push(baseQuestion);
};

// 新增題目項
export const getQuestionData = (type: string, questions: any) => {
  const questionsData: any = [...questions];
  // 若最後一個項未保存，則新增時覆蓋
  if (
    questionsData.length !== 0 &&
    questionsData[questionsData.length - 1].isSave === false
  ) {
    questionsData.pop();
  }

  addQuestionData(questionsData, type);

  return questionsData;
};

// 獲取題目類型名稱
export const getQTypeName = (type: QType) => {
  switch (type) {
    case QType.Single:
      return '單選題';
    case QType.Multiple:
      return '多選題';
    case QType.Text:
      return '填空題';
    case QType.Dropdown:
      return '下拉框';
    case QType.TextArea:
      return '簡答題';
    case QType.File:
      return '附件題';
    default:
      return 'Unknown';
  }
};
