import React from 'react';
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Col,
  Collapse,
  Form,
  Divider,
  Upload,
  Space,
  message,
  Typography,
  Card,
  Select,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const { Search } = Input;
const EditableColumn = ({ column, row, buttons, images, texts, forms }) => {
  const [columnTitle, setColumnTitle] = React.useState(column.title);
  const [columnStyle, setColumnStyle] = React.useState(column.style);
  const [columnContent, setColumnContent] = React.useState(column.content);
  const [columnId, setColumnId] = React.useState(column.id);
  const [addingContent, setAddingContent] = React.useState(null);

  const uploadProps = {
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

  return (
    <Col {...colProps(row)}>
      <div>
        <Collapse>
          <Panel
            header={columnId}
            key={columnId}
            extra={
              <DeleteOutlined
                style={{ color: '#ff4d4f', fontSize: '1rem' }}
                onClick={(event) => {
                  // If you don't want click extra trigger collapse, you can prevent this:
                  event.stopPropagation();
                  //   clicked console log
                  console.log('clicked', columnId);
                }}
              />
            }
          >
            <Space
              direction='vertical'
              style={{ textAlign: 'center', width: '100%' }}
              size='middle'
            >
              <Search
                placeholder='Column ID'
                enterButton='Save ID'
                defaultValue={columnId}
                onSearch={(value) => {
                  console.log('column id', value);
                  // todo save column id api call
                }}
                // disabled = {columnIdLoading}
              />
              <Divider> content </Divider>
              {columnContent &&
                columnContent.map((item) => {
                  switch (item.type) {
                    case 'text':
                      return (
                        <Card
                          title='Text'
                          extra={
                            <DeleteOutlined
                            //todo onclick delete content  api call
                            // disabled = {removeContentLoading}
                            />
                          }
                        >
                          <div style={{ textAlign: 'left' }}>
                            <Input.TextArea
                              type='text'
                              value={
                                texts.find((text) => text.id === item.id).text
                              }
                              //   style={{}}
                            />
                          </div>
                          <Button
                            block
                            type='primary'
                            onClick={() => {
                              console.log('clicked');
                              // todo save text api call
                            }}
                            // disabled = {textLoading}
                          >
                            Save Text
                          </Button>
                        </Card>
                      );
                    case 'button':
                      return (
                        <Card
                          title='Button'
                          extra={
                            <DeleteOutlined
                            //todo onclick delete content  api call
                            // disabled = {removeContentLoading}
                            />
                          }
                        >
                          <Typography.Text>Action</Typography.Text>
                          <Select
                            defaultValue='scroll'
                            style={{ width: '100%' }}
                            options={[
                              {
                                value: 'scroll',
                                label: 'Scroll to Section',
                              },
                            ]}
                          />
                        </Card>
                      );

                    case 'image':
                      console.log('image', item.src);
                      return (
                        <>
                          <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>{' '}
                          <img
                            src={
                              images.find((image) => image.id === item.id).src
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

export default EditableColumn;
