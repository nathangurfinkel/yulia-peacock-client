// this is a CMS component that takes data from the server and renders it
//

import { Divider, Layout, Space } from 'antd';
import React from 'react';
import ColumnFactory from './factories/ColumnFactory';
import RowFactory from './factories/RowFactory';
import ButtonFactory from './factories/ButtonFactory';
import { FormFactory } from './factories/FormFactory';
import layoutMockData from '../layoutMockData';

const { Header, Content, Footer } = Layout;

function CMSRenderer({ editing }) {
  //calculate width of columns based on the amount of columns in a row

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
                                // buttons: [
                                //     {
                                //       id: 'btn1',
                                //       text: 'button 1 text',
                                //       setOnClick: { action: 'scrollTo', target: 'row2' },
                                //     },
                                //     {
                                //       id: 'btn2',
                                //       text: 'button 2',
                                //       setOnClick: { action: 'goTo', target: 'https://www.google.com' },
                                //     },
                                //   ],
                                return (
                                  <ButtonFactory
                                    text={
                                      layout.buttons.find(
                                        (button) => button.id === content.id
                                      ).text
                                    }
                                    setOnClick={
                                      layout.buttons.find(
                                        (button) => button.id === content.id
                                      ).setOnClick
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

export default CMSRenderer;
