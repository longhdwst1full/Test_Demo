import Link from 'next/link';
import React from 'react';

const VideoItem = ({ isLive = true }: any) => {
  return (
    <Link href="" className="hover-iconPlay bg-white rounded-lg overflow-hidden">
      <img
        className="object-cover w-full"
        src="https://png.pngtree.com/element_our/png_detail/20181108/little-boy-sit-studying-png_232197.jpg"
      />
      <div className="live-mask" />
      <i className="btn-open" />
      {isLive && (
        <div className="absolute top-2.5 scale-[1] right-0 mr-3">
          <div className="h-[18px] bg-[#fa3434]   px-2 py-2 flex gap-1 justify-center items-center">
            <img className="h-2.5 w-full" src="./living.gif" />
            <span className="text-white">Live</span>
          </div>
        </div>
      )}

      <h4 className=" h-10 font-normal px-3.5  rounded-b-lg text-black">NZBL: Nelson Giants vs Otago Nuggets</h4>
      <div className="font-normal w-full flex justify-between items-center py-1 text-[#777] px-3 pb-1 mb-1">
        <div className=" flex items-center">
          <img
            className="object-cover w-6 h-6 mr-1 rounded-full"
            src="https://png.pngtree.com/element_our/png_detail/20181108/little-boy-sit-studying-png_232197.jpg"
          />
          <span className=""> DUSTIN</span>
        </div>
        <p className="flex">
          <img className="w-4 mr-1 object-cover" src="./icon-hot-gray.webp" />
          <span className="">26.94k</span>
        </p>
      </div>
    </Link>
  );
};

export default React.memo(VideoItem);
