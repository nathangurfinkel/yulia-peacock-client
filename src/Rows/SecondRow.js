import React from 'react';
import {
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Select,
  Form,
  Spin,
} from 'antd';
import { Input } from 'antd';
import { color } from '../LandingPage';
import { styles, colPropsBig, colPropsSmall } from '../LandingPage';
import { useRequest } from 'ahooks';
import { postNewAppointment } from '../apiCalls';

const { Title, Paragraph, Text } = Typography;

export function RegisterRow(options, dateOptions, timeOptions, content) {
  const onFinish = (values) => {
    onSubmit(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const {
    data: postAppointmentData,
    error: postAppointmentError,
    loading: postAppointmentLoading,
    run: postAppointmentRun,
  } = useRequest(postNewAppointment, {
    manual: true,
    onSuccess: (result, params) => {
      console.log(result);
      setTimeout(() => {
        document.getElementById('reviews').scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 2000);
    },
  });

  async function onSubmit(values) {
    const newAppointment = {
      name: values.name,
      email: values.email,
      tel: values.tel,
      date: values.date,
      time: values.time,
    };

    postAppointmentRun(newAppointment);

    console.log('new appointment added');
  }
  return (
    <Row style={styles.row} id='register'>
      <Divider orientation='right' orientationMargin={'15vw'} id='#register'>
        <Typography style={styles.dividerTypography}>
          {/* landing.freeSession */}
          Free Session
        </Typography>
      </Divider>
      <Col {...colPropsBig}>
        <Paragraph
          style={{
            fontSize: '1.5rem',
          }}
        >
          Register for a session with Yulia. You can choose from a variety of
          options.
        </Paragraph>
        <div style={{ textAlign: 'center' }}>
          <Button
            type='default'
            size='large'
            onClick={() => {
              document.getElementById('video').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
          >
            {content ? content.leftCol.buttonText : 'Learn More'}
          </Button>
        </div>
      </Col>
      <Col {...colPropsSmall}>
        <Form
          name='basic'
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Please enter your full name!',
              },
            ]}
          >
            <Input id='nameinput' placeholder='Full Name' size='large' />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          >
            <Input type='email' placeholder='Email' size='large' />
          </Form.Item>
          <Form.Item
            name='tel'
            rules={[
              {
                required: true,
                message: 'Please enter your phone number!',
              },
            ]}
          >
            <Input
              type='tel'
              placeholder='Phone Number - Whatsapp Prefered!'
              size='large'
            />
          </Form.Item>
          {/* date picker for the next 4 days   */}
          <Form.Item
            name='date'
            rules={[
              {
                required: true,
                message: 'Please enter date your date!',
              },
            ]}
          >
            {options.length > 0 && (
              <Select
                placeholder='Select a date'
                size='large'
                //   onChange={onChange}
                allowClear
                options={dateOptions}
              />
            )}
          </Form.Item>
          <Form.Item
            name='time'
            rules={[
              {
                required: true,
                message: 'Please enter time your time!',
              },
            ]}
          >
            {options.length > 0 && (
              <Select
                placeholder='Select a time'
                size='large'
                //   onChange={onChange}
                allowClear
                options={timeOptions}
              />
            )}
          </Form.Item>{' '}
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            {postAppointmentData && (
              <Paragraph
                style={{
                  fontSize: '1.5rem',
                  //   fontWeight: 'bold',
                }}
              >
                Thank you for registering! We will contact you shortly.
              </Paragraph>
            )}
            {postAppointmentError && (
              <Paragraph
                style={{
                  fontSize: '1.5rem',
                  //   fontWeight: 'bold',
                }}
              >
                Sorry, something went wrong. Please try again.
              </Paragraph>
            )}
            {!postAppointmentData && (
              <Button
                type='primary'
                htmlType='submit'
                block
                size='large'
                disabled={postAppointmentLoading}
              >
                {postAppointmentLoading ? <Spin /> : 'Submit'}
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
