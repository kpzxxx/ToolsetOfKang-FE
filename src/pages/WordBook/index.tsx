import { EditTwoTone, PlusCircleTwoTone, SaveTwoTone } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  FloatButton,
  Input,
  notification,
  Progress,
  Radio,
  Row,
  Tag,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const { Search } = Input;
const api = notification;
const WordBook: React.FC = () => {
  const [nowTab, setNowTab] = useState('date');
  const [tagData, setTagData] = useState([]);
  const [total, setTotal] = useState(0);
  const [editing, setEditing] = useState(false);
  const [deleteWords, setDeleteWords] = useState('');
  // const [visible, setVisible] = useState(false);
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
  const onTabChange = (e: any) => {
    setNowTab(e.target.value);
    // getData(e.target.value);
  };

  // const getData = (type: string) => {
  //     if (!type) {
  //         type = 'date';
  //     }
  //     fetch("http://localhost:8080/word/get?type=" + type).then(response => response.json())
  //         .then(data => {
  //             let _tagData = type === 'date' ? data.data.date : data.data.alpha;
  //
  //             _tagData = _tagData.slice(0, 30);
  //
  //             setTagData(_tagData);
  //             setTotal(data.data.total);
  //         });
  // };

  useEffect(() => {
    fetch('http://localhost:8080/word/get?type=date')
      .then((response) => response.json())
      .then((data) => {
        let _tagData = data.data.date;

        _tagData = _tagData.slice(0, 30);

        setTagData(_tagData);
        setTotal(data.data.total);
      });
  }, []);

  const handleDelete = () => {
    if (deleteWords !== '') {
      const deleteUrl = 'http://localhost:8080/word/delete?word=';
      fetch(deleteUrl + deleteWords, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // getData(nowTab);
          // sucessNotification();
        });
    }

    setEditing(false);
    setDeleteWords('');
  };

  const handleClose = (word: string) => {
    setDeleteWords(deleteWords === '' ? word : deleteWords.concat(',').concat(word));
  };

  const searchWord = (value: string) => {
    fetch('http://localhost:8080/word/find?word=' + value)
      .then((response) => response.json())
      .then((data) => {
        // let isSuccess = data.data ? 'success' : 'warn';
        api.open({
          message: value,
          description: data.data
            ? data.data.meaning + ' (' + data.data.date + ')'
            : 'Oops, no result!😭',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      });
  };

  // const showInput = (key : string) => {
  //     this.setState({ inputVisibleKey: key }, () => this.input[key].focus());
  // };

  return (
    <div>
      <FloatButton.BackTop />

      <Row>
        <Col span={4}>
          <Radio.Group defaultValue={'date'} buttonStyle={'solid'} onChange={onTabChange}>
            <Radio.Button value={'date'}>Date</Radio.Button>
            <Radio.Button value={'alpha'}>Alphabets</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={10}>
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
          <Search placeholder="search" onSearch={(value) => searchWord(value)} />
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          {/*<Button*/}
          {/*    type={'primary'}*/}
          {/*    onClick={() => setVisible(true)}>*/}
          {/*    <PlusCircleTwoTone/>Add*/}
          {/*</Button>*/}

          {!editing && (
            <Button onClick={() => setEditing(true)}>
              <EditTwoTone />
              Edit
            </Button>
          )}
          {editing && (
            <Button onClick={() => handleDelete()}>
              <SaveTwoTone />
              Save
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
                  {nowTab === 'date' ? data.date : data.alpha} ({data.words.length})
                </Divider>
                <Row>
                  {data.words.map((value: WordBook.Word) => {
                    // if (expand[index] || wordIndex <= expandNum || nowTab === 'date') {
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
                    // }
                    // return <div/>;
                  })}
                  {/*{!editing && nowTab === "date" && inputVisibleKey === data.date && (*/}
                  {/*    <Input*/}
                  {/*        ref={input => saveInputRef(input, data.date)}*/}
                  {/*        type={"text"}*/}
                  {/*        size={"default"}*/}
                  {/*        value={inputValue}*/}
                  {/*        style={{width: "150px"}}*/}
                  {/*        onChange={(e) => this.setState({inputValue: e.target.value})}*/}
                  {/*        onBlur={() => this.handleInputConfirm(data.date)}*/}
                  {/*        onPressEnter={() => this.handleInputConfirm(data.date)}*/}
                  {/*    />*/}
                  {/*)}*/}

                  {/*{!editing && nowTab === "date" && inputVisibleKey !== data.date && (*/}
                  <Tag color={color} className={'larger-font'}>
                    <PlusCircleTwoTone />
                  </Tag>
                  {/*)}*/}
                  {/*{!editing && nowTab === "alpha" && !expand[index] && data.words.length > expandNum && (*/}
                  {/*    <Tag onClick={() => {*/}
                  {/*        this.expand(index, true)*/}
                  {/*    }} color={color}*/}
                  {/*         className={"larger-font"}>*/}
                  {/*        <Icon type={"down"}/>*/}
                  {/*    </Tag>*/}
                  {/*)}*/}
                  {/*{!editing && nowTab === "alpha" && expand[index] && (*/}
                  {/*    <Tag onClick={() => {*/}
                  {/*        this.expand(index, false)*/}
                  {/*    }} color={color}*/}
                  {/*         className={"larger-font"}>*/}
                  {/*        <Icon type={"up"}/>*/}
                  {/*    </Tag>*/}
                  {/*)}*/}
                </Row>
              </div>
            </div>
          );
        })}

      {/*<AddFormModal*/}
      {/*    title={"Add"}*/}
      {/*    dataNames={dataNames}*/}
      {/*    wrappedComponentRef={this.saveFormRef}*/}
      {/*    visible={this.state.visible}*/}
      {/*    onCreate={this.handleAdd}*/}
      {/*    onCancel={() => this.setState({visible: false})}*/}
      {/*/>*/}
    </div>
  );
};

export default WordBook;
