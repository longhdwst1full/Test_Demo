import { setAuthData } from '@/hook/token';
import { useSevices } from '@/hook/useServices/useSevices';
import { Login, LoginSchema } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Header = () => {
  const param = useParams();
  const router = useRouter();
  const { chatId } = router.query;
  console.log(chatId, '::::');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });

  const navHeader = [
    {
      title: 'Trang chủ',
      link: '',
    },
    {
      title: 'Lịch Trực tiếp',
      link: 'a',
    },
    {
      title: 'Giáo viên',
      link: 'b',
    },
    {
      title: 'Tin tức sự kiện',
      link: 'c',
    },
    {
      title: 'Tải app',
      link: 'd',
    },
  ];
  const [loginModal, setLoginModal] = useState(false);
  const [background, setBackground] = useState(false);
  const { postCaller } = useSevices();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmitForm = (data: Login) => {
    postCaller('/auth/login', {
      ...data,
    }).then(async (data: any) => {
      setLoginModal(false);
      if (!data) return false;

      setAuthData(data.data);
      alert('Đăng nhập thành công');
      reset();
    });
  };

  return (
    <>
      <div className={`fixed z-40 top-0 right-0 left-0   ${background ? 'header scrolled' : 'header'}`}>
        <div className="container m-auto ">
          {/* header */}
          <div className="flex justify-between items-center">
            <div className="flex-1 flex items-center">
              <div className="w-16 py-2 overflow-hidden mr-4">
                <img className=" w-full object-cover" src="./logo.webp" alt="" />
              </div>
              {/* nav */}
              {/* <div className="flex items-center text-white">
              {navHeader.map((item, i) => (
                <li
                  className={`list-none mx-1 rounded cursor-pointer px-1 py-2 text-[18px] ${
                    selected == i ? 'bg-[#f8c21b]' : ''
                  }  hover:bg-[#f8c21b] ${navHeader.length - 1 == i ? 'text-[#f8c21b] hover:!bg-inherit flex item-center relative' : ''} `}
                  key={item.title}
                  >
                  <Link onClick={() => setSelected(i)} href={item.link} className="block">
                    {item.title}
                  </Link>
                  {
                    navHeader.length - 1 == i && (<div className='ml-0.5'>
                      <img src='./hot.webp'/>
                      </div>
                    )
                  }
 
                     <div className={`hidden absolute left-1/2 top-10 transform -translate-x-1/2
   rounded-md text-[#777] cursor-pointer z-10
   text-center download-submenu  ${navHeader.length - 1 == i&& "hover:block"}`}>
                      <div className="p-7 bg-white rounded-md
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, .2);">
                        <img className='object-cover w-full' src="//sta.vnres.co/web/assets/soco/img/code.png?v=20220124"/>
                      </div></div>
                    
                  

                  
                </li>
              ))}
            </div> */}
            </div>

            <div className="flex gap-x-1 p-2 xl:text-lg">
              {/* <Link className="text-[#f8c21b] mr-5" href={'#'}>
              Ứng tuyển BLV
            </Link> */}

              <div className={`flex gap-1  scroll-color ${background ? 'text-[#f8c21b]' : 'text-white'}`}>
                <Link onClick={() => setLoginModal(true)} href={'#'}>
                  Đăng nhập
                </Link>
                <span className=" ">|</span>
                <Link href={'#'}>Đăng kí </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loginModal && (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-[99999999] flex justify-center items-center w-full md:inset-0 h-[100vh]  !bg-[rgba(0,0,0,.7)]">
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Đăng nhập </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
                  <div>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Nhập số điện thoại"
                      {...register('phone')}
                    />
                    {errors.phone && <span className="text-red-500 text-[13px] self-start">{errors.phone.message}</span>}
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      {...register('passWord')}
                    />

                    {errors.passWord && <span className="text-red-500 text-[13px] self-start">{errors.passWord.message}</span>}
                  </div>
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
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login to your account
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{' '}
                    <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                      Create account
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default memo(Header);
