import { useSevices } from '@/hook/useServices/useSevices';
import { ICommentators, IResData, IResVideoLive } from '@/models/type';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, DatePickerProps, Form, FormInstance, GetProps, Input, Select, Space, Upload } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
  dataUser?: IResVideoLive;
  form: FormInstance<any>;
  onFinish: (values: any) => Promise<void>;
}
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const VideoCreate = ({ dataUser, onFinish, form }: Props) => {
  const [commentators, setCommentators] = useState<ICommentators[]>();
  const { RangePicker } = DatePicker;
  const { getCaller } = useSevices();

  useEffect(() => {
    const handelGetIdService = async () => {
      const { data } = await getCaller<IResData<ICommentators[]>>('/commentators/getAll');
      if (data.payload) {
        setCommentators(data.payload.data);
      }
    };
    handelGetIdService();
  }, []);

  useEffect(() => {
    if (dataUser && dataUser._id) {
      form.setFieldsValue(dataUser);
      form.setFieldValue('commentators', dataUser.commentators);
    } else {
      form.resetFields();
    }
  }, [form, dataUser]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
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
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>

        {/* <Form.Item
          label="liveStartTime"
          name="liveStartTime"
          rules={[{ required: true, message: 'Please input your liveStartTime!' }]}
        ></Form.Item> */}

        <Form.Item label="liveEndTime" name="liveEndTime" rules={[{ required: true, message: 'Please input your liveEndTime!' }]}>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={(value, dateString) => {
              console.log('Selected Time: ', value);
              console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="urlVideoLive" name="urlVideoLive" rules={[{ required: true, message: 'Please input your urlVideoLive!' }]}>
          {' '}
          <Input />
        </Form.Item>

        <Form.Item
          label="imageThumbnailUrl"
          name="imageThumbnailUrl"
          rules={[{ required: true, message: 'Please input your imageThumbnailUrl!' }]}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Upload action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Space>
        </Form.Item>

        <Form.Item label="commentators" name="commentators" rules={[{ required: true, message: 'Required!' }]}>
          <Select
            placeholder="Search to Select"
            options={commentators?.map((item) => ({
              value: item._id,
              label: item.name,
            }))}
          />
        </Form.Item>

        <Form.Item label="isLive" name="isLive" rules={[{ required: true, message: 'Please input your isLive!' }]}>
          <Checkbox></Checkbox>
        </Form.Item>

        <Form.Item label="description" name="description" rules={[{ required: true, message: 'Please input your description!' }]}>
          <Input />
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

export default VideoCreate;
