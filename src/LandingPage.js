// landing page of yulia the pshychologist website with ant d components
// a photo, text and and an option to register for a session

import React, { useRef } from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Space,
  Typography,
  Card,
  Avatar,
  Carousel,
  ConfigProvider,
  Affix,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import antd input elements
import { InputNumber } from 'antd';
import { Checkbox } from 'antd';
import { Radio } from 'antd';
import dayjs from 'dayjs';
import { FirstRow } from './Rows/FirstRow';
import { ReviewsRow } from './Rows/FourthRow';
import { RegisterRow } from './Rows/SecondRow';
import { useRequest } from 'ahooks';
import { postNewAppointment } from './apiCalls';
import { ThirdRow } from './Rows/ThirdRow';

// import createSnap

// remove the listener
// unbind();

// re-instantiate the listener
// bind();
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
export const color = '#db3314';

export const styles = {
  'col-big': {
    // textAlign: 'center',
    padding: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
  },
  'col-small': {
    // textAlign: 'center',
    padding: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
  },
  divider: {
    borderColor: color,
  },
  dividerTypography: {
    color: color,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  row: {
    minHeight: '100vh',
    // maxHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: '5vh',
  },
  rowLast: {
    minHeight: '100vh',
    // maxHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //   header: {
  //     backgroundColor: '#7f82c7',
  //     textAlign: 'center',
  // padding: '1rem',
  //   },
};

export const colPropsBig = {
  xs: 24,
  sm: 24,
  md: 16,
  lg: 16,
  xl: 16,
  style: styles['col-big'],
};

export const colPropsSmall = {
  xs: 24,
  sm: 24,
  md: 8,
  lg: 8,
  xl: 8,
  style: styles['col-small'],
};

function LandingPage() {
  //

  const dates = [
    dayjs().format('DD-MM-YYYY'),
    dayjs().add(1, 'day').format('DD-MM-YYYY'),
    dayjs().add(2, 'day').format('DD-MM-YYYY'),
    dayjs().add(3, 'day').format('DD-MM-YYYY'),
    dayjs().add(4, 'day').format('DD-MM-YYYY'),
  ];
  const times = ['09:00', '10:30', '12:00', '13:30', '15:00'];
  const options = [];
  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < times.length; j++) {
      options.push({
        label: `${dates[i]} ${times[j]}`,
        value: `${dates[i]} ${times[j]}`,
      });
    }
  }
  const dateOptions = [];
  for (let i = 0; i < dates.length; i++) {
    dateOptions.push({
      label: `${dates[i]}`,
      value: `${dates[i]}`,
    });
  }
  const timeOptions = [];
  for (let j = 0; j < times.length; j++) {
    timeOptions.push({
      label: `${times[j]}`,
      value: `${times[j]}`,
    });
  }

  //   const scrollRef = useRef(null);
  //   useScrollSnap({
  //     ref: scrollRef,

  //   });

  return (
    <div id={'landing'}>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: '16px',

            colorPrimary: color,
            colorFillSecondary: '#f5e3a8',
          },
        }}
      >
        <Layout className='layout'>
          <Content>
            <div className='site-layout-content' id='container'>
              {FirstRow()}

              {RegisterRow(
                options,
                dateOptions,
                timeOptions
                // onSubmit
              )}
              {ThirdRow()}
              {ReviewsRow()}
            </div>
          </Content>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default LandingPage;
