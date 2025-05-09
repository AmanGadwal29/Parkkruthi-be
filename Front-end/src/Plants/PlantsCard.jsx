import React, { useState } from "react"; 
import Button from "../Component/Other/Carousel/Button"; 

const PlantCard = ({name, price, originalPrice, image }) => {
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  return ( 
    <div className="cursor-pointer w-full sm:w-[250px] md:w-[270px] lg:w-[260px] mx-auto flex flex-col items-center justify-between shadow-lg overflow-hidden bg-white rounded-lg transition-all duration-300 ease-in-out"> 
      <div className="w-full h-56 sm:h-64 lg:h-52 overflow-hidden flex items-center justify-center bg-gray-200"> 
        {!imgError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-all duration-300 ease-in-out"
            onError={handleError}
          />
        ) : (
          <span className="text-gray-500 text-lg">No Image Available</span>
        )}
      </div>

      <div className="w-full px-4 py-2 text-center">
        <p className="text-lg font-semibold text-gray-800 truncate">{name}</p>

        <div className="mt-2 text-lg font-semibold">
          <span className="text-green-600 mr-2">₹{price}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">{originalPrice}</span>
          )}
        </div>

        <div className="flex justify-center items-center mt-2 text-yellow-500 text-sm">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="fa fa-star checked mr-0.5" />
          ))}
          <span className="text-gray-700 ml-1">49 Reviews</span>
        </div>

        <div className="mt-4">
          <Button />
        </div>
      </div> 
    </div> 
  ); 
}; 

export default PlantCard;
