import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../../../Products/ProductCard';

const ProductCardSkeleton = () => (
  <div className="w-[90%] max-w-[300px] rounded-2xl overflow-hidden bg-white border shadow-sm shimmer my-2">
    <div className="h-[200px] bg-gray-300 w-full rounded-t-2xl" />
    <div className="p-4 space-y-2">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="flex justify-between items-center mt-3">
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-6 w-14 bg-gray-200 rounded" />
      </div>
      <div className="h-10 bg-gray-200 rounded w-full mt-3" />
    </div>
  </div>
);

const Carousel3 = () => {
  const [plants, setPlants] = useState([]);
  const swiperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const PRODUCTS_API = import.meta.env.VITE_PRODUCTS_API;

  const fetchPlants = async () => {
    try {
      const { data } = await axios.get(`${PRODUCTS_API}/plants`);
      if (data.status === 'Success') {
        setPlants(data.data.finalPayload);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [PRODUCTS_API]);

  const shimmerStyle = `
    .shimmer {
      position: relative;
      overflow: hidden;
      background: #f6f7f8;
      background-image: linear-gradient(90deg, #f6f7f8 0px, #edeef1 40px, #f6f7f8 80px);
      background-size: 600px 100%;
      animation: shimmer 1.5s infinite linear;
    }
    @keyframes shimmer {
      0% { background-position: -600px 0; }
      100% { background-position: 600px 0; }
    }
  `;

  if (error) {
    return <div className="text-center text-red-600 py-10 text-lg">{error}</div>;
  }

  return (
    <>
      <style>{shimmerStyle}</style>

      <section className="relative w-full bg-[#f7eded] py-16 px-4 sm:px-8 lg:px-16 font-sans">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1B3C2E] tracking-wide mb-4 leading-snug">
          Explore Our Green Collection
        </h2>
        <p className="text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal">
          Discover a curated selection of healthy plants and gardening essentials delivered with care.
        </p>


        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={3}
          loop={false}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
              <SwiperSlide key={idx} className="flex justify-center items-center pt-4 pb-16">
                <ProductCardSkeleton />
              </SwiperSlide>
            ))
            : plants.map((plant) => (
              <SwiperSlide key={plant?._id} className="flex justify-center items-center pt-4 pb-16">
                <ProductCard
                  id={plant?._id}
                  title={plant?.Title}
                  price={plant?.Price}
                  originalPrice={plant?.originalPrice}
                  imageURL={plant?.ImageURL[0]}
                  stocks={plant?.Stocks}
                  description={plant?.Description}
                />
              </SwiperSlide>
            ))}
        </Swiper>

        {!loading && (
          <>
            <button
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
                bg-gradient-to-br from-green-600 to-green-400 hover:from-green-700 hover:to-green-500
                text-white p-3 rounded-full shadow-lg transition-transform hover:shadow-xl"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
                bg-gradient-to-bl from-green-600 to-green-400 hover:from-green-700 hover:to-green-500
                text-white p-3 rounded-full shadow-lg transition-transform hover:shadow-xl"
              aria-label="Next Slide"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}
      </section>
    </>
  );
};

export default Carousel3;
