import { App, Button, Card, Form, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { axiosInstance } from '../lib/axios.ts';
import { useMutation } from '@tanstack/react-query';

export default function Register() {
  const { message } = App.useApp();
  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async (values) => {
      const response = await axiosInstance.post('/auth/register', values);
      return response.data;
    },
    onSuccess: () => message.success('Account created successfully!'),
    onError: () => message.error('Error creating account!'),
  });

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card style={{ width: 400 }} title={'Create your account'}>
        <Form
          name={'login-form'}
          layout="vertical"
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label="Fullname"
            name={'fullname'}
            rules={[{ required: true, message: 'Please input your fullname!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name={'email'}
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please input a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name={'password'}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Password"
            name={'confirm-password'}
            hasFeedback={true}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
            dependencies={['password']}
          >
            <Input.Password />
          </Form.Item>
          <Button
            htmlType={'submit'}
            type={'primary'}
            size={'middle'}
            icon={<SaveOutlined />}
            loading={isPending}
          >
            Create account
          </Button>
        </Form>
      </Card>
    </div>
  );
}
