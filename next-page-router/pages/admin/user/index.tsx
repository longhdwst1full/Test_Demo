import { Button, Drawer, Form, Table } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'

import TitlePage from '~/components/TitlePage'
import { useSevices } from '~/configs/useSevice'
import { IUsers } from '~/types/user.type'
import UserCreate from './UserCreate'

export default function UserPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<IUsers>()
  const [dataRoles, setDataRoles] = useState<IUsers[]>()
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices()
  const [form] = Form.useForm()
  const handleGetData = async () => {
    const data = await getCaller<IUsers[]>('User')
    if (data) {
      setDataRoles(data.data.filter((item) => item.roleName == 'user'))
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  const onFinish = async (values: any) => {
    if (!dataEdit?.id) {
      await postCaller('/User', { ...values })
      toast.success('Thêm người dùng thành công!')
    } else {
      await putCaller(`User/${dataEdit.id}`, {
        userName: values.userName,
        email: values.email,
        phone: values.phone
      })

      if (dataEdit.roleName !== values.role) {
        await postCaller(`User/update/role-user/${values.role}`, {
          userId: dataEdit.id
        })
      }

      if (dataEdit.password != values.passWord) {
        await postCaller(`User/update/passWord/${dataEdit.id}`, {
          passWord: values.passWord
        })
      }
      toast.success('Update người dùng thành công!')
    }
    await handleGetData()
    setOpenDrawer(false)
    setDataEdit(undefined)
    form.resetFields()
  }
  
  const dataSource = dataRoles?.reverse()?.map((items, index) => {
    return {
      stt: index + 1,
      key: items.id,
      name: items.userName,
      avatar: items.avatar,
      email: items.email,
      address: items.address,
      phone: items.phone,
      roleName: items.roleName
    }
  })
  const handleGetUser = (id: string) => {
    const user = dataRoles?.find((item) => item.id == id)
    user ? setDataEdit(user) : toast.error('Không tìm thấy người dùng')
    setOpenDrawer(true)
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    // {
    //   title: 'Avatar',
    //   dataIndex: 'avatar',
    //   key: 'avatar'
    // },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address'
    // },
    {
      title: 'RoleName',
      dataIndex: 'roleName',
      key: 'roleName'
    },

    {
      render: (data: any) => {
        return (
          <div className='space-x-5'>
            <Button
              onClick={() => {
                handleGetUser(data.key)
              }}
            >
              Edit
            </Button>
            <Button
              disabled={data.roleName == 'admin'}
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  await deleteCaller(`/User/${data.key}`)
                  await handleGetData()
                }
              }}
            >
              Delete
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <>
      <Breadcrumb
        pageName='Người dùng'
        openDrawer={() => {
          setOpenDrawer(true)
          setDataEdit(undefined)
        }}
      />
      <div className='flex justify-between'>
        <TitlePage title='Quản lý khách hàng' />
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} người dùng`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <UserCreate form={form} dataUser={dataEdit} onFinish={onFinish} />
      </Drawer>
    </>
  )
}
