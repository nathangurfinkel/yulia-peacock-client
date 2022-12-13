import React, { useEffect } from 'react';

import {
  ConfigProvider,
  Spin,
  Space,
  Table,
  Tag,
  Typography,
  Layout,
  Menu,
  List,
  Calendar,
  Button,
  Select,
} from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import { getAppointmentList } from './apiCalls';
import { atcb_action, atcb_init } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import { CalendarOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
const { Title, Paragraph, Text } = Typography;
export default function AdminPage() {
  React.useEffect(() => {
    atcb_init();
  }, []);

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
    onSuccess: (result, params) => {
      console.log('result', result);
      console.log('params', params);
    },
  });

  // filter the appointments by date for this week

  const [showByWeek, setShowByWeek] = useState(false);
  const [filteredByWeek, setFilteredByWeek] = useState([]);

  useEffect(() => {
    if (listOfAppointments) {
      const filteredByWeek = listOfAppointments.data.filter((appointment) => {
        const today = dayjs();
        const appointmentDate = dayjs(appointment.date);
        const diff = appointmentDate.diff(today, 'day');
        return diff >= 0 && diff <= 7;
      });
      setFilteredByWeek(filteredByWeek);
    }
  }, [listOfAppointments]);

  const [current, setCurrent] = useState('Appointments');

  function onClick(e) {
    console.log('click ', e);
    setCurrent(e.key);
  }
  // antd calendar dateCellRender
  function dateCellRender(value) {
    const listData = listOfAppointments.data.filter(
      (appointment) =>
        dayjs(appointment.date).format('DD-MM-YYYY') ===
        dayjs(value).format('DD-MM-YYYY')
    );
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li key={item.name}>
            <Tag color='blue'>
              {item.name} - {item.time}
            </Tag>
          </li>
        ))}
      </ul>
    );
  }

  // monthCellRender
  function monthCellRender(value) {
    const num = listOfAppointments.data.filter(
      (appointment) =>
        dayjs(appointment.date).format('YYYY-MM') ===
        dayjs(value).format('YYYY-MM')
    ).length;
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Appointments</span>
      </div>
    ) : null;
  }

  const whatsappLink = (tel) => {
    // trim +
    if (!tel) {
      return '';
    }
    const telWithoutPlus = tel.substring(1);
    return `https://wa.me/${telWithoutPlus}`;
  };

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
        <Layout>
          <Layout.Header>
            <Menu
              theme='dark'
              mode='horizontal'
              selectedKeys={[current]}
              onClick={onClick}
              items={[
                {
                  key: 'Appointments',
                  label: 'Appointments',
                },
                {
                  key: 'Content',
                  label: 'Content',
                },
              ]}
            ></Menu>
          </Layout.Header>
          <Layout.Content>
            {current === 'Appointments' && (
              <>
                {loadingAppointments && <Spin />}
                {errorAppointments && <div>error</div>}
                {listOfAppointments && (
                  <>
                    {/* select view by week or all  */}
                    <Space direction='vertical' style={{ width: '100%' }}>
                      <Select
                        defaultValue='week'
                        style={{ width: '100%', padding: '1rem' }}
                        onChange={(value) => {
                          if (value === 'week') {
                            setShowByWeek(true);
                          } else {
                            setShowByWeek(false);
                          }
                        }}
                      >
                        <Select.Option value='week'>This Week</Select.Option>
                        <Select.Option value='all'>All</Select.Option>
                      </Select>
                      <List
                        dataSource={
                          showByWeek ? filteredByWeek : listOfAppointments.data
                        }
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              title={
                                <>
                                  {item.name}{' '}
                                  <a
                                    href={whatsappLink(item.tel)}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    <img
                                      src='https://img.icons8.com/color/48/000000/whatsapp--v1.png'
                                      width={20}
                                      alt='whatsapp'
                                    />
                                  </a>
                                </>
                              }
                              description={
                                <a href={`mailto:${item.email}`}>
                                  {item.email}
                                </a>
                              }
                            />
                            <div>{item.tel}</div> <div>{item.date}</div>
                            <div>{item.time}</div>
                            <Button
                              onClick={() => {
                                atcb_action({
                                  name: 'Free session with ' + item.name,
                                  description:
                                    'Free session with ' +
                                    item.name +
                                    ', phone number: ' +
                                    item.tel +
                                    ', email: ' +
                                    item.email,
                                  startDate: item.date,
                                  startTime: item.time,
                                  // add 1 hour to end time
                                  endTime: dayjs(item.time, 'HH:mm')
                                    .add(1, 'hour')
                                    .format('HH:mm'),

                                  location: 'Online',
                                  trigger: 'click',
                                  inline: true,
                                  options: ['Google', 'Microsoft365', 'Yahoo'],
                                });
                              }}
                            >
                              <CalendarOutlined />
                              Add to calendar
                            </Button>
                          </List.Item>
                        )}
                      />
                    </Space>
                    <Calendar
                      dateCellRender={dateCellRender}
                      monthCellRender={monthCellRender}
                    />
                  </>
                )}
              </>
            )}
            {current === 'Content' && <>{/* <ContentEditor /> */}</>}
          </Layout.Content>
        </Layout>
      </div>
    </ConfigProvider>
  );
}
