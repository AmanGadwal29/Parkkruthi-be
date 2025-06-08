import React, { useEffect, useState } from "react";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = (product) => {
  const {
    id,
    title,
    price,
    originalPrice,
    ImageURL,
    description,
    stocks,
  } = product;

  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  const [imgError, setImgError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const quantity = getItemQuantity(id);

  const [inputQty, setInputQty] = useState(String(quantity));

  useEffect(() => {
    setInputQty(String(quantity));
  }, [quantity]);


  const handleError = () => setImgError(true);

  const isDiscount = originalPrice && originalPrice > price;
  const discountPercent = isDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleAdd = () => {
    if (quantity < stocks) {
      updateQuantity(id, 1);
    } else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      updateQuantity(id, -1);
    } else if (quantity === 1) {
      updateQuantity(id, -1); // Set to 0 and remove from cart
    }
  };

  const totalPrice = price * quantity;

  return (
    <div className="w-full my-2 h-[460px] max-w-[300px] rounded-2xl transition-all ease shadow-sm bg-white border flex flex-col duration-300 hover:shadow-xl">
      <div className="relative w-full bg-gray-200 flex-1 overflow-hidden rounded-t-2xl">
        {!imgError ? (
          <img
            src={ImageURL}
            alt={title}
            className="w-full h-full object-cover rounded-t-2xl"
            onError={handleError}
          />
        ) : (
          <div className="text-gray-400 w-full text-sm h-full flex justify-center items-center bg-gray-200">
            Image not available
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col transition-all rounded-b-2xl ease bg-cover bg-top bg-[url(/cardbg.jpg)]">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <div className="min-h-10 py-2 flex items-center">
          <p className="text-sm line-clamp-2 overflow-hidden text-gray-300 leading-snug">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-400">₹{price}</span>
            {originalPrice && (
              <span className="line-through text-gray-300 ml-2">
                ₹{originalPrice}
              </span>
            )}
          </div>
          {isDiscount && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="flex items-center text-yellow-500 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill="#facc15"
              strokeWidth={0}
              className="mr-0.5"
            />
          ))}
          <span className="text-gray-300 text-xs ml-2">(49 reviews)</span>
        </div>
        <div className="flex items-center justify-center min-h-16 mt-2">
          {quantity > 0 ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSubtract}
                  className="bg-white text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>

                <input
                  type="number"
                  min={1}
                  max={stocks}
                  value={inputQty}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Allow only digits
                    if (/^\d*$/.test(value)) {
                      setInputQty(value);
                    }
                  }}
                  onBlur={() => {
                    const parsed = parseInt(inputQty, 10);
                    if (!isNaN(parsed)) {
                      if (parsed > stocks) {
                        setShowPopup(true);
                        setTimeout(() => setShowPopup(false), 2000);
                        setInputQty(String(quantity)); // Reset
                      } else if (parsed >= 1) {
                        updateQuantity(id, parsed - quantity); // Update context
                      } else {
                        setInputQty(String(quantity)); // Reset if below 1
                      }
                    } else {
                      setInputQty(String(quantity)); // Reset if invalid
                    }
                  }}
                  className="w-14 px-2 py-1 text-center text-lg font-medium text-white bg-transparent border border-white rounded-md focus:outline-none"
                />


                <button
                  onClick={handleAdd}
                  className={`bg-white relative text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 ${showPopup
                    ? "before:content-['Maximum_limit_reached!'] before:absolute before:bottom-10 before:left-1/2 before:-translate-x-1/2 before:bg-[#000000a0] before:text-white before:text-xs before:px-3 before:py-1 before:rounded-md before:whitespace-nowrap before:shadow-lg before:z-50 before:opacity-100 before:transform before:transition-all before:duration-200"
                    : "before:opacity-0 before:transform"
                    }`}
                  aria-label="Increase quantity"
                  disabled={showPopup}
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="text-lg font-bold text-gray-800">
                <p className="text-sm text-gray-300">Total Price</p>
                <span className="text-green-400">₹{totalPrice}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                if (quantity === 0) {
                  addToCart(product);
                }
              }}
              className="w-full flex items-center justify-center space-x-2 border-2 border-white text-white text-sm font-medium px-4 py-3 rounded-lg hover:opacity-80 hover:border-[#9a9898] transition-all duration-300"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
