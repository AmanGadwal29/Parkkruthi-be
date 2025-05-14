import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";

const PlantCard = ({ title, price, originalPrice, imageURL, description }) => {
  const [imgError, setImgError] = useState(false);

  const handleError = () => setImgError(true);

  const isDiscount = originalPrice && originalPrice > price;
  const discountPercent = isDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div className="w-full max-w-[280px] rounded-2xl shadow-lg bg-white border overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative w-full h-full flex items-center justify-center">
        {!imgError ? (
          <div className="">
            <img
              src={imageURL}
              alt={title}
              className="w-full min-h-80 h-full object-cover"
              onError={handleError}
            /></div>
        ) : (
          <span className="text-gray-400 w-full text-sm min-h-40 flex justify-center items-center bg-gray-200">Image not available</span>
        )}
        {discountPercent && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-md">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Product Name */}
        <h3 className="text-[17px] font-semibold text-gray-800 leading-snug truncate">
          {title}
        </h3>
        <p className="text-xs mt-2 min-h-8 text-ellipsis line-clamp-2 overflow-hidden text-gray-400">{description}</p>
        {/* Price */}
        <div className="mt- flex items-center space-x-2">
          <span className="text-lg font-bold text-green-700">₹{price}</span>
          {originalPrice && (
            <span className="text-sm line-through text-gray-400">₹{originalPrice}</span>
          )}
        </div>

        {/* Ratings */}
        <div className="flex items-center text-yellow-500 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#facc15" strokeWidth={0} className="mr-0.5" />
          ))}
          <span className="text-gray-500 text-xs ml-2">(49 reviews)</span>
        </div>

        {/* CTA Button */}
        <button className="mt-4 w-full flex items-center justify-center space-x-2 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
