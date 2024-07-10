import Footer from '@/commons/component/Footer/Footer';
import Header from '@/commons/component/Header/Header';
import { ClientSocket, socket } from '@/commons/socket/socket';
import { getAuthLocalData } from '@/hook/token';
import { useSevices } from '@/hook/useSevices';
import { IDataRes, IMessageLiveChatRoom } from '@/module/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

export default function Room() {
  const { postCaller, getCaller } = useSevices();
  const [getAllChat, setGetAllChat] = useState<IMessageLiveChatRoom[]>([]);
  const [content, setContent] = useState<string>('');
  const user = getAuthLocalData();
  const roomId = 'd7fac35d-7fc4-4f08-8c54-cea6c82d0a4e';
  useEffect(() => {
    if (user?.userId && roomId) {
      socket.on('receiveMessage', (data) => {
        setGetAllChat(data.payload.data);
      });
      ClientSocket.JoinRoom({ room: roomId, userId: user?.userId });
    }
    return () => {
      socket.emit('leaveRoom', { room: roomId });
      socket.off();
      ClientSocket.Disconnect();
    };
  }, [roomId]);

  const handleGetAllChat = async () => {
    try {
      const { data } = await getCaller<IDataRes<IMessageLiveChatRoom[]>>(
        'chat-message/getallByRoomId/d7fac35d-7fc4-4f08-8c54-cea6c82d0a4e',
      );

      if (data) {
        setGetAllChat(data?.payload?.data || []);
      }
    } catch (error) {
      alert(error);
    }
  };

  // create chat
  const handleCreateChat = () => {
    if (!user) {
      return alert('user not found');
    }
    const dataBody = {
      user: user?.userId,
      message: content,
      roomchat: roomId,
    };
    ClientSocket.sendMessage({ ...dataBody, chatRoom: dataBody.roomchat });

    setContent('');
    socket.on('receiveMessage', (data) => {
      setGetAllChat(data.payload.data);
    });
  };

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
              <video autoPlay controls className="video-container ">
                <source src="https://getstream.io/downloads/react_example-gaming_livestream.mp4" />
              </video>
            </div>
            <div className="col-span-3 ml-1">
              <div className="mx-1 my-1.5 rounded h-full overflow-hidden bg-white relative flex flex-col">
                <p className="p-3.5 leading-[18px] break-words">
                  <img
                    className="absolute w-4 h-4 object-cover top-4 ml-2"
                    src="https://sta.vnres.co/web/assets/soco/img/icon-announcement@2x.png"
                    alt=""
                  />
                  <span className="ml-8">
                    <span className="font-medium inline-block mr-1">Thông báo:</span>
                    Đến với live của Đến với live của Đến với live của Đến với live của
                  </span>
                </p>

                {/* tab */}
                <div className="tab">
                  <div className="tab-item tab-active">
                    <span>Phòng trò chuyện</span>
                  </div>
                  <div className="tab-item" data-id="1">
                    <span>Bảng xếp hạng</span>
                  </div>
                </div>
                {/*  */}

                <div className=" overflow-y-auto flex-1  ">
                  <div className="overflow-y-auto h-[499px] ">
                    {getAllChat &&
                      getAllChat.map((item, i) => (
                        <div key={i} className="px-2 py-1 bg-[#f4f4f4] cursor-pointer ">
                          <div className="break-all px-1 py-1 text-base !leading-3 ">
                            <span className="font-semibold">{item?.user?.nickname} :</span>
                            <span className="ml-1 font-normal ">{item?.message}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="p-3">
                  <div className=" flex mb-2 border-[1px] overflow-hidden rounded border-[#d8d8d8]">
                    <input
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={(e) => (e.key === 'Enter' ? handleCreateChat() : null)}
                      className="flex-1 p-1.5 "
                    />
                    <button onClick={handleCreateChat} className="bg-[#e5e5e5] py-3 px-6">
                      Gửi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* body*/}
      <div className="container m-auto">
        <h2 className="my-3 py-2 font-medium text-xl">Đề xuất video</h2>

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

      {/*  */}
    </div>
  );
}
