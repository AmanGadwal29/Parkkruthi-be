import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlantCard from "../Carousel2/PlantsCard";

const Carousel3 = () => {
  const plants = [
    { id: 1, name: "Aloe Vera", price: "₹80", originalPrice: "₹100", image: "/plant_images/1.avif" },
    { id: 2, name: "Fiddle Leaf Fig", price: "₹199", originalPrice: "₹250", image: "/plant_images/1.avif" },
    { id: 3, name: "Snake Plant", price: "₹149", originalPrice: "₹180", image: "/plant_images/1.avif" },
    { id: 4, name: "Peace Lily", price: "₹175", originalPrice: "₹200", image: "/plant_images/1.avif" },
    { id: 5, name: "Spider Plant", price: "₹129", originalPrice: "₹160", image: "/plant_images/1.avif" },
    { id: 6, name: "Pothos", price: "₹90", originalPrice: "₹120", image: "/plant_images/1.avif" },
    { id: 7, name: "ZZ Plant", price: "₹110", originalPrice: "₹130", image: "/plant_images/1.avif" },
    { id: 8, name: "Areca Palm", price: "₹210", originalPrice: "₹250", image: "/plant_images/1.avif" },
  ];

  const swiperRef = React.useRef(null);  // Create a reference to Swiper

  // Function to go to the previous slide
  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  // Function to go to the next slide
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

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
        {plants.map((plant) => (
          <SwiperSlide key={plant.id}>
            <PlantCard
              name={plant.name}
              price={plant.price}
              originalPrice={plant.originalPrice}
              image={plant.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Left Arrow */}
      <div 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer  bg-white ml-5 rounded-lg bg-opacity-55 hover:bg-opacity-75"
        onClick={handlePrev}
      >
        <ChevronLeft size={40} weight="bold" />
      </div>

      {/* Right Arrow */}
      <div 
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white mr-5 rounded-lg bg-opacity-55 hover:bg-opacity-75 cursor-pointer"
        onClick={handleNext}
      >
        <ChevronRight size={40} weight="bold" />
      </div>
    </div>
  );
};

export default Carousel3;
