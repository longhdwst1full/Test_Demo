import { Button, Drawer, Form, message, Table } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Layout from '@/commons/component/Layout';
import TitlePage from '@/commons/component/Title/Title';
import { useSevices } from '@/hook/useServices/useSevices';
import { IReqVideoLive, IResData, IResVideoLive } from '@/models/type';
import dayjs from 'dayjs';
import VideoCreate from './VideoCreate';

const fomartTime = 'YYYY-MM-DD HH:mm:ss';

export default function VideoLiveAdmin() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataEdit, setDataEdit] = useState<IResVideoLive>();
  const [dataRoles, setDataRoles] = useState<IResVideoLive[]>();
  const { deleteCaller, getCaller, postCallerFormData, postCaller, putCaller } = useSevices();
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

  const onFinish = async (values: IReqVideoLive) => {
    console.log(values, '::data value');
    const formData = new FormData();
    console.log(values.imageThumbnailUrl);
    let urlImage = '';
    if (values.imageThumbnailUrl[0]?.originFileObj) {
      formData.append('file', values.imageThumbnailUrl[0]?.originFileObj);
      const dataUrl = await postCallerFormData<any, any>('/upload/file', formData);
      urlImage = dataUrl?.data || '';
    }

    if (!dataEdit?._id && urlImage) {
      try {
        await postCaller('/video-live/create', {
          ...values,
          timeLive: '',
          imageThumbnailUrl: urlImage,
          liveStartTime: dayjs(values.timeLive[0]).format(fomartTime),
          liveEndTime: dayjs(values.timeLive[1]).format(fomartTime),
        });
        toast.success('Add video live successfully!');
      } catch (error: any) {
        messageApi.open({
          type: 'error',
          content: error?.response?.data?.error,
        });
      }
    } else {
      try {
        dataEdit &&
          (await putCaller(
            `/video-live/update`,
            {
              ...values,
              imageThumbnailUrl: urlImage ? urlImage : undefined,
              liveStartTime: dayjs(values.timeLive[0]).format(fomartTime),
              liveEndTime: dayjs(values.timeLive[1]).format(fomartTime),
              _id: dataEdit._id,
            },
            true,
            false,
          ));
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

  const dataSource = dataRoles?.map((items, index) => {
    return {
      stt: index + 1,
      key: items._id,
      title: items.title,
      liveStartTime: dayjs(items.liveStartTime).format(fomartTime),
      liveEndTime: dayjs(items.liveEndTime).format(fomartTime),
      commentators: items.commentators?.map((item) => item.name),
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
          form.resetFields();
        }}
        open={openDrawer}
      >
        <VideoCreate form={form} dataUser={dataEdit} onFinish={onFinish} />
      </Drawer>
    </Layout>
  );
}
