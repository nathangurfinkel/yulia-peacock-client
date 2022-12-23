import { Button, Input, Form } from 'antd';
import React from 'react';

export const FormFactory = ({ form }) => {
  const { fields, submit } = form;
  return (
    <Form
      name='basic'
      initialValues={{
        remember: true,
      }}
      onFinish={(values) => {
        console.log('Success:', values);
      }}
      onFinishFailed={(errorInfo) => {
        console.log('Failed:', errorInfo);
      }}
      wrapperCol={{
        span: 24,
      }}
    >
      {fields.map((field) => {
        return (
          <Form.Item name={field.id} rules={field.rules}>
            <Input placeholder={field.placeholder} />
          </Form.Item>
        );
      })}
      <Button type='primary' onClick={submit.onClick} htmlType='submit' block>
        {submit.text}
      </Button>
    </Form>
  );
};
