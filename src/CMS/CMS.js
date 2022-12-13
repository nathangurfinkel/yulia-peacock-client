// this is a CMS component that takes data from the server and renders it
//

import { Divider, Layout, Space } from 'antd';
import React from 'react';
import ColumnFactory from './ColumnFactory';
import RowFactory from './RowFactory';
import ButtonFactory from './ButtonFactory';
import { FormFactory } from './FormFactory';

const { Header, Content, Footer } = Layout;

function CMS({ editing }) {
  //calculate width of columns based on the amount of columns in a row
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
        title: 'title',
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
        title: 'title2',
        //etc
      },
    ],
    columns: [
      {
        id: 'col1',
        style: {
          backgroundColor: 'blue',
          justifyContent: 'center',
          minHeight: '80vh',
        },

        content: [
          {
            type: 'text',
            id: 'text1',
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

        title: 'title',
      },
      {
        id: 'col2',
        style: {
          // padding: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '16px',

          backgroundColor: 'red',
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
          backgroundColor: 'black',
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
  const [editMode, setEditMode] = React.useState(false);
  const calculateColumnWidth = (columnsAmount) => {
    const columnWidth = 24 / columnsAmount;
    return columnWidth;
  };
  // calculated column props
  const columnProps = (columnsAmount) => {
    return {
      xs: 24,
      sm: 24,
      md: calculateColumnWidth(columnsAmount),
      lg: calculateColumnWidth(columnsAmount),
      xl: calculateColumnWidth(columnsAmount),
      xxl: calculateColumnWidth(columnsAmount),
    };
  };
  const getColumnStyle = (columnId) => {
    const column = layout.columns.find((column) => column.id === columnId);
    return column.style;
  };
  const DividerTitle = ({ title, orientation }) => {
    return (
      <Divider orientation={orientation} orientationMargin={'10vw'}>
        {title}
      </Divider>
    );
  };

  const isOdd = (rowId) => {
    //get row number from string
    const rowNumber = rowId.match(/\d+/g).map(Number);
    return rowNumber % 2 === 0;
  };
  console.log(layout);
  return (
    <>
      <Layout className='layout'>
        <Content>
          <div className='site-layout-content' id='container'></div>

          {layout.rows.map((row) => {
            return (
              <RowFactory style={row.style} id={row.id}>
                <DividerTitle
                  title={row.title}
                  orientation={isOdd(row.id) ? 'left' : 'right'}
                />
                {row.columnIds.map((columnId) => {
                  return (
                    <ColumnFactory
                      style={{
                        ...getColumnStyle(columnId),
                        textAlign: 'center',
                      }}
                      columnProps={columnProps(row.columnIds.length)}
                    >
                      <>
                        {layout.columns

                          .find((column) => column.id === columnId)
                          .content.map((content) => {
                            switch (content.type) {
                              case 'text':
                                return (
                                  <p>
                                    {
                                      layout.texts.find(
                                        (text) => text.id === content.id
                                      ).text
                                    }
                                  </p>
                                );
                              case 'button':
                                return (
                                  <ButtonFactory
                                    text={
                                      layout.buttons.find(
                                        (button) => button.id === content.id
                                      ).text
                                    }
                                    action={
                                      layout.buttons.find(
                                        (button) => button.id === content.id
                                      ).onClick
                                    }
                                  />
                                );
                              case 'image':
                                return (
                                  <img
                                    src={
                                      layout.images.find(
                                        (image) => image.id === content.id
                                      ).src
                                    }
                                  />
                                );
                              case 'form':
                                return (
                                  <FormFactory
                                    form={layout.forms.find(
                                      (form) => form.id === content.id
                                    )}
                                  />
                                );
                              default:
                                return null;
                            }
                          })}
                      </>
                    </ColumnFactory>
                  );
                })}
              </RowFactory>
            );
          })}
        </Content>
      </Layout>
    </>
  );
}

export default CMS;
