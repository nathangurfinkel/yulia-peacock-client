/**
 *  @fileOverview RowFactory.js
 * @description This file contains the RowFactory component.
 * @version 1.0.0
 *
 * @param {string} id - id of the row
 * @param {object} style - style of the row
 * @param {object} children - children of the row
 * @param {object} rowProps - props of the row
 *
 * @returns {object} - RowFactory
 *
 * @example
 *
 * <RowFactory
 * id='row1'
 * style={{
 *  backgroundColor: 'blue',
 * padding: '1rem',
 * justifyContent: 'center',
 * }}
 * rowProps={{
 *  minHeight: '100vh',
 *
 * }}
 * >
 * <ColumnFactory
 * id='col1'
 * style={{
 * backgroundColor: 'blue',
 * padding: '1rem',
 * justifyContent: 'center',
 * }}
 * columnProps={{
 * span: 12,
 * }}
 * >
 * {children}
 * </RowFactory>
 *
 *
 */

import React from 'react';
import { Row } from 'antd';

function RowFactory({ id, style, children, rowProps }) {
  return (
    <>
      <Row id={id} style={style} {...rowProps} gutter={[16, 16]}>
        {children}
      </Row>
    </>
  );
}

export default RowFactory;
