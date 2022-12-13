// this is a CMS component that takes data from the server and renders it
//

import {
  Divider,
  Input,
  Layout,
  Space,
  Row,
  Column,
  Typography,
  Form,
  Card,
  Col,
} from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import ColumnFactory from './ColumnFactory';
import RowFactory from './RowFactory';
import ButtonFactory from './ButtonFactory';
import { FormFactory } from './FormFactory';
import DeleteColumnOutlined from '@ant-design/icons/DeleteColumnOutlined';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import EditableRow from './EditableRow';

const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

function Editor() {
  //calculate width of columns based on the amount of columns in a row

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const layoutMockData = {
    rows: [
      {
        id: 'row1',
        style: {
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
        },
        title: 'row1title',
        columnIds: ['col1', 'col2', 'col3'],
      },
      {
        id: 'row2',
        style: {
          // backgroundColor: 'green',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
        },

        columnIds: ['col1', 'col2'],
        title: 'Register for a free session',
        //etc
      },
    ],
    columns: [
      {
        id: 'col1',
        style: {
          // backgroundColor: 'blue',
          justifyContent: 'center',
          minHeight: '80vh',
        },

        content: [
          {
            type: 'image',
            id: 'img1',
          },
          {
            type: 'button',
            id: 'btn2',
          },
          {
            type: 'form',
            id: 'form1',
          },
        ],

        title: 'col1title',
      },
      {
        id: 'col2',
        style: {
          // padding: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '16px',

          //   backgroundColor: 'red',
        },
        content: [
          {
            type: 'text',
            id: 'text2',
          },
          {
            type: 'button',
            id: 'btn1',
          },
        ],
      },
      {
        id: 'col3',
        style: {
          //   backgroundColor: 'black',
          // padding: '1rem',
          justifyContent: 'center',
          minHeight: '100vh',
        },
        content: [
          {
            type: 'text',
            id: 'text1',
          },
          {
            type: 'button',
            id: 'btn1',
          },
          {
            type: 'image',
            id: 'img1',
          },
        ],
      },
    ],
    texts: [
      {
        id: 'text1',
        text: 'text 1111',
      },
      {
        id: 'text2',
        text: 'text 2222',
      },
    ],
    buttons: [
      {
        id: 'btn1',
        text: 'button 1',
        onClick: () => {
          console.log('clicked 1');
        },
      },
      {
        id: 'btn2',
        text: 'button 2',
        onClick: () => {
          console.log('clicked 2');
        },
      },
    ],
    images: [
      {
        id: 'img1',
        src: 'https://picsum.photos/200/300',
      },
    ],
    forms: [
      {
        id: 'form1',
        fields: [
          {
            id: 'field1',
            type: 'text',
            label: 'name',
            placeholder: 'enter your name',
          },
          {
            id: 'field2',
            type: 'text',
            label: 'email',
            placeholder: 'enter your email',
          },
          {
            id: 'field3',
            label: 'Username',
            placeholder: 'username',
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          },
        ],
        submit: {
          text: 'submit',
          onClick: () => {
            console.log('form submitted');
          },
        },
      },
    ],
  };
  const [layout, setLayout] = React.useState(layoutMockData);
  // render the rows as json data editor
  const calculateColWidth = (row) => {
    const colCount = row.columnIds.length;

    const colWidth = 24 / colCount;
    return colWidth;
  };
  const colProps = (row) => {
    const colWidth = calculateColWidth(row);
    return {
      xs: 24,
      sm: 24,
      md: colWidth,
      lg: colWidth,
      xl: colWidth,
      xxl: colWidth,
    };
  };

  const EditableColumn = ({ column, row }) => {
    const [columnTitle, setColumnTitle] = React.useState(column.title);
    const [columnStyle, setColumnStyle] = React.useState(column.style);
    const [columnContent, setColumnContent] = React.useState(column.content);
    const [columnId, setColumnId] = React.useState(column.id);
    const [addingContent, setAddingContent] = React.useState(null);

    const dropdownItems = [
      {
        key: 'text',
        text: 'Text',
        value: 'text',
        label: (
          <div
            onClick={() => {
              setAddingContent('text');
            }}
          >
            Text
          </div>
        ),
      },
      {
        key: 'button',
        text: 'Button',
        value: 'button',
        label: 'Button',
      },
      {
        key: 'image',
        text: 'Image',
        value: 'image',
        label: 'Image',
      },
    ];
    const handleColumnTitleChange = (e) => {
      setColumnTitle(e.target.value);
    };
    const handleColumnStyleChange = (e) => {
      setColumnStyle(e.target.value);
    };
    const handleColumnContentChange = (e) => {
      setColumnContent(e.target.value);
    };
    const handleColumnIdChange = (e) => {
      setColumnId(e.target.value);
    };
    return (
      <Col {...colProps(row)}>
        <div>
          <Collapse>
            <Panel header={columnId} key={columnId}>
              <Space
                direction='vertical'
                style={{ textAlign: 'center', width: '100%' }}
              >
                <Form
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  initialValues={{ size: 'default' }}
                  // size={'large'}
                >
                  <Divider> content </Divider>
                  {columnContent &&
                    columnContent.map((item) => {
                      switch (item.type) {
                        case 'text':
                          return (
                            <Form.Item label='Text'>
                              <Input
                                type='text'
                                // find the text object from the texts array that matches column content id
                                value={
                                  layout.texts.find(
                                    (text) => text.id === item.id
                                  ).text
                                }
                              />
                            </Form.Item>
                          );
                        case 'button':
                          return (
                            <>
                              <Form.Item label='Button'>
                                <Input
                                  type='text'
                                  value={
                                    layout.buttons.find(
                                      (button) => button.id === item.id
                                    ).text
                                  }
                                />
                              </Form.Item>
                              <Form.Item label=' '>
                                <Input
                                  type='text'
                                  value={
                                    layout.buttons.find(
                                      (button) => button.id === item.id
                                    ).onClick
                                  }
                                />
                              </Form.Item>
                            </>
                          );

                        case 'image':
                          console.log('image', item.src);
                          return (
                            <>
                              <Upload {...props}>
                                <Button icon={<UploadOutlined />}>
                                  Click to Upload
                                </Button>
                              </Upload>{' '}
                              <img
                                src={
                                  layout.images.find(
                                    (image) => image.id === item.id
                                  ).src
                                }
                                style={{ width: '200px' }}
                                alt=''
                              />
                            </>
                          );

                        default:
                          return null;
                      }
                    })}

                  <Form.Item label='Id'>
                    <Input
                      type='text'
                      value={columnId}
                      onChange={handleColumnIdChange}
                    />
                  </Form.Item>
                </Form>
                {/* dropdown for adding content */}
                <Dropdown trigger={['click']} menu={{ items: dropdownItems }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space direction='vertical'>
                      <PlusCircleOutlined style={{ fontSize: '40px' }} />
                      Add Content
                    </Space>
                  </a>
                </Dropdown>
                {addingContent === 'text' && (
                  <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ size: 'default' }}
                    // size={'large'}
                  >
                    <Form.Item label='New Text'>
                      <Input type='text' />
                    </Form.Item>
                  </Form>
                )}
              </Space>
            </Panel>
          </Collapse>
        </div>
      </Col>
    );
  };

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Title>Editor</Title>

      <Text>This is the editor. Row represents a "screen" in the app.</Text>
      <Row gutter={[16, 16]}>
        {layout.rows.map((row) => (
          <Col span={24}>
            <Collapse>
              <Panel
                header={
                  <Text>
                    {row.id} - {row.title}
                  </Text>
                }
                key={row.id}
                style={{ width: '100%' }}
              >
                <EditableRow row={row}>
                  {row.columnIds.map((columnId) => {
                    const column = layout.columns.find(
                      (column) => column.id === columnId
                    );
                    return <EditableColumn column={column} row={row} />;
                  })}
                </EditableRow>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Editor;
