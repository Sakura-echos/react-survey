// 單選，多選，下拉
import React from 'react';
import { Card, Button, Checkbox, Input, Space, message } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { getQTypeName } from './util';

const QuestionType1 = ({
  item,
  index,
  qnItem,
  setQnItem,
  removeItem,
  saveItem,
}) => {
  const updateQuestion = (tempIndex, attr, updateValue) => {
    setQnItem((prevQnItem: any) => {
      const updateItem = { ...prevQnItem };
      updateItem.questions.forEach((questionItem: any, i: number) => {
        if (tempIndex === i) {
          questionItem[attr] = updateValue;
        }
      });

      return updateItem;
    });
  };

  const updateOption = (tempIndex, tempOptionIndex, attr, updateValue) => {
    setQnItem((prevQnItem: any) => {
      const newQuestions = [...prevQnItem.questions];
      const newOptions = [...newQuestions[tempIndex].options];
      newOptions.forEach((tempOptionItem: any, i: number) => {
        if (tempOptionIndex === i) {
          tempOptionItem[attr] = updateValue;
        }
      });
      newQuestions[tempIndex] = {
        ...newQuestions[tempIndex],
        options: newOptions,
      };

      return {
        ...prevQnItem,
        questions: newQuestions,
      };
    });
  };

  return (
    <Card
      style={{ margin: 20 }}
      key={item.id}
      onClick={(e) => {
        setTimeout(() => {
          setQnItem((prevQnItem: any) => {
            const updateItem = { ...prevQnItem };
            updateItem.questions.forEach((questionItem: any, i: number) => {
              if (index === i) {
                questionItem.isSave = false;
              }
            });

            return updateItem;
          });
        }, 100);
      }}
      hoverable
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span>
              {index + 1}（{getQTypeName(item.type)}）
            </span>
            <Space direction="vertical">
              <Space direction="horizontal">
                題目繁：
                {item.isSave ? (
                  <label>{item.nameZhTw}</label>
                ) : (
                  <Input
                    value={item.nameZhTw}
                    onChange={(e) => {
                      updateQuestion(index, 'nameZhTw', e.target.value);
                    }}
                  />
                )}
              </Space>
              <Space direction="horizontal">
                題目簡：
                {item.isSave ? (
                  <label>{item.nameZhCn}</label>
                ) : (
                  <Input
                    value={item.nameZhCn}
                    onChange={(e) => {
                      updateQuestion(index, 'nameZhCn', e.target.value);
                    }}
                  />
                )}
              </Space>
              <Space direction="horizontal">
                題目英：
                {item.isSave ? (
                  <label>{item.nameEn}</label>
                ) : (
                  <Input
                    value={item.nameEn}
                    onChange={(e) => {
                      updateQuestion(index, 'nameEn', e.target.value);
                    }}
                  />
                )}
              </Space>
              <Space direction="horizontal">
                題目葡：
                {item.isSave ? (
                  <label>{item.namePt}</label>
                ) : (
                  <Input
                    value={item.namePt}
                    onChange={(e) => {
                      updateQuestion(index, 'namePt', e.target.value);
                    }}
                  />
                )}
              </Space>
            </Space>
          </div>
          <div>
            <CloseOutlined
              onClick={() => {
                removeItem(index);
              }}
            />
          </div>
        </div>
      }
    >
      <Space direction="vertical" style={{ marginLeft: 30 }}>
        {item.options.map((optionItem: any, optionIndex: number) => {
          return (
            <Space
              key={optionItem.id}
              style={{ margin: 10 }}
              direction="horizontal"
            >
              <span>選項{optionIndex + 1}：</span>
              <Space direction="vertical">
                <Space direction="horizontal">
                  繁：
                  {item.isSave ? (
                    <label>{optionItem.nameZhTw}</label>
                  ) : (
                    <Input
                      value={optionItem.nameZhTw}
                      onChange={(e) => {
                        updateOption(
                          index,
                          optionIndex,
                          'nameZhTw',
                          e.target.value,
                        );
                      }}
                    />
                  )}
                </Space>
                <Space direction="horizontal">
                  簡：
                  {item.isSave ? (
                    <label>{optionItem.nameZhCn}</label>
                  ) : (
                    <Input
                      value={optionItem.nameZhCn}
                      onChange={(e) => {
                        updateOption(
                          index,
                          optionIndex,
                          'nameZhCn',
                          e.target.value,
                        );
                      }}
                    />
                  )}
                </Space>
                <Space direction="horizontal">
                  英：
                  {item.isSave ? (
                    <label>{optionItem.nameEn}</label>
                  ) : (
                    <Input
                      value={optionItem.nameEn}
                      onChange={(e) => {
                        updateOption(
                          index,
                          optionIndex,
                          'nameEn',
                          e.target.value,
                        );
                      }}
                    />
                  )}
                </Space>
                <Space direction="horizontal">
                  葡：
                  {item.isSave ? (
                    <label>{optionItem.namePt}</label>
                  ) : (
                    <Input
                      value={optionItem.namePt}
                      onChange={(e) => {
                        updateOption(
                          index,
                          optionIndex,
                          'namePt',
                          e.target.value,
                        );
                      }}
                    />
                  )}
                </Space>
              </Space>
              {!item.isSave && (
                <Space direction="horizontal">
                  <Button
                    size="small"
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setQnItem((prevQnItem: any) => {
                        const newQuestions = [...prevQnItem.questions];
                        const newOptions = [...newQuestions[index].options];
                        newOptions.push({
                          id: uuidv4(),
                          nameZhTw: '',
                          nameZhCn: '',
                          nameEn: '',
                          namePt: '',
                        });
                        newQuestions[index] = {
                          ...newQuestions[index],
                          options: newOptions,
                        };

                        return {
                          ...prevQnItem,
                          questions: newQuestions,
                        };
                      });
                    }}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={() => {
                      // 刪除選項時，請至少保留一個選項
                      if (qnItem.questions[index].options.length === 1) {
                        message.error('請至少保留一個選項');
                        return;
                      }

                      setQnItem((prevQnItem: any) => {
                        const newQuestions = [...prevQnItem.questions];
                        const newOptions = newQuestions[index].options.filter(
                          (_: any, opIndex: any) => opIndex !== optionIndex,
                        );
                        newQuestions[index] = {
                          ...newQuestions[index],
                          options: newOptions,
                        };

                        return {
                          ...prevQnItem,
                          questions: newQuestions,
                        };
                      });
                    }}
                  />
                </Space>
              )}
            </Space>
          );
        })}
      </Space>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 20,
        }}
      >
        <div>
          <Checkbox
            disabled={item.isSave}
            onChange={(e) => {
              updateQuestion(index, 'require', e.target.checked);
            }}
          >
            是否必填
          </Checkbox>
        </div>

        {!item.isSave && (
          <Space direction="horizontal" size={'middle'}>
            {/* <Button
              type="primary"
              danger
              onClick={() => {
                removeItem(index);
              }}
            >
              取消
            </Button> */}
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                saveItem(index);
              }}
            >
              完成編輯
            </Button>
          </Space>
        )}
      </div>
    </Card>
  );
};

export default QuestionType1;
