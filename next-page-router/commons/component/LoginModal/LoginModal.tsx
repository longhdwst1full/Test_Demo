import { Login, Register } from '@/utils/validate';
import { Modal, Select } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { FieldErrors } from 'react-hook-form';

type FormErrors<T extends string> = T extends 'Login' ? FieldErrors<Login> : FieldErrors<Register>;

interface Props<T extends string> {
  isAuthReq: T;
  handleSubmitForm: (e?: BaseSyntheticEvent) => Promise<void>;
  register: any;
  handleGetForm: (data: string) => void;
  errors: FormErrors<T>;
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const { Option } = Select;
export default function LoginModal({
  isModalOpen,
  onOk,
  onCancel,
  handleGetForm,
  isAuthReq,
  handleSubmitForm,
  register,
  errors,
}: Props<string>) {
  const [dataNumber, setDataNumber] = useState<{ code: string; name: string }[]>([]);
  const handleGetPhoneList = async () => {
    const { data } = await axios.get('/api/phoneCode');
    console.log(data);
    setDataNumber(data);
  };
  useEffect(() => {
    handleGetPhoneList();
  }, []);
  const selectBefore = (
    <Select defaultValue="+84" style={{ width: 70 }}>
      {dataNumber?.map((item) => (
        <Option key={item.code} value={item.code}>
          <ul className="flex justify-between w-[200px]">
            <li>{item.name}</li>
            <li>{item.code}</li>
          </ul>
        </Option>
      ))}
    </Select>
  );

  return (
    <Modal open={isModalOpen} onOk={onOk} onCancel={onCancel} footer={false}>
      {/* Modal header */}
      <div className="flex items-center justify-center p-1 md:p-3 rounded-t  ">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white"> {isAuthReq === 'login' ? 'Login' : 'Register'}</h3>
      </div>
      {/* Modal body */}
      <div className="p-2 md:p-3">
        <form className="space-y-4" onSubmit={handleSubmitForm}>
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Nhập số điện thoại"
              {...register('phone')}
            />
            {errors?.phone && <span className="text-red-500 text-[13px] self-start">{errors.phone?.message}</span>}
          </div>
          {/* <Input addonBefore={selectBefore} /> */}
          {isAuthReq == 'register' && (
            <div>
              <input
                type="text"
                placeholder="Nhập nickname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                {...register('nickname')}
              />

              {errors.nickname && <span className="text-red-500 text-[13px] self-start">{errors?.nickname?.message}</span>}
            </div>
          )}

          <div>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...register('passWord')}
            />

            {errors.passWord && <span className="text-red-500 text-[13px] self-start">{errors.passWord.message}</span>}
          </div>
          {isAuthReq == 'register' && (
            <div>
              <input
                type="password"
                placeholder="Nhập lai mật khẩu"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                {...register('confirmpassword')}
              />

              {errors?.confirmpassword && <span className="text-red-500 text-[13px] self-start">{errors.confirmpassword.message}</span>}
            </div>
          )}
          {isAuthReq === 'login' && (
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isAuthReq === 'login' ? 'Login' : 'Register'}
          </button>
          {isAuthReq === 'login' ? (
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?
              <Link href="#" onClick={() => handleGetForm('register')} className="text-blue-700 hover:underline dark:text-blue-500">
                Create account
              </Link>
            </div>
          ) : (
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              is you have account{' '}
              <Link href="#" onClick={() => handleGetForm('login')} className="text-blue-700 hover:underline dark:text-blue-500">
                Login
              </Link>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
}
