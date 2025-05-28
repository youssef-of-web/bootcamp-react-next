import { ALL_JOKE_API, MY_JOKE_API } from '@/constants/api';
import { AddJoke } from '@/features/jokes/add-joke';
import { UpdateJoke } from '@/features/jokes/update-joke';
import { axiosInstance } from '@/lib/axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, App, Button, Flex, Table } from 'antd';
import { useState } from 'react';

export const Jokes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jokeId, setJokeId] = useState(null);
  const [openAddJoke, setOpenAddJoke] = useState(false);
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jokes'],
    queryFn: async () => {
      const response = await axiosInstance.get(MY_JOKE_API);
      return response.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`${ALL_JOKE_API}/${id}`);
      return response.data;
    },
    onSuccess() {
      message.success('Joke deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['jokes'] });
    },
    onError() {
      message.error('Something went wrong');
    },
  });

  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCloseAddJoke = () => {
    setOpenAddJoke(false);
  };

  if (isError) {
    return <Alert type="error" message="Something went wrong" />;
  }

  const dataSource = data;

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: any, record: any) => (
        <Flex gap={4}>
          <Button
            shape="circle"
            onClick={() => {
              setJokeId(record._id);
              handleOpen();
            }}
            icon={<EditOutlined />}
          />
          <Button
            shape="circle"
            onClick={() => mutate(record._id)}
            icon={<DeleteOutlined />}
            loading={isPending}
          />
        </Flex>
      ),
    },
  ];
  return (
    <div>
      <Button type="primary" onClick={() => setOpenAddJoke(true)}>
        Add Joke
      </Button>
      <Table dataSource={dataSource} columns={columns} loading={isLoading} />
      <UpdateJoke
        jokeId={jokeId}
        handleClose={handleClose}
        isModalOpen={isModalOpen}
      />
      hello
      <AddJoke
        openAddJoke={openAddJoke}
        handleCloseAddJoke={handleCloseAddJoke}
      />
    </div>
  );
};
