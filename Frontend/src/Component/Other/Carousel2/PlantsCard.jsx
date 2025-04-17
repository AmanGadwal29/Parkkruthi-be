import React from "react";
import Button from "./Button";

const PlantCard = ({ id, name, price, originalPrice, image }) => {
  return (
    <div className="cursor-pointer w-full sm:w-[250px] md:w-[270px] lg:w-[260px] mx-auto flex flex-col items-center justify-between shadow-lg overflow-hidden bg-white rounded-lg transition-all duration-300 ease-in-out">
      {/* Image Section */}
      <div className="w-full h-56 sm:h-64 lg:h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="w-full px-4 py-4 text-center">
        <p className="text-lg font-semibold text-gray-800">{name}</p>

        <div className="mt-2 text-lg font-semibold">
          <span className="text-green-600 mr-2">{price}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">{originalPrice}</span>
          )}
        </div>

        {/* Reviews */}
        <div className="flex justify-center items-center mt-2 text-yellow-500 text-sm">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="fa fa-star checked mr-0.5" />
          ))}
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

export default PlantCard;
