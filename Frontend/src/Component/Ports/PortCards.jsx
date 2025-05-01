import React from "react";
import Button from "../Other/Carousel2/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PortCards = ({ id, name, price, image }) => {
  return (
    <div className="cursor-pointer w-full max-w-[200px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] mx-auto flex flex-col items-center justify-between shadow-lg overflow-hidden rounded-xl bg-white">
      {/* Image Section */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden group">
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs sm:text-sm font-bold rounded">
          63%
          <br /> OFF
        </div>
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t-xl transform transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Details Section */}
      <div className="w-full px-3 py-4 text-center">
        <p className="text-sm sm:text-base font-medium text-gray-800">{name}</p>

        <div className="mt-1 text-base sm:text-lg font-semibold">
          <span className="text-green-600 mr-2">₹35</span>
          <span className="text-gray-500 line-through text-sm">{price}</span>
        </div>

        {/* Reviews */}
        <div className="flex justify-center items-center mt-2 text-yellow-500 text-sm sm:text-base">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="fa fa-star checked mr-0.5" />
          ))}
          <span role="img" aria-label="star" className="ml-1">🌟</span>
          <span className="text-gray-700 ml-1">49 Reviews</span>
        </div>

        {/* Button */}
        <div className="mt-4">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default PortCards
