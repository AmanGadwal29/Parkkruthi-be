import React from "react";
import { Link } from "react-router-dom";

// Import images
import popcat1 from "/popcat1.avif";
import popcat2 from "/popcat2.avif";
import popcat3 from "/popcat3.avif";
import popcat4 from "/popcat4.avif";
import popcat5 from "/popcat5.avif";
import popcat6 from "/popcat6.avif";

const PopularCateg = () => {
  const categories = [
    { id: 1, name: "Flowering Plants", image: popcat1, path: "/plants/Flower Plants" },
    { id: 2, name: "Indoor Plants", image: popcat2, path: "/plants/Indoor Plants" },
    { id: 3, name: "Potted Plants", image: popcat3, path: "/pots/Potted Plants" },
    { id: 4, name: "Special Plant Combos", image: popcat4, path: "/plants/Special Plants" },
    { id: 5, name: "Pots", image: popcat5, path: "/pots" },
    { id: 6, name: "Soil & More", image: popcat6, path: "/" },
  ];

  return (
    <div className="w-full mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Popular Categories
      </h1>

      <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="flex flex-col items-center group w-[16%] min-w-[150px] sm:w-[30%] md:w-[30%] lg:w-[10%] cursor-pointer transition-transform duration-300 ease-in-out"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden border-4 sm:border-3 border-[#ff8a8a] bg-[#fcf3d7] flex items-center justify-center mb-4">
              <img
                src={category.image}
                alt={category.name}
                className="w-[90%] h-[90%] object-contain group-hover:scale-125 group-hover:w-full transition-all duration-500 ease rounded-full"
              />
            </div>
            <p className="text-center text-gray-700 font-semibold group-hover:text-gray-900 text-base sm:text-sm mt-1">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCateg;
