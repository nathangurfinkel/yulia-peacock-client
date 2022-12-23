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
  Skeleton,
} from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import ColumnFactory from '../CMSRenderer/factories/ColumnFactory';
import RowFactory from '../CMSRenderer/factories/RowFactory';
import ButtonFactory from '../CMSRenderer/factories/ButtonFactory';
import { FormFactory } from '../CMSRenderer/factories/FormFactory';
import DeleteColumnOutlined from '@ant-design/icons/DeleteColumnOutlined';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import EditableRow from './components/EditableRow';
import EditableColumn from './components/EditableColumn';
import layoutMockData from '../layoutMockData';
import { useRequest } from 'ahooks';

const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

//mock promise to get layout data from server

//mock edit layout data

function getLayout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(layoutMockData);
    }, 1000);
  });
}

function editLayout(newLayout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newLayout);
    }, 1000);
  });
}

function getColumns() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(layoutMockData.columns);
    }, 5000);
  });
}
function getRows() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(layoutMockData.rows);
    }, 1000);
  });
}

function getButtons() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(layoutMockData.buttons);
    }, 1000);
  });
}

function getForms() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(layoutMockData.forms);
    }, 1000);
  });
}

function editRow(rowId, row) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let rowToEdit = layoutMockData.rows.find((row) => row.id === rowId);
      rowToEdit.title = row.title;
      rowToEdit.style = row.style;
      rowToEdit.columnIds = row.columnIds;

      resolve(rowToEdit);
    }, 1000);
  });
}

function getColumnById(columnId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let column = layoutMockData.columns.find((col) => col.id === columnId);
      resolve(column);
    }, 1000);
  });
}

function editColumn(columnId, column) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let columnToEdit = layoutMockData.columns.find(
        (col) => col.id === columnId
      );
      columnToEdit.title = column.title;
      columnToEdit.style = column.style;
      columnToEdit.content = column.content;

      resolve(columnToEdit);
    }, 1000);
  });
}

function Editor() {
  const [layoutBeforeEdit, setLayoutBeforeEdit] = React.useState(null);
  const [columnsBeforeEdit, setColumnsBeforeEdit] = React.useState(null);
  const [rowsBeforeEdit, setRowsBeforeEdit] = React.useState(null);
  const [textsBeforeEdit, setTextsBeforeEdit] = React.useState(null);
  const [buttonsBeforeEdit, setButtonsBeforeEdit] = React.useState(null);
  const [formsBeforeEdit, setFormsBeforeEdit] = React.useState(null);
  const [imagesBeforeEdit, setImagesBeforeEdit] = React.useState(null);

  const {
    data: layout,
    error: layoutError,
    loading: layoutLoading,
    mutate,
  } = useRequest(getLayout, {
    onSuccess: (result, params) => {
      console.log(result);
      setLayoutBeforeEdit(result);
    },
    onError: (error, params) => {
      message.error(error);
    },
  });

  const { run: editLayoutRun } = useRequest(editLayout, {
    manual: true,
    onSuccess: (result, params) => {
      mutate(result);
      setLayoutBeforeEdit(result);
    },
    onError: (error, params) => {
      message.error(error);
      mutate(layoutBeforeEdit);
    },
  });

  const {
    data: rows,
    error: rowsError,
    loading: rowsLoading,
  } = useRequest(getRows, {
    onSuccess: (result, params) => {
      console.log(result);
      setRowsBeforeEdit(result);
    },
    onError: (error, params) => {
      message.error(error);
    },
  });

  const {
    data: buttons,
    error: buttonsError,
    loading: buttonsLoading,
  } = useRequest(getButtons, {
    onSuccess: (result, params) => {
      console.log(result);
      setButtonsBeforeEdit(result);
    },
    onError: (error, params) => {
      message.error(error);
    },
  });

  const {
    data: forms,
    error: formsError,
    loading: formsLoading,
  } = useRequest(getForms, {
    onSuccess: (result, params) => {
      console.log(result);
      setFormsBeforeEdit(result);
    },
    onError: (error, params) => {
      message.error(error);
    },
  });

  const { run: editRowRun } = useRequest(editRow, {
    manual: true,
    onSuccess: (result, params) => {
      mutate(result);
      setRowsBeforeEdit(result);
    },
    onError: (error, params) => {
      message.error(error);
      mutate(rowsBeforeEdit);
    },
  });

  //   const [layout, setLayout] = React.useState(layoutMockData);
  // render the rows as json data editor

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Title>Editor</Title>

      <Text> Hint: Row represents a "screen" in the app.</Text>
      <Row gutter={[16, 16]}>
        {rows ? (
          rows.map((row) => (
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
                      return (
                        <EditableColumn
                          id={columnId}
                          row={row}
                          // buttons, images, texts, colProps, forms
                        />
                      );
                    })}
                  </EditableRow>
                </Panel>
              </Collapse>
            </Col>
          ))
        ) : (
          <>
            <Skeleton.Button active size='large' block />
            <Skeleton.Button active size='large' block />
            <Skeleton.Button active size='large' block />
          </>
        )}
        {layoutError && <div>error</div>}
      </Row>
    </div>
  );
}

export default Editor;
