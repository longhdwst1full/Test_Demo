import { setAuthData } from '@/hook/token';
import { useSevices } from '@/hook/useServices/useSevices';
import { LoginSchema, RegiseterSchema } from '@/utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoginModal from '../LoginModal/LoginModal';

const Header = () => {
  const param = useParams();
  const router = useRouter();
  const { chatId } = router.query;
  const [isAuthReq, setIsAuthReq] = useState('login');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [background, setBackground] = useState(false);
  const { postCaller } = useSevices();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isAuthReq == 'login' ? LoginSchema : RegiseterSchema),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const handleSubmitForm = handleSubmit((data: any) => {
    if (isAuthReq == 'login') {
      postCaller('/auth/login', {
        ...data,
      }).then(async (data: any) => {
        if (!data) return false;

        setAuthData(data.data);
        alert('Login successfully');
      });
    } else if (isAuthReq == 'register') {
      postCaller('/auth/register', {
        ...data,
      }).then(async (data: any) => {
        if (!data) return false;

        setAuthData(data.data);
        alert('Regiseter successfully');
      });
    }

    reset();
    setIsAuthReq('');
    setIsModalOpen(false);
  });

  const handleGetForm = (data: string) => {
    setIsAuthReq(data);
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
                <Link
                  onClick={() => {
                    setIsAuthReq('login');
                    showModal();
                  }}
                  href={'#'}
                >
                  Đăng nhập
                </Link>
                <span className=" ">|</span>
                <Link
                  onClick={() => {
                    setIsAuthReq('register');
                    showModal();
                  }}
                  href={'#'}
                >
                  Đăng kí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        handleGetForm={handleGetForm}
        isAuthReq={isAuthReq}
        register={register}
        errors={errors}
        handleSubmitForm={handleSubmitForm}
      />
    </>
  );
};
export default memo(Header);
