import React from 'react';

import { ConfigProvider, Spin, Space, Table, Tag, Typography } from 'antd';
import { useRequest } from 'ahooks';
import { getAppointmentList } from './apiCalls';
const { Column, ColumnGroup } = Table;
const { Title, Paragraph, Text } = Typography;
export default function AdminPage() {
  // get all the appointments from the api using fetch

  // display the appointments in a table

  // display the appointments in a calendar
  //   {
  //     "name": "Nathan Gurfinkel",
  //     "email": "natan.gurfinkel@gmail.com",
  //     "phonenumber": "+972542197713",
  //     "date": "2022-12-12",
  //     "time": "10:30"
  // }
  const {
    data: listOfAppointments,
    loading: loadingAppointments,
    error: errorAppointments,
  } = useRequest(getAppointmentList, {
    manual: false,
    onSuccess: (result, params) => {
      console.log('result', result);
      console.log('params', params);
    },
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: '0.25rem',
          colorPrimary: '#7f82c7',
        },
      }}
    >
      <div className='AdminPage'>
        <Title>Admin Page</Title>
        {loadingAppointments && <Spin />}
        {errorAppointments && <div>error</div>}
        {listOfAppointments && (
          <Table dataSource={listOfAppointments.data}>
            <Column title='Name' dataIndex='name' key='name' />
            <Column title='Email' dataIndex='email' key='email' />
            <Column title='Phone Number' dataIndex='tel' key='tel' />
            <Column title='Date' dataIndex='date' key='date' />
            <Column title='Time' dataIndex='time' key='time' />
          </Table>
        )}
      </div>
    </ConfigProvider>
  );
}
