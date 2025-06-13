import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

// Register Swiper modules
SwiperCore.use([Autoplay]);

const testimonials = [
  {
    client_name: "Akshitha S Ratheesh",
    desc: "Had an amazing shopping experience with multiple orders delivered in a day. Looking forward to buying more.",
    stars: 5,
  },
  {
    client_name: "Shaurya Rathi",
    desc: "Ordered 17 types of flower plants and seeds. Delivery was quick and packaging excellent. Plants arrived healthy and as described.",
    stars: 4,
  },
  {
    client_name: "Seema Thapiyal",
    desc: "Appreciates the convenience and quality. Enjoys pursuing her gardening hobby thanks to Urvann.",
    stars: 5,
  },
  {
    client_name: "Rohit Koul",
    desc: "Very satisfied with the wide variety and quality of products. Delivery service is also impressive.",
    stars: 4,
  },
  {
    client_name: "Madhu Bala",
    desc: "Loves the freshness and condition of delivered plants. Found the entire process smooth and hassle-free.",
    stars: 5,
  },
  {
    client_name: "Rakhi Rastogi",
    desc: "Found Urvann reliable with affordable prices. Appreciates the packaging and healthy plants.",
    stars: 3,
  },
];

const renderStars = (count) => {
  const total = 5;
  return (
    <div className="flex text-[#2C6D31] text-lg mb-2">
      {[...Array(total)].map((_, i) => (
        <span key={i}>{i < count ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

function Testimonials() {
  return (
    <section className="w-full bg-[#f5f7f5] pt-6 pb-16 px-4 sm:px-8 lg:px-16 font-sans">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1B3C2E] tracking-wide mb-4 leading-snug">
        What Our Gardeners Say
      </h2>
      <p className="text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal">
        Real stories from happy gardeners who trusted us to green their spaces.
      </p>

      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={24}
        className="!pb-6"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <div className="w-full max-w-sm min-h-[250px] bg-white border border-[#E6F4EA] rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between gap-4">
                <div>
                  {renderStars(item.stars)}
                  <p className="text-gray-700 text-base leading-relaxed italic line-clamp-4 mt-2">
                    “{item.desc}”
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-[#2C6D31] text-white flex items-center justify-center font-semibold text-sm uppercase">
                    {item.client_name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-[#2C6D31]">
                    {item.client_name}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Testimonials;
