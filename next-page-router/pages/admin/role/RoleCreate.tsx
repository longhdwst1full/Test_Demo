import { IRole } from '@/models/type';
import { Button, Form, FormInstance, Input } from 'antd';
import { useEffect } from 'react';

interface Props {
  dataEdit?: IRole;
  form: FormInstance<any>;
  onFinish: (values: any) => Promise<void>;
}

export default function RoleCreate({ dataEdit, onFinish, form }: Props) {
  useEffect(() => {
    if (dataEdit && dataEdit._id) {
      form.setFieldValue('roleName', dataEdit.roleName);
    } else {
      form.resetFields();
    }
  }, [form, dataEdit]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Role Name" name="roleName" rules={[{ required: true, message: 'This is required!' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className="bg-blue-600" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
