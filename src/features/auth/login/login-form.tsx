import { App, Button, Card, Form, Input } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { DASHBOARD } from '@/constants/routes';
import { LOGIN_API } from '@/constants/api';

export default function LoginForm() {
  const { message } = App.useApp();

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async (values) => {
      const response = await axiosInstance.post(LOGIN_API, values);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      message.success('Login successfully!');
      window.location.href = DASHBOARD;
    },
    onError: () => message.error('Error login!'),
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
      <Card style={{ width: 400 }} title={'Login to your account'}>
        <Form
          name={'login-form'}
          layout="vertical"
          onFinish={(values) => handleSubmit(values)}
        >
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
            <Input />
          </Form.Item>
          <Button
            htmlType={'submit'}
            type={'primary'}
            size={'middle'}
            loading={isPending}
          >
            Connect
          </Button>
        </Form>
      </Card>
    </div>
  );
}
