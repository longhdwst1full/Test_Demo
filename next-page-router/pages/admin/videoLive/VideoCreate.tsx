import { useSevices } from '@/hook/useServices/useSevices';
import { ICommentators, IResData, IResVideoLive } from '@/models/type';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, DatePickerProps, Form, FormInstance, GetProps, Input, message, Select, Space, Upload } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

interface Props {
  dataUser?: IResVideoLive;
  form: FormInstance<any>;
  onFinish: (values: any) => Promise<void>;
}
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const fomartTime = 'YYYY-MM-DD HH:mm:ss';
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
      form.setFieldValue(
        'commentators',
        dataUser.commentators.map((item) => item._id),
      );
      form.setFieldValue('timeLive', [dayjs(dataUser.liveStartTime), dayjs(dataUser.liveEndTime)]);
    } else {
      form.resetFields();
    }
  }, [form, dataUser]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    if (Array.isArray(value)) {
      form.setFieldsValue({ timeLive: value });
    }
  };
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({ isLive: e.target.checked });
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    let newFileList = [...info.fileList];
    // Only show the last uploaded file
    newFileList = newFileList.slice(-1);
    form.setFieldsValue({ imageThumbnailUrl: newFileList });
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

        <Form.Item label="liveEndTime" name="timeLive" rules={[{ required: true, message: 'Please input your liveEndTime!' }]}>
          <RangePicker showTime={{ format: 'HH:mm:ss' }} format={fomartTime} onOk={onOk} />
        </Form.Item>

        <Form.Item label="urlVideoLive" name="urlVideoLive" rules={[{ required: true, message: 'Please input your urlVideoLive!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="imageThumbnailUrl"
          name="imageThumbnailUrl"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          rules={[{ required: true, message: 'Please input your imageThumbnailUrl!' }]}
        >
          <Upload listType="picture" maxCount={1} beforeUpload={beforeUpload} onChange={handleUploadChange}>
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
          {form.getFieldValue('imageThumbnailUrl') ? (
            <img src={form.getFieldValue('imageThumbnailUrl')[0].thumbUrl} />
          ) : (
            dataUser?.imageThumbnailUrl && <img src={`http://localhost:5000/uploads/${dataUser.imageThumbnailUrl}`} />
          )}
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

        <Form.Item label="isLive" name="isLive" valuePropName="checked">
          <Checkbox defaultChecked={false} onChange={handleCheckboxChange} />
        </Form.Item>

        <Form.Item label="description" name="description" rules={[{ required: true, message: 'Please input your description!' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VideoCreate;
