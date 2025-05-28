import { ALL_JOKE_API } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, Input, Modal } from 'antd';

interface Joke {
  openAddJoke: boolean;
  handleCloseAddJoke: () => void;
}
export const AddJoke = ({ openAddJoke, handleCloseAddJoke }: Joke) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post(ALL_JOKE_API, data);
      return response.data;
    },
    onSuccess() {
      message.success('Joke added successfully');
      handleCloseAddJoke();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['jokes'] });
    },
    onError() {
      message.error('Something went wrong');
    },
  });
  return (
    <Modal
      open={openAddJoke}
      onCancel={handleCloseAddJoke}
      footer={null}
      title="Add new joke"
    >
      <Form
        form={form}
        name="add-joke"
        layout="vertical"
        onFinish={(values) => mutate(values)}
      >
        <Form.Item
          label="Joke"
          name="content"
          rules={[{ required: true, message: 'Joje required' }]}
        >
          <Input type="text" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Add joke
        </Button>
      </Form>
    </Modal>
  );
};
