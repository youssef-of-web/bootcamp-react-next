import { ALL_JOKE_API } from '@/constants/api';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App, Button, Form, Input, Modal } from 'antd';

interface Joke {
  jokeId: string | null;
  isModalOpen: boolean;
  handleClose: () => void;
}

export const UpdateJoke = ({ jokeId, isModalOpen, handleClose }: Joke) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const {
    data: singleJoke,
    isLoading: isLoadingJoke,
    refetch,
  } = useQuery({
    queryKey: ['jokes', jokeId],
    queryFn: async () => {
      const response = await axiosInstance.get(`${ALL_JOKE_API}/${jokeId}`);
      form.setFieldValue('content', response.data.content);
      return response.data;
    },
    enabled: !!jokeId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.put(
        `${ALL_JOKE_API}/${jokeId}`,
        data
      );
      return response.data;
    },
    onSuccess(data, variables, context) {
      message.success('Joke updated successfully');
      handleClose();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['jokes'] });
    },
    onError(error, variables, context) {
      message.error('Something went wrong');
      handleClose();
      form.resetFields();
    },
  });

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleClose}
      loading={isLoadingJoke}
      footer={null}
    >
      <Form
        name="update-joke"
        form={form}
        layout="vertical"
        onFinish={(values) => mutate(values)}
      >
        <Form.Item name={'content'} label="Content">
          <Input />
        </Form.Item>
        <Button type="primary" loading={isPending} htmlType="submit">
          Update
        </Button>
      </Form>
    </Modal>
  );
};
