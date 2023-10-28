import { deleteWord, getWords, saveWord, searchWord } from '@/services/ant-design-pro/api';
import { CloseCircleTwoTone, EditTwoTone, PlusCircleTwoTone, SaveTwoTone } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Divider,
  FloatButton,
  Form,
  Input,
  message,
  Progress,
  Row,
  Tag,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const { Search } = Input;
const App: React.FC = () => {
  const [tagData, setTagData] = useState([]);
  const [total, setTotal] = useState(0);
  const [editing, setEditing] = useState(false);
  const [deleteWords, setDeleteWords] = useState('');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];

  const warning = (msg: string) => message.warning(msg);
  const success = (msg: string) => message.success(msg);
  const getData = async () => {
    const result = await getWords();
    console.log(result);
    let _tagData = result?.data?.date;
    setTagData(_tagData);
    setTotal(result?.data?.total);
  };

  useEffect(() => {
    getData().then();
  }, []);

  const handleAdd = async (word: WordBook.AddWord) => {
    try {
      let result = await saveWord(JSON.stringify(word));
      console.log(result);
      if (result?.data?.word) {
        warning(result.data.meaning + ', ' + result.data.date);
      } else {
        success('Added successfully');
      }
      messageApi.loading('Adding...');
      return true;
    } catch (error) {
      messageApi.error('Adding failed, please try again!');
      return false;
    }
  };

  const handleDelete = () => {
    if (deleteWords !== '') {
      deleteWord(deleteWords).then(() => getData());
    }

    setEditing(false);
    setDeleteWords('');
  };

  const handleClose = (word: string) => {
    setDeleteWords(deleteWords === '' ? word : deleteWords.concat(',').concat(word));
  };

  const findWord = async (value: string) => {
    const data = await searchWord(value);
    message.warning(
      data.data ? data.data.meaning + ' (' + data.data.date + ')' : 'Oops, no result!😭',
    );
  };

  return (
    <>
      <FloatButton.BackTop />
      <Row>
        <Col span={12}>
          <Progress
            status="active"
            percent={total / 50}
            size={[500, 20]}
            strokeColor="#1890ff"
            style={{ paddingTop: '4px' }}
            format={(percent) => `${(percent ? percent * 50 : 0).toFixed(0)}/5000`}
          />
        </Col>
        <Col span={4} offset={2} style={{ textAlign: 'right' }}>
          <Search placeholder="search" onSearch={(value) => findWord(value)} />
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button type={'primary'} onClick={() => setVisible(true)}>
            <PlusCircleTwoTone />
            Add
          </Button>

          {!editing && (
            <Button onClick={() => setEditing(true)}>
              <EditTwoTone />
              Edit
            </Button>
          )}
          {editing && (
            <Button onClick={() => handleDelete()} danger type={'primary'}>
              <SaveTwoTone />
              Save
            </Button>
          )}
          {editing && (
            <Button onClick={() => setEditing(false)}>
              <CloseCircleTwoTone />
              Cancel
            </Button>
          )}
        </Col>
      </Row>
      {tagData &&
        tagData.map((data: WordBook.Words, index) => {
          let color = colors[index % colors.length];
          return (
            <div key={data.date}>
              <div>
                <Divider orientation="left" dashed>
                  {data.date} ({data.words.length})
                </Divider>
                <Row>
                  {data.words.map((value: WordBook.Word) => {
                    return (
                      <Tooltip
                        title={value.meaning ? value.meaning : value.word}
                        key={value.id}
                        mouseLeaveDelay={1}
                      >
                        <Tag
                          color={color}
                          className={'larger-font'}
                          closable={editing}
                          onClose={() => handleClose(value.word)}
                        >
                          {value.word}
                        </Tag>
                      </Tooltip>
                    );
                  })}
                </Row>
              </div>
            </div>
          );
        })}
      <ModalForm
        title="New word"
        width="400px"
        form={form}
        open={visible}
        onOpenChange={setVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as WordBook.AddWord);

          if (success) {
            setVisible(false);
            await getData();
            form.resetFields();
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Word is required',
            },
          ]}
          width="md"
          name="word"
        />
      </ModalForm>
    </>
  );
};

export default App;
