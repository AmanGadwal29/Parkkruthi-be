import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularCategory = () => {
  const popularCategoriesData = [
    {
      id: 1,
      name: "Flowering Plants",
      image: "/PopCat/flowerPopCat.jpg",
      path: "/plants/category/flowerplants",
      description: "Bring life and color to your space with beautiful flowering plants.",
    },
    {
      id: 2,
      name: "Potted Plants",
      image: "/PopCat/pottedPopCat.jpg",
      path: "/pots/category/pottedplants",
      description: "Easy-care potted plants that refresh your home or office effortlessly.",
    },
    {
      id: 3,
      name: "Pots",
      image: "/PopCat/potsPopCat.jpeg",
      path: "/pots",
      description: "Discover decorative pots that perfectly match your indoor or outdoor plants.",
    },
    {
      id: 4,
      name: "Fertilizers",
      image: "/PopCat/fertilizersPopCat.jpeg",
      path: "/fertilizers",
      description: "Support healthy plant growth with nutrient-rich organic and mineral fertilizers.",
    },
  ];

  const [popularCategories, setPopularCategories] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopularCategories(popularCategoriesData);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const shimmerStyle = `
    .shimmer {
      position: relative;
      overflow: hidden;
      background: #f6f7f8;
      background-image: linear-gradient(
        90deg,
        #f6f7f8 0px,
        #edeef1 40px,
        #f6f7f8 80px
      );
      background-size: 600px 100%;
      animation: shimmer 1.5s infinite linear;
    }
    @keyframes shimmer {
      0% {
        background-position: -600px 0;
      }
      100% {
        background-position: 600px 0;
      }
    }
  `;

  return (
    <>
      <style>{shimmerStyle}</style>

      <section className="w-full bg-[#f5f5f5] py-16 px-4 sm:px-8 lg:px-16 font-sans">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1B3C2E] tracking-wide mb-4 leading-snug">
          Popular Categories
        </h2>
        <p className="text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal">
          Find top trending plant types, pots, and garden essentials chosen by customers.
        </p>

        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {popularCategories.length === 0
            ? popularCategoriesData.map((_, idx) => (
                <div
                  key={idx}
                  className="h-44 w-72 rounded-xl bg-gray-200 relative overflow-hidden flex flex-col justify-between p-6 shimmer"
                >
                  <div className="w-full h-28 rounded-xl mb-4 bg-gray-300" />
                  <div className="h-6 rounded-full mb-3 w-3/4 bg-gray-200" />
                  <div className="h-3 rounded mb-4 w-full bg-gray-200" />
                  <div className="h-8 rounded-md w-24 bg-gray-200" />
                </div>
              ))
            : popularCategories.map((category) => (
                <div
                  key={category.id}
                  className=" h-44 w-72 rounded-xl bg-cover bg-center bg-no-repeat text-white shadow-md relative cursor-pointer "
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="h-full w-full bg-black/45 rounded-xl flex flex-col items-start justify-between p-6 relative z-10">
                    <h3 className="text-lg font-semibold text-white tracking-wide">
                      {category.name}
                    </h3>
                    <p className="text-xs leading-tight">
                      {category.description}
                    </p>
                    <Link
                      to={category.path}
                      className="border-2 border-white rounded-md cursor-pointer py-1 px-3 text-sm font-medium text-white hover:bg-[#1f1e1e] hover:bg-opacity-10 transition"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </>
  );
};

export default PopularCategory;
