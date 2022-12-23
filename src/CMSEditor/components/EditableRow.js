import React from 'react';
import { Card, Row, Space, Typography, Input, Button, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Text } = Typography;

const EditableRow = ({ row, children }) => {
  const [rowTitle, setRowTitle] = React.useState(row.title);
  const [rowColumnIds, setRowColumnIds] = React.useState(row.columnIds);
  const [rowId, setRowId] = React.useState(row.id);

  const handleRowTitleChange = (e) => {
    setRowTitle(e.target.value);
  };

  const handleRowColumnIdsChange = (e) => {
    setRowColumnIds(e.target.value);
  };
  const handleRowIdChange = (e) => {
    setRowId(e.target.value);
  };
  return (
    <>
      {' '}
      <Card
        title={
          <Space direction='vertical'>
            <Text>Row Title - used for divider text</Text>
            <Search
              placeholder='Title'
              value={rowTitle}
              enterButton={
                <Button type='primary' onClick={() => {}}>
                  {' '}
                  Save{' '}
                </Button>
              }
              size='large'
            />
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          {children}
          <Col span={24}>
            <div style={{ textAlign: 'center' }}>
              <PlusCircleOutlined
                style={{ fontSize: '2rem', color: '#1677ff' }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default EditableRow;
