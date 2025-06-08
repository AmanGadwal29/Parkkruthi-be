import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios'
import ProductCard from '../../../Products/ProductCard';

const Carousel3 = () => {
  const [plants, setPlants] = useState([
    {
      _id: 'plant001',
      Title: 'Snake Plant',
      Price: 399,
      originalPrice: 499,
      ImageURL: 'https://example.com/images/snake-plant.jpg',
      Stocks: 12,
      Description: 'A hardy indoor plant that purifies air and thrives in low light.'
    },
    {
      _id: 'plant002',
      Title: 'Peace Lily',
      Price: 299,
      originalPrice: 399,
      ImageURL: 'https://example.com/images/peace-lily.jpg',
      Stocks: 8,
      Description: 'An elegant flowering plant ideal for home or office decor.'
    },
    {
      _id: 'plant003',
      Title: 'Areca Palm',
      Price: 599,
      originalPrice: 699,
      ImageURL: 'https://example.com/images/areca-palm.jpg',
      Stocks: 5,
      Description: 'A tropical plant that adds a vibrant feel to indoor spaces.'
    },
    {
      _id: 'plant004',
      Title: 'Spider Plant',
      Price: 249,
      originalPrice: 349,
      ImageURL: 'https://example.com/images/spider-plant.jpg',
      Stocks: 10,
      Description: 'Low-maintenance plant that helps reduce indoor pollution.'
    },
    {
      _id: 'plant005',
      Title: 'Aloe Vera',
      Price: 199,
      originalPrice: 299,
      ImageURL: 'https://example.com/images/aloe-vera.jpg',
      Stocks: 20,
      Description: 'A medicinal plant with soothing and healing properties.'
    },
    {
      _id: 'plant006',
      Title: 'Fiddle Leaf Fig',
      Price: 899,
      originalPrice: 999,
      ImageURL: 'https://example.com/images/fiddle-leaf.jpg',
      Stocks: 6,
      Description: 'A trendy and bold foliage plant perfect for living rooms.'
    },
    {
      _id: 'plant007',
      Title: 'ZZ Plant',
      Price: 499,
      originalPrice: 599,
      ImageURL: 'https://example.com/images/zz-plant.jpg',
      Stocks: 9,
      Description: 'An easy-care plant ideal for busy plant parents and beginners.'
    },
    {
      _id: 'plant008',
      Title: 'Pothos Golden',
      Price: 179,
      originalPrice: 249,
      ImageURL: 'https://example.com/images/pothos-golden.jpg',
      Stocks: 15,
      Description: 'Popular trailing vine plant known for air purification.'
    },
    {
      _id: 'plant009',
      Title: 'Rubber Plant',
      Price: 699,
      originalPrice: 799,
      ImageURL: 'https://example.com/images/rubber-plant.jpg',
      Stocks: 7,
      Description: 'Sturdy indoor plant with glossy leaves and great aesthetic appeal.'
    },
    {
      _id: 'plant010',
      Title: 'Boston Fern',
      Price: 329,
      originalPrice: 429,
      ImageURL: 'https://example.com/images/boston-fern.jpg',
      Stocks: 11,
      Description: 'A lush green fern ideal for hanging baskets and humid spaces.'
    }
  ]);

  const swiperRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const PRODUCTS_API = import.meta.env.VITE_PRODUCTS_API;

  const fetchPlants = async () => {
    try {
      const { data } = await axios.get(`${PRODUCTS_API}/plants`);
      console.log('data', data);
      
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

  return plants.length > 1 ? (
    <section className="relative w-full bg-[#f5f5f5] py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-green-800 mb-8">
        Explore Our Green Collection
      </h2>

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
        {plants.map((plant) => (
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

      {/* Navigation Buttons */}
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
  ) : null;
};

export default Carousel3;
