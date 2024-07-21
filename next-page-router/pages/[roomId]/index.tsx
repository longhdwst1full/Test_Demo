import { useRouter } from 'next/router';

import Footer from '@/commons/component/Footer/Footer';
import Header from '@/commons/component/Header/Header';
import { ClientSocket } from '@/commons/socket/socket';
import { getAuthLocalData } from '@/hook/token';
import useGetVideoList from '@/hook/useGetVideoList/useGetVideoList';
import { useSocket } from '@/hook/useSocket';
import { IMessageLiveChatRoom } from '@/module/type';
import { ArrowDownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import VideoItem from '../../commons/component/VideoItem';

export default function RoomChat() {
  const router = useRouter();
  const { roomId } = router.query;
  const { videoList } = useGetVideoList();
  const socket = useSocket();
  const [getAllChat, setAllChat] = useState<IMessageLiveChatRoom[]>([]);
  const [content, setContent] = useState<string>('');
  const [showNewMessageIcon, setShowNewMessageIcon] = useState(false);
  const user = getAuthLocalData();
  const messageEl = useRef<any>(null);

  useEffect(() => {
    if (socket && user?.userId && roomId) {
      const handleReceiveMessage = (data: { payload: { data: IMessageLiveChatRoom[] } }) => {
        setAllChat(data.payload.data);
      };

      socket.emit('joinChat', { room: roomId, userId: user.userId });
      socket.on('receiveMessage', handleReceiveMessage);

      return () => {
        socket.emit('leaveRoom', { room: roomId });
        socket.off('receiveMessage', handleReceiveMessage);
        ClientSocket.Disconnect();
      };
    }
  }, [socket, user?.userId, roomId]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event: any) => {
        const { currentTarget: target } = event;

        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [messageEl]);

  const handleScroll = () => {
    if (messageEl.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageEl.current;
      setShowNewMessageIcon(scrollTop + clientHeight <= scrollHeight - 100);
    }
  };

  const handleNewMessageClick = () => {
    messageEl.current.scrollTop = messageEl.current?.scrollHeight;
    setShowNewMessageIcon(false);
  };

  // create chat
  const handleCreateChat = useCallback(() => {
    if (!socket || !user) {
      console.warn('Socket or user not available');
      return;
    }
    if (content == '') {
      return;
    }
    const dataBody = {
      user: user?.userId,
      message: content,
      roomchat: roomId,
    };

    socket.emit('sendMessage', { ...dataBody, chatRoom: dataBody.roomchat });
    setContent('');
  }, [content, roomId, socket, user]);

  return (
    <div className="bg-[#f0f1f6]">
      <div
        className="bg-header-image"
        style={{
          backgroundImage: "url('../bg.png')",
        }}
      >
        <Header />
        <div className="w-[89%] m-auto pt-28">
          <div className="h-6 bg-[#10223d] rounded-md text-white">
            <Marquee>Link đang chạy</Marquee>
          </div>
          <div className="grid grid-cols-11 w-full rounded bg-black">
            <div className="col-span-8 relative">
              <video autoPlay controls className="video-container">
                <source src="https://getstream.io/downloads/react_example-gaming_livestream.mp4" />
              </video>
              <div className="w-full bg-white px-6 py-5 absolute bottom-0 rounded-b-md overflow-hidden h-[100px] flex justify-between mb-2">
                <div className="flex-1">
                  <div>
                    <img
                      className="float-left w-14 h-14 rounded-full mr-3"
                      src="https://sta.vnres.co/file/head/20231110/053fecd105594fbc1bbd33888e39391b_ss300.jpg"
                    />
                  </div>
                  <div className="text flex-1">
                    <p className="text-lg font-semibold mt-1">MEX D1: Club Tijuana vs Chivas Guadalajara</p>
                    <p className="text-msg relative mt-2 text-sm">
                      <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap align-top">BLV CRIS</span>{' '}
                      <span className="room-num text-[#777] mx-2.5">Số phòng:499765</span>{' '}
                      <span className="view-num pl-4 text-[#7777] bg-[url('//sta.vnres.co/web/assets/soco/img/icon-hot-gray.png')] bg-no-repeat bg-left-center bg-[length:14px_auto] ">
                        67088
                      </span>
                      <span
                        className="absolute left-0 -bottom-[17px] pl-[15px] bg-[url('//sta.vnres.co/web/assets/soco/img/mobile.png')] bg-no-repeat bg-[length:11px_16px] bg-left-top text-sm"
                        hidden
                        style={{ display: 'inline' }}
                      ></span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Link href="#" className="min-w-16 rounded-2xl text-white mr-2 font-medium py-1 px-4 leading-10 text-base bg-yellow-400">
                    Follow
                  </Link>{' '}
                  <Link href="" className="get-code">
                    <div className="w-9 h-9 p-1 mx-1 mr-2 overflow-hidden">
                      <img src="//sta.vnres.co/web/assets/soco/img/icon-room-code.png" className="object-cover w-full" />
                    </div>

                    <div className="showBigCode flex flex-col hidden">
                      <b className="arrow-up" />
                      <div>
                        <canvas id="qrCodeCanvas" className="bigCode" height={120} width={120} style={{ height: 120, width: 120 }} />
                      </div>
                      <span>Quét mã</span>
                      <br />
                      <span>Đồng bộ điện thoại xem trực tiếp</span>
                    </div>
                  </Link>
                  <Link href="" className="text-[#777] mr-2 ml-1 inline-block">
                    Phản hồi
                  </Link>
                  <Link href="" className="more">
                    <img src="//sta.vnres.co/web/assets/soco/img/icon-more-down.png" />
                    <div className="more-box hidden">
                      <b className="arrow-up" />
                      <div className="report item" i18n-text="举报">
                        Báo cáo
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-3 ml-1">
              <div className="mx-1 my-1.5 rounded overflow-hidden bg-white relative flex flex-col">
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

                <div className="overflow-hidden flex-1 relative">
                  <div className="overflow-y-auto h-[499px]" onScroll={handleScroll} ref={messageEl}>
                    {getAllChat &&
                      getAllChat.map((item, i) => (
                        <div key={i} className="px-2 py-[1px] bg-[#f4f4f4] cursor-pointer">
                          <div className="break-all px-1 text-base !leading-5">
                            <span className="font-semibold">{item?.user?.nickname} :</span>
                            <span className="ml-1 font-normal">{item?.message}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                  {showNewMessageIcon && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 mb-4 mr-4">
                      <button onClick={handleNewMessageClick} className="bg-blue-500 text-lg text-white p-2 rounded-full">
                        <ArrowDownOutlined />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex mb-2 border-[1px] overflow-hidden rounded border-[#d8d8d8]">
                    <input
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={(e) => (e.key === 'Enter' ? handleCreateChat() : null)}
                      className="flex-1 p-1.5"
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

      {/* body */}
      <div className="container m-auto">
        <h2 className="my-3 py-2 font-medium text-xl">Đề xuất video</h2>

        {/* Video items */}
        <div className="mt-5 grid grid-cols-4 gap-5">
          {videoList?.map((_, i) => {
            return <VideoItem isLive={false} key={i} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
