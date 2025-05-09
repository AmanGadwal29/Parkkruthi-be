import React from "react";
import { Link } from "react-router-dom";

const PopularCategory = () => {
  const PopularCategories = [
    {
      id: 1,
      name: "Flowering Plants",
      image: "./PopCat/flowerPopCat.jpg",
      path: "/plants/Flower Plants",
      description: "Bring life and color to your space with beautiful flowering plants.",
    },
    {
      id: 2,
      name: "Potted Plants",
      image: "./PopCat/pottedPopCat.jpg",
      path: "/pots/Potted Plants",
      description: "Easy-care potted plants that refresh your home or office effortlessly.",
    },
    {
      id: 3,
      name: "Pots",
      image: "./PopCat/potsPopCat.jpeg",
      path: "/plants/Special Plants",
      description: "Discover decorative pots that perfectly match your indoor or outdoor plants.",
    },
    {
      id: 4,
      name: "Fertilizers",
      image: "./PopCat/fertilizersPopCat.jpeg",
      path: "/pots",
      description: "Support healthy plant growth with nutrient-rich organic and mineral fertilizers.",
    },
  ];
  
  

  return (
    <div className="w-full mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Popular Categories
      </h1>

      <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
        {PopularCategories.map((category) => (
          <div
            key={category.id}
            to={category.path}
            className={`outline h-44 w-72 rounded-xl bg-cover bg-center bg-no-repeat text-white`}
            style={{ backgroundImage: `url(${category.image})` }}>
            <div className="h-full w-full bg-black/45 rounded-xl flex flex-col items-start justify-between p-6">
              <h1 className="text-center font-semibold text-white text-xl mt-1">
                {category.name}
              </h1>
              <p className="text-xs">{category.description}</p>
              <Link key={category.id} className="border-2 rounded-md cursor-pointer py-1 px-3 text-sm hover:bg-black hover:bg-opacity-45" to={category.path}>
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
