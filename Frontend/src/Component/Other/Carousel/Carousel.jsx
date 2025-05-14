import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Register Swiper modules for v8
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Carousel() {
  const navigate = useNavigate();

  const images = [
    { src: "slideimg1.png", path: "/plants/pottedplants" },
    { src: "slideimg2.png", path: "/plants/flowerplants" },
    { src: "slideimg3.png", path: "/plants/indoorplants" },
  ];

  return (
    <div className="relative w-full mx-auto h-[450px]">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex justify-center items-center">
              {/* Blurred Background Image */}
              <img
                src={image.src}
                alt={`background-${index}`}
                className="absolute z-0 blur-[2px] scale-[1.45] pointer-events-none"
                style={{ height: "300px", width: "auto" }}
              />

              {/* Foreground Image */}
              <img
                src={image.src}
                alt={`slide-${index}`}
                onClick={() => navigate(image.path)}
                className="relative z-10 h-[370px] w-auto shadow-md object-cover cursor-pointer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
