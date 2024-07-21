import { Button, Drawer, Form, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import RoleCreate from './RoleCreate';
import { IResData, IRole } from '@/models/type';
import TitlePage from '@/commons/component/Title/Title';
import { useSevices } from '@/hook/useServices/useSevices';
import Layout from '@/commons/component/Layout';

export default function RolePage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataEdit, setDataEdit] = useState<IRole>();
  const [dataRoles, setDataRoles] = useState<IRole[]>([]);
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices();
  const [form] = Form.useForm();

  const handleGetData = async () => {
    const { data } = await getCaller<IResData<IRole[]>>('/role/getAll');
    if (data.payload) {
      setDataRoles(data.payload.data.reverse());
    }
  };

  useEffect(() => {
    handleGetData();
    setDataEdit(undefined);
  }, []);

  const handleGetdataRole = (id: string) => {
    const user = dataRoles?.find((item) => item._id == id);

    if (user) {
      setDataEdit(user);
      setOpenDrawer(true);
    } else {
      toast.error('NotFound Role');
    }
  };
  const onFinish = async (values: any) => {
    if (!dataEdit?._id) {
      await postCaller('/role/create', values);
      toast.success('Add role successfully!');
    } else {
      await putCaller(`/role/update`, {
        ...values,
        _id: dataEdit._id || '',
      });
      toast.success('Update role successfully!');
    }
    await handleGetData();
    setOpenDrawer(false);
    setDataEdit(undefined);
    form.resetFields();
  };

  const columns: ColumnsType<any> = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id',
      render: (_, __, i) => <> {i + 1} </>,
    },

    {
      key: 'roleName',
      dataIndex: 'roleName',
      title: 'Role name',
    },

    {
      key: 'action',
      title: 'Action',
      render: (data: any) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              className="bg-blue-600"
              size="middle"
              onClick={() => {
                handleGetdataRole(data._id);
              }}
            >
              Sửa
            </Button>
            <Button
              disabled={data.name == 'admin'}
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  if (data.name == 'admin') {
                    toast.error('Không thể xóa Admin');
                    return;
                  }
                  deleteCaller(`/Role/${data._id}`)
                    .then(async () => {
                      toast.success('Deleted successfully');
                      await handleGetData();
                    })
                    .catch((error) => toast.error(error));
                }
              }}
            >
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleOpentDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <Layout>
      <TitlePage hanldeAdd={handleOpentDrawer} isAdd={true} title="Manage Role" />

      <Table columns={columns} dataSource={dataRoles} />
      <Drawer
        title={`${!dataEdit ? 'Add' : 'Update'} role`}
        placement="right"
        width={700}
        onClose={() => {
          setOpenDrawer(!openDrawer);
          setDataEdit(undefined);
        }}
        open={openDrawer}
      >
        <RoleCreate dataEdit={dataEdit ?? dataEdit} onFinish={onFinish} form={form} />
      </Drawer>
    </Layout>
  );
}
