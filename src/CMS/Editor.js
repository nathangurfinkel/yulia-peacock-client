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
import EditableColumn from './EditableColumn';

const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
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
function Editor() {
  //calculate width of columns based on the amount of columns in a row

  const [layout, setLayout] = React.useState(layoutMockData);
  // render the rows as json data editor


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
                    return (
                      <EditableColumn
                        column={column}
                        row={row}
                        // buttons, images, texts, colProps, forms
                        buttons={layout.buttons}
                        images={layout.images}
                        texts={layout.texts}
                        forms={layout.forms}
                      />
                    );
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
