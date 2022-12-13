/**
 * ColumnFactory
 *
 * @description - ColumnFactory is a component that returns a column with the given props
 *
 * @param {string} id - id of the column
 * @param {object} style - style of the column
 * @param {object} children - children of the column
 * @param {object} columnProps - props of the column
 *
 * @returns {object} - ColumnFactory
 *
 * @example
 *
 * <ColumnFactory
 *  id='col1'
 *  style={{
 *      backgroundColor: 'blue',
 *      padding: '1rem',
 *      justifyContent: 'center',
 *      }}
 *  columnProps={{
 *  span: 12,
 * }}
 * >
 *
 *
 */

import React from 'react';
import { Col, Space } from 'antd';

function ColumnFactory({ id, style, children, columnProps, editMode }) {
  return (
    <>
      <Col id={id} {...columnProps}>
        <div style={style}>
          <Space
            direction='vertical'
            size='large'
            style={{
              padding: '1rem',
            }}
          >
            {children}
          </Space>
        </div>
      </Col>
    </>
  );
}

export default ColumnFactory;
