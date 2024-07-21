import { ICommentators, IReqCommentators } from '@/models/type';
import { Button, Form, FormInstance, Input } from 'antd';
import { useEffect } from 'react';

interface Props {
  dataUser?: ICommentators;
  form: FormInstance<IReqCommentators>;
  onFinish: (values: any) => Promise<void>;
}
const CommentatorsCreate = ({ dataUser, onFinish, form }: Props) => {
  useEffect(() => {
    if (dataUser && dataUser._id) {
      form.setFieldsValue(dataUser);
    } else {
      form.resetFields();
    }
  }, [form, dataUser]);

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
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Nick Name" name="nickName" rules={[{ required: true, message: 'Please input your nickName!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: 'Please input your phone!' },
            {
              pattern: /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
              message: 'Errol format phone number!',
            },
          ]}
          normalize={(value) => value.trim()}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="passWord"
          rules={[
            { required: !dataUser ? true : false, message: 'Please input your Password!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=*])(?!.*\s).{8,32}$/,
              message: 'Password 8-32 charactor have number and string, chữ thường, chữ in hoa và ký tự đặc biệt.',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentatorsCreate;
