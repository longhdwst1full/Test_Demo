import { Button, Drawer, Form, message, Table } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Layout from '@/commons/component/Layout';
import TitlePage from '@/commons/component/Title/Title';
import { useSevices } from '@/hook/useServices/useSevices';
import { IReqCommentators, IResData, IResVideoLive } from '@/models/type';
import VideoCreate from './VideoCreate';

export default function VideoLiveAdmin() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataEdit, setDataEdit] = useState<IResVideoLive>();
  const [dataRoles, setDataRoles] = useState<IResVideoLive[]>();
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices();
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();

  const handleGetData = async () => {
    const { data } = await getCaller<IResData<IResVideoLive[]>>('/video-live/getAll');
    if (data.payload) {
      setDataRoles(data.payload.data);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const onFinish = async (values: IReqCommentators) => {
    if (!dataEdit?._id) {
      try {
        await postCaller('/video-live/create', { ...values });
        toast.success('Add video live successfully!');
      } catch (error: any) {
        messageApi.open({
          type: 'error',
          content: error?.response?.data?.error,
        });
      }
    } else {
      try {
        await putCaller(`/video-live/update`, { ...values, _id: dataEdit._id }, true, false);
      } catch (error: any) {
        messageApi.open({
          type: 'error',
          content: error?.response?.data?.error,
        });

        toast.success('Update video live successfully!');
      }
    }
    await handleGetData();
    setOpenDrawer(false);
    setDataEdit(undefined);
    form.resetFields();
  };

  const dataSource = dataRoles?.reverse()?.map((items, index) => {
    return {
      stt: index + 1,
      key: items._id,
      title: items.title,
      liveStartTime: items.liveStartTime,
      liveEndTime: items.liveEndTime,
      commentators: items.commentators,
      viewers: items.viewers,
      urlVideoLive: items.urlVideoLive,
      isLive: items.isLive,
      roomChat: items.roomChat,
    };
  });
  const handleGetUser = (id: string) => {
    const user = dataRoles?.find((item) => item._id == id);
    user ? setDataEdit(user) : toast.error('Notfound video live');
    setOpenDrawer(true);
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'liveStartTime',
      dataIndex: 'liveStartTime',
      key: 'liveStartTime',
    },
    {
      title: 'liveEndTime',
      dataIndex: 'liveEndTime',
      key: 'liveEndTime',
    },
    {
      title: 'commentators',
      dataIndex: 'commentators',
      key: 'commentators',
    },
    {
      title: 'isLive',
      dataIndex: 'isLive',
      key: 'isLive',
    },

    {
      title: 'viewers',
      dataIndex: 'viewers',
      key: 'viewers',
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: 'urlVideoLive',
      dataIndex: 'urlVideoLive',
      key: 'urlVideoLive',
    },

    {
      render: (data: any) => {
        return (
          <div className="space-x-5">
            <Button
              onClick={() => {
                handleGetUser(data.key);
              }}
            >
              Edit
            </Button>
            <Button
              // disabled={data.roleName == 'admin'}
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  await deleteCaller(`/video-live/${data.key}`);
                  await handleGetData();
                }
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const handleOpentDrawer = () => {
    setOpenDrawer(true);
  };
  return (
    <Layout>
      <TitlePage hanldeAdd={handleOpentDrawer} isAdd={true} title="Manage video live" />

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Add' : 'Update'} video live`}
        placement="right"
        width={700}
        onClose={() => {
          setOpenDrawer(false);
          setDataEdit(undefined);
        }}
        open={openDrawer}
      >
        <VideoCreate form={form} dataUser={dataEdit} onFinish={onFinish} />
      </Drawer>
    </Layout>
  );
}
