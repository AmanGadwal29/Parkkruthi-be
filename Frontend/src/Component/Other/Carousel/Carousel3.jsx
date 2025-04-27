import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlantCard from "../../../Plants/PlantsCard";

const Carousel3 = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_API_URL;

  const swiperRef = React.useRef(null); 

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/plants`);
        setCardsData(response.data.payload);
        if (response.data.success) {
          setCardsData(response.data.payload);
        } else {
          setError('Failed to fetch data');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, [apiURL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  

  return (
    <div className="relative w-full py-12">
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView="auto"
        centeredSlides={false}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        grabCursor={true}
      >
        {cardsData.map((plant) => (
          <SwiperSlide className='mb-4' key={plant._id}>
            <PlantCard
              name={plant.Title}
              price={plant.Price}
              originalPrice={plant?.originalPrice}
              image={plant.Image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div 
        className="absolute shadow-md left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer  bg-white ml-5 rounded-lg bg-opacity-55 hover:bg-opacity-75"
        onClick={handlePrev}
      >
        <ChevronLeft size={40} weight="bold" />
      </div>
      <div 
        className="absolute shadow-md right-2 top-1/2 -translate-y-1/2 z-10 bg-white mr-5 rounded-lg bg-opacity-55 hover:bg-opacity-75 cursor-pointer"
        onClick={handleNext}
      >
        <ChevronRight size={40} weight="bold" />
      </div>
    </div>
  );
};

export default Carousel3;
