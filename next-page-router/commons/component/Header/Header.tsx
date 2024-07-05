import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function Header() {
  const param = useParams();
  console.log(param, '::::');
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

  const [selected, setSelected] = useState(0);

  return (
    <div className="fixed z-40 top-0 right-0 left-0">
      <div className="container m-auto bg-slate-600/30">
        {/* header */}
        <div className="flex justify-between items-center">
          <div className="flex-1 flex items-center">
            <div className="w-16 py-2 overflow-hidden mr-4">
              <img className=" w-full object-cover" src="./logo.webp" alt="" />
            </div>
            {/* nav */}
            <div className="flex items-center text-white">
              {navHeader.map((item, i) => (
                <li
                  className={`list-none mx-1 rounded cursor-pointer px-1 py-2 text-[18px] ${
                    selected == i ? 'bg-[#f8c21b]' : ''
                  } hover:bg-[#f8c21b]`}
                  key={item.title}
                >
                  <Link onClick={() => setSelected(i)} href={item.link} className="block">
                    {item.title}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          <div className="flex gap-x-1 p-2">
            <Link className="text-[#f8c21b] mr-5" href={'#'}>
              Ứng tuyển BLV
            </Link>

            <div className="flex gap-1 text-white">
              <Link href={'#'}>Đăng nhập</Link>
              <span className=" ">|</span>
              <Link href={'#'}>Đăng kí </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
