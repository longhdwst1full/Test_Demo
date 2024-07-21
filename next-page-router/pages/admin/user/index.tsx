import { Button, Drawer, Form, message, Table } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Layout from '@/commons/component/Layout';
import TitlePage from '@/commons/component/Title/Title';
import { useSevices } from '@/hook/useServices/useSevices';
import { IReqUsers, IResData, IUsers } from '@/models/type';
import UserCreate from './UserCreate';

export default function UserPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataEdit, setDataEdit] = useState<IUsers>();
  const [dataRoles, setDataRoles] = useState<IUsers[]>();
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices();
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();

  const handleGetData = async () => {
    const { data } = await getCaller<IResData<IUsers[]>>('/users/getAll');
    if (data.payload) {
      setDataRoles(data.payload.data);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const onFinish = async (values: IReqUsers) => {
    if (!dataEdit?._id) {
      try {
        await postCaller('/users/createUser', { ...values });
        toast.success('Add users successfully!');
      } catch (error: any) {
        messageApi.open({
          type: 'error',
          content: error?.response?.data?.error,
        });
      }
    } else {
      try {
        await putCaller(`/users/update`, { ...values, _id: dataEdit._id }, true, false);
      } catch (error: any) {
        messageApi.open({
          type: 'error',
          content: error?.response?.data?.error,
        });

        toast.success('Update users successfully!');
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

      phone: items.phone,
      nickName: items.nickname,
      isLogin: items.isLogin,
    };
  });
  const handleGetUser = (id: string) => {
    const user = dataRoles?.find((item) => item._id == id);
    user ? setDataEdit(user) : toast.error('Notfound users');
    setOpenDrawer(true);
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: 'isLogin',
      dataIndex: 'isLogin',
      key: 'isLogin',
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
                  await deleteCaller(`/users/${data.key}`);
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
      <TitlePage hanldeAdd={handleOpentDrawer} isAdd={true} title="Manage User" />

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Add' : 'Update'} User`}
        placement="right"
        width={700}
        onClose={() => {
          setOpenDrawer(false);
          setDataEdit(undefined);
        }}
        open={openDrawer}
      >
        <UserCreate form={form} dataUser={dataEdit} onFinish={onFinish} />
      </Drawer>
    </Layout>
  );
}
