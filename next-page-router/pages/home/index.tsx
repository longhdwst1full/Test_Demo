import Footer from '@/commons/component/Footer/Footer';
import Header from '@/commons/component/Header/Header';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

export default function Page() {
  const dataVideo = [
    {
      link: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
      urlImage: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
    },
    {
      link: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
      urlImage: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
    },
    {
      link: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
      urlImage: '',
    },
    {
      link: '',
      urlImage: '',
    },
  ];

  const menuBody = [
    {
      title: 'Trực tiếp',
      link: '',
    },
    {
      title: 'Toán',
      link: '',
    },
    {
      title: 'Văn',
      link: '',
    },
    {
      title: 'Anh',
      link: '',
    },
    {
      title: 'Lý',
      link: '',
    },
  ];
  const [tabClick, setTabClick] = useState(0);
  return (
    <div className="bg-[#f0f1f6]">
      <div
        className="bg-header-image"
        // style={{
        //   backgroundImage: "url('../bg.png') no-repeat",
        // }}
      >
        <Header />
        <div className="container m-auto pt-28">
          <div className="h-6 bg-[#10223d] rounded-md  text-white">
            <Marquee>Link đang chạy</Marquee>
          </div>
          <div className="grid grid-cols-6 w-full rounded bg-black">
            <div className="col-span-5">
              <iframe
                className="object-cover h-full w-full"
                src="https://www.youtube.com/embed/nrRxp8jqE4c?si=g1Ndzjpf7iGtka_C"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="col-span-1 ml-1">
              <div className="grid grid-cols-1 grid-rows-4 gap-2 mx-1 my-1.5 rounded ">
                {dataVideo.map((item, i) => {
                  return (
                    <div key={i} className="rounded px-1 relative active-icon">
                      <i className={`left-arrow ${i == 0 ? '!block' : ''}`}></i>
                      <iframe
                        className={`border-[1px] h-full w-full rounded  ${i == 0 ? 'border-[#ffc71c]' : ''} hover:border-[#ffc71c]`}
                        src="https://www.youtube.com/embed/nrRxp8jqE4c?si=g1Ndzjpf7iGtka_C"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* body*/}

      <div className="container m-auto ">
        <div className="mt-4 flex items-center">
          <span className="hot-live flex items-center h-12 mr-4">
            <img className="object-cover h-full" src="./hot-live.webp" alt="" />
          </span>
          <ul className="flex gap-x-1">
            {menuBody.map((item, i) => {
              return (
                <li key={i} className={`relative cursor-pointer ${tabClick == i && 'text-xl font-semibold'} px-2 py-0.5 ml-6`}>
                  {item.title}
                  {tabClick == i && <b className="pa"></b>}
                </li>
              );
            })}
          </ul>
        </div>

        {/*  */}
        <div className="mt-5 grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-5">
          {Array(10)
            .fill(0)
            .map((_, i) => {
              return (
                <Link key={i} href="" className="relative hover-iconPlay rounded-t-lg">
                  <div className="mask" />
                  <div className="w-full overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src="https://png.pngtree.com/element_our/png_detail/20181108/little-boy-sit-studying-png_232197.jpg"
                    />
                  </div>
                  <div className="live-mask" />
                  <i className="btn-open" />
                  <div className="absolute top-2.5 scale-[1] right-0 mr-3">
                    <div className="h-[18px] bg-[#fa3434]   px-2 py-2 flex gap-1 justify-center items-center">
                      <img className="h-2.5 w-full" src="./living.gif" />
                      <span className="text-white">Live</span>
                    </div>
                  </div>
                  <div className="absolute bottom-10 z-10 font-normal w-full text-white tracking-wide bg-custom-gradient flex justify-between px-2 items-center pb-2">
                    <span className="">BLV DUSTIN</span>
                    <p className="flex">
                      <img className="w-4 mr-0.5 object-cover" src="./icon-hot-white.webp" />
                      <span className="">26.94k</span>
                    </p>
                  </div>
                  <h4 className="bg-white h-10 font-normal px-3.5 py-1  rounded-b-lg text-black">NZBL: Nelson Giants vs Otago Nuggets</h4>
                </Link>
              );
            })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
