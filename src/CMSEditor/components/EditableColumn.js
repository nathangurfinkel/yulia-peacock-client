import React, { useEffect } from 'react';
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
  Popconfirm,
  Spin,
  Skeleton,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { UndoOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import layoutMockData from '../../layoutMockData';
const { Panel } = Collapse;
const { Text, Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

function getColumnById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const column = layoutMockData.columns.find((column) => column.id === id);
      if (column) {
        console.log(' found column: ', column);

        resolve(column);
      } else {
        console.log('column not found');
        reject(`Column with id ${id} not found`);
      }
    }, 1000);
  });
}

function editColumn(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const column = layoutMockData.columns.find((column) => column.id === id);
      if (column) {
        resolve(column);
      } else {
        reject(`Column with id ${id} not found`);
      }
    }, 1000);
  });
}

const EditableColumn = ({ id, row }) => {
  const [columnTitle, setColumnTitle] = React.useState(null);
  const [columnStyle, setColumnStyle] = React.useState(null);
  const [columnContent, setColumnContent] = React.useState(null);
  const [columnId, setColumnId] = React.useState(null);

  const [addingContent, setAddingContent] = React.useState(null);
  const [addingContentBody, setAddingContentBody] = React.useState(null);
  const [editingContent, setEditingContent] = React.useState(false);
  const {
    data: removeContentData,
    loading: removeContentLoading,
    error: removeContentError,
  } = useRequest(
    (contentId) => {
      //todo delete content api call
    },
    {
      manual: true,
      onSuccess: (result, params) => {
        //todo remove content from state
      },
    }
  );

  const {
    data: column,
    error: columnError,
    loading: columnLoading,
    mutate: mutateColumn,
  } = useRequest(getColumnById, {
    onSuccess: (result, params) => {
      console.log(result);
    },
    onError: (error, params) => {
      message.error(error + ' ' + params[0]);
    },
    defaultParams: [id],
  });

  const {
    run: editColumnRun,
    data: editColumnData,
    loading: editColumnLoading,
    error: editColumnError,
  } = useRequest(editColumn, {
    manual: true,
    onSuccess: (result, params) => {
      mutateColumn(result);
    },
    onError: (error, params) => {
      message.error(error);
    },
  });

  const cardColoring = {
    bodyStyle: { backgroundColor: '#f0f2f5' },
    headStyle: { backgroundColor: '#e3e3e3' },
  };
  const contentCardProps = (editingContent, itemId, itemType) => {
    return {
      extra: editingContent && (
        <Popconfirm
          title={'Are you sure to delete this ' + itemType + '?'}
          onConfirm={() => {
            //todo delete content
          }}
          okText='Yes'
          cancelText='No'
          okButtonProps={{ loading: removeContentLoading, danger: true }}
        >
          <DeleteOutlined
            //todo onclick delete content  api call
            onClick={() => {
              //todo delete content
            }}
            disabled={removeContentLoading}
            style={{ color: 'red' }}
          />
        </Popconfirm>
      ),
      size: 'small',
    };
  };
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

  function handleAddContent() {
    if (addingContent === 'text') {
      const newContent = {
        type: 'text',
        id: 'text' + Math.random(),
        text: 'lorem ipsum',
      };
      const newColumn = {
        ...column,
        content: [...column.content, newContent],
      };

      editColumnRun(newColumn);
    }
  }
  if (!column || columnLoading) {
    return (
      <>
        <Col {...colProps(row)}>
          {/* skeleton of card */}
          <Skeleton active />
        </Col>
      </>
    );
  }
  return (
    <Col {...colProps(row)}>
      <div>
        <Collapse>
          <Panel
            header={column.id}
            key={column.id}
            extra={
              <>
                {editingContent ? (
                  <Button
                    onClick={(event) => {
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                      //   clicked console log
                      console.log('clicked editing', columnId);

                      setEditingContent(false);
                      console.log('editing content', editingContent);
                    }}
                  >
                    <Text>Stop Editing</Text>
                    <UndoOutlined />
                  </Button>
                ) : (
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();

                      setEditingContent(true);
                      console.log('editing content', editingContent);
                    }}
                  >
                    <Text>Edit</Text>
                    <EditOutlined />
                  </Button>
                )}
              </>
            }
          >
            <Space
              direction='vertical'
              style={{ textAlign: 'center', width: '100%' }}
              size='middle'
            >
              <Popconfirm
                title='Are you sure to delete this column?'
                onConfirm={() => {
                  console.log('clicked');
                  // todo delete column api call
                }}
                okText='Yes'
                cancelText='No'
                okButtonProps={{ danger: true }}
              >
                {editingContent && (
                  <Button
                    block
                    type='primary'
                    danger
                    onClick={(event) => {
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                      //   clicked console log
                      console.log('clicked', columnId);
                    }}
                  >
                    <div style={{ color: 'white' }}>
                      Delete Column{' '}
                      <DeleteOutlined style={{ color: 'white' }} />
                    </div>
                  </Button>
                )}
              </Popconfirm>
              <Search
                placeholder='Column ID'
                enterButton='Save ID'
                defaultValue={column.id}
                onSearch={(value) => {
                  console.log('column id', value);
                  // todo save column id api call
                }}
                disabled={!editingContent}
                // disabled = {columnIdLoading}
              />
              <Divider> content </Divider>
              {column.content &&
                column.content.map((item) => {
                  return (
                    <>
                      <Card
                        title={item.id}
                        {...cardColoring}
                        {...contentCardProps(
                          editingContent,
                          item.id,
                          item.type
                        )}
                      >
                        {item.type === 'text' && (
                          <>
                            <div style={{ textAlign: 'left' }}>
                              <Input.TextArea
                                type='text'
                                defaultValue={item.text}
                                disabled={!editingContent}
                              />
                            </div>
                          </>
                        )}
                        {item.type === 'button' && (
                          <div style={{ textAlign: 'left' }}>
                            <Text>Action: </Text>
                            <Select
                              defaultValue={
                                item.setOnClick && item.setOnClick.action
                              }
                              style={{ width: '100%' }}
                              disabled={!editingContent}
                            >
                              <Option value='scrollTo'>Scroll To</Option>
                              <Option value='goTo'>Go To Address</Option>
                            </Select>
                            <Text>Target: </Text>
                            <Input
                              defaultValue={
                                item.setOnClick && item.setOnClick.target
                              }
                              style={{ width: '100%' }}
                              disabled={!editingContent}
                            ></Input>
                          </div>
                        )}
                        {item.type === 'image' && (
                          <div style={{ textAlign: 'left' }}>
                            <img src={item.src} alt='image' />

                            <Upload>
                              <Button
                                icon={<UploadOutlined />}
                                disabled={!editingContent}
                              >
                                Click to Upload
                              </Button>
                            </Upload>
                          </div>
                        )}
                      </Card>
                    </>
                  );
                })}

              {editingContent && (
                <Dropdown trigger={['click']} menu={{ items: dropdownItems }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space direction='vertical'>
                      <PlusCircleOutlined style={{ fontSize: '40px' }} />
                      Add Content
                    </Space>
                  </a>
                </Dropdown>
              )}
              {addingContent && (
                <Card
                  title={'New ' + addingContent}
                  extra={
                    <DeleteOutlined
                      onClick={() => {
                        setAddingContent(null);
                      }}
                    />
                  }
                  {...cardColoring}
                >
                  {addingContent === 'text' && (
                    <div style={{ textAlign: 'left' }}>
                      <Input.TextArea
                        type='text'
                        onChange={(e) => {
                          setAddingContentBody(e.target.value);
                          //   console.log('adding content body', addingContentBody);
                        }}
                        //   style={{}}
                      />
                    </div>
                  )}
                  <Button
                    block
                    type='primary'
                    onClick={() => {
                      handleAddContent(addingContent);
                      console.log('adding content body', addingContentBody);
                    }}
                    disabled={!addingContentBody}
                  >
                    Add Text Component
                  </Button>
                </Card>
              )}
              <Button
                block
                type='primary'
                onClick={() => {
                  console.log('clicked');
                  // todo save column api call
                }}
                // disabled = {columnLoading}
              >
                Save Column
              </Button>
            </Space>
          </Panel>
        </Collapse>
      </div>
    </Col>
  );
};

export default EditableColumn;
