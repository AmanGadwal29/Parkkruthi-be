import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Register Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Carousel() {
  const navigate = useNavigate();

  const images = [
    { src: "slideimg1.png", path: "/plants/category/pottedplants" },
    { src: "slideimg2.png", path: "/plants/category/flowerplants" },
    { src: "slideimg3.png", path: "/plants/category/indoorplants" },
  ];

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] mx-auto">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="h-full !pb-5"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex justify-center items-center">
              {/* Blurred Background Image */}
              <img
                src={image.src}
                alt={`background-${index}`}
                className="absolute z-0 blur-[10px] w-full h-full object-cover scale-105 pointer-events-none"
              />

              {/* Foreground Image */}
              <img
                src={image.src}
                alt={`slide-${index}`}
                onClick={() => navigate(image.path)}
                className="relative z-10 max-w-full max-h-full object-contain rounded-lg shadow-md cursor-pointer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
