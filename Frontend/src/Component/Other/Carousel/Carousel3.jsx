import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PlantCard from '../../../Plants/PlantsCard';

const Carousel3 = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PRODUCTS_API = import.meta.env.VITE_PRODUCTS_API;
  const swiperRef = useRef(null);

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

  

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  console.log(plants);
  

  return (
    <section className="relative w-full bg-[#f5f5f5] py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-green-800 mb-8">
        Explore Our Green Collection
      </h2>

      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={3}
        loop={false}
        grabCursor={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
      >

        {plants.map((plant) => (
          <SwiperSlide key={plant._id} className="mb-6 flex overflow-visible justify-center items-center">
            <PlantCard
              title={plant.Title}
              price={plant.Price}
              originalPrice={plant?.originalPrice}
              imageURL={plant.ImageURL}
              stocks={plant.Stocks}
              description={plant.Description}
            />

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      {/* Left Navigation Button */}
      <button
        onClick={() => swiperRef.current.swiper.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
             bg-gradient-to-br from-green-600 to-green-400 hover:bg-gradient-to-tl active:bg-gradient-to-t active:from-green-600 active:to-green-600 hover:from-green-600 hover:to-green-400
             text-white p-3 rounded-full shadow-lg transition-transform 
             hover:shadow-xl"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={() => swiperRef.current.swiper.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
             bg-gradient-to-bl from-green-600 to-green-400 hover:bg-gradient-to-tr active:bg-gradient-to-t active:from-green-600 active:to-green-600 hover:from-green-600 hover:to-green-400
             text-white p-3 rounded-full shadow-lg transition-transform 
             hover:shadow-xl"
        aria-label="Next Slide"
      >
        <ChevronRight size={32} />
      </button>

    </section>
  );
};

export default Carousel3;
