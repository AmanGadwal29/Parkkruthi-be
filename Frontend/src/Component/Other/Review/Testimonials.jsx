import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper"; // ✅ Correct for Swiper v8
import "swiper/css";

// Register autoplay module
SwiperCore.use([Autoplay]);

function Testimonials() {
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
    const totalStars = 5;
    return (
      <div className="text-[#2C6D31] text-2xl">
        {[...Array(totalStars)].map((_, i) =>
          i < count ? <span key={i}>★</span> : <span key={i}>☆</span>
        )}
      </div>
    );
  };

  return (
    <div className="mx-2 pt-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">CLIENT SAYS</h1>
      <div className="pt-10 pb-10 px-4">
        <Swiper
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="!py-2"
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center">
                <div className="w-[320px] h-56 bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex">{renderStars(testimonial.stars)}</div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      “{testimonial.desc}”
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-9 h-9 rounded-full bg-[#3D4152] text-white flex items-center justify-center font-semibold text-sm">
                      {testimonial.client_name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-[#3D4152]">
                      {testimonial.client_name}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonials;
