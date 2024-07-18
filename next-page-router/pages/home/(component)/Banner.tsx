import React from 'react';
import Slider from 'react-slick';

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={`${className}  w-10 h-10 -right-10 `} style={{ ...style, display: 'block' }} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={`${className}  w-10 h-10 -left-12 `} style={{ ...style, display: 'block' }} onClick={onClick} />;
}
export default function Banner() {
  const settings = {
    className: '!w-auto m-auto text-center px-3',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="slider-container w-[90%] m-auto">
      <Slider {...settings}>
        <div className="!rounded-full !w-40 !h-4w-40 overflow-hidden ">
          <img className="object-cover w-full h-full" src="https://sta.vnres.co/file/pic/202201/04/0b8fba6a9be73ec9edad44bc4c9b0166" />
        </div>
        <div className="!rounded-full !w-40 !h-4w-40 overflow-hidden ">
          <img className="object-cover w-full h-full" src="https://sta.vnres.co/file/pic/202201/04/0b8fba6a9be73ec9edad44bc4c9b0166" />
        </div>
        <div className="!rounded-full !w-40 !h-4w-40 overflow-hidden ">
          <img className="object-cover w-full h-full" src="https://sta.vnres.co/file/pic/202201/04/0b8fba6a9be73ec9edad44bc4c9b0166" />
        </div>
        <div className="!rounded-full !w-40 !h-4w-40 overflow-hidden ">
          <img className="object-cover w-full h-full" src="https://sta.vnres.co/file/pic/202201/04/0b8fba6a9be73ec9edad44bc4c9b0166" />
        </div>
        <div className="!rounded-full !w-40 !h-4w-40 overflow-hidden ">
          <img className="object-cover w-full h-full" src="https://sta.vnres.co/file/pic/202201/04/0b8fba6a9be73ec9edad44bc4c9b0166" />
        </div>
        <div className="!rounded-full !w-40 !h-4w-40 overflow-hidden ">
          <img className="object-cover w-full h-full" src="https://sta.vnres.co/file/pic/202201/04/0b8fba6a9be73ec9edad44bc4c9b0166" />
        </div>
        <div className="!rounded-full !w-40 !h-4w-40 overflow-hidden ">
          <img className="object-cover w-full h-full" src="https://sta.vnres.co/file/pic/202201/04/0b8fba6a9be73ec9edad44bc4c9b0166" />
        </div>
        <div className="!rounded-full !w-40 !h-4w-40 overflow-hidden ">
          <img className="object-cover w-full h-full" src="https://sta.vnres.co/file/pic/202201/04/0b8fba6a9be73ec9edad44bc4c9b0166" />
        </div>
      </Slider>
    </div>
  );
}
