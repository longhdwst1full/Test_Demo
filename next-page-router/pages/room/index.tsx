import Footer from '@/commons/component/Footer/Footer';
import Header from '@/commons/component/Header/Header';
import Link from 'next/link';
import React from 'react';
import Marquee from 'react-fast-marquee';

export default function Room() {
  return (
    <div>
      <div
        className="bg-header-image"
        style={{
          backgroundImage: "url('../bg.png')",
        }}
      >
        <Header />
        <div className="container m-auto pt-28">
          <div className="h-6 bg-[#10223d] rounded-md  text-white">
            <Marquee>Link đang chạy</Marquee>
          </div>
          <div className="grid grid-cols-11 w-full rounded bg-black">
            <div className="col-span-8">
              <iframe
                className="object-cover h-full w-full"
                src="https://www.youtube.com/embed/nrRxp8jqE4c?si=g1Ndzjpf7iGtka_C"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="col-span-3 ml-1">
              <div className="grid grid-cols-1 grid-rows-4 gap-2 mx-1 my-1.5 rounded bg-white">

                {/* <div className='flex justify-start gap-x-1 p-3  '> */}

                <p className='p-3.5'>

                  <img className="w-4 h-4 object-cover" src="https://sta.vnres.co/web/assets/soco/img/icon-announcement@2x.png" alt="" />
                  <span className='font-medium'>
                    Thông báo:
                  </span>
                  Đến với live của Thạch Tú là ae sẽ bú nhé
                </p>
                {/* </div> */}

                {/* tab */}
                <div className="tab">
                  <div className="tab-item tab-active" data-id="0">
                    <span i18n-text="聊天室">Phòng trò chuyện</span>
                  </div>
                  <div className="tab-item" data-id="1">
                    <span i18n-text="排行榜">Bảng xếp hạng</span>
                  </div>
                </div>
                {/*  */}

                <div className="chat-center h-[264.156px]"><div className="chat-panel" id="talkScroll">
                  
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* body*/}
      <div className="container m-auto">
        <h2 className='my-3 py-2 font-medium text-xl'>Đề xuất video</h2>

        {/*  */}
        <div className="mt-5 grid grid-cols-4 grid-rows-3 gap-5">
          {Array(10)
            .fill(0)
            .map((_, i) => {
              return (
                <Link key={i} href="" className="relative hover-iconPlay">
                  <div className="mask" />
                  <img
                    className="object-cover w-full"
                    src="https://png.pngtree.com/element_our/png_detail/20181108/little-boy-sit-studying-png_232197.jpg"
                  />
                  <div className="live-mask" />
                  <i className="btn-open" />
                  <div className="absolute top-2.5 scale-[1] right-0 mr-3">
                    <div className="h-[18px] bg-[#fa3434]   px-2 py-2 flex gap-1 justify-center items-center">
                      <img className="h-2.5 w-full" src="./living.gif" />
                      <span className="text-white">Live</span>
                    </div>
                  </div>
                  <div className="absolute bottom-12 z-10 font-normal w-full text-white tracking-wide bg-custom-gradient flex justify-between px-2  items-center">
                    <span className="">BLV DUSTIN</span>
                    <p className="flex">
                      <img className="w-4 mr-0.5 object-cover" src="./icon-hot-white.webp" />
                      <span className="">26.94k</span>
                    </p>
                  </div>
                  <h4 className="bg-white h-10 font-normal px-3.5  rounded-b-lg text-black">NZBL: Nelson Giants vs Otago Nuggets</h4>
                </Link>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
