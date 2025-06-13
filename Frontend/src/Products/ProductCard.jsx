import React, { useEffect, useState, useRef } from "react";
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
  const [popupMessage, setPopupMessage] = useState("Maximum limit reached!");
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isAdmin = auth?.type === "admin";

  const quantity = getItemQuantity(id);
  const [inputQty, setInputQty] = useState(String(quantity));

  const debounceTimeout = useRef(null);

  useEffect(() => {
    setInputQty(String(quantity));
  }, [quantity]);

  // Debounce quantity update after 500ms of no typing
  useEffect(() => {
    if (inputQty === "") return; // don't update when empty

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const parsed = parseInt(inputQty, 10);
      if (!isNaN(parsed)) {
        const newQty = Math.min(parsed, stocks);
        if (newQty !== quantity) {
          updateQuantity(id, newQty - quantity);
        }
        // If typed value exceeds stock, adjust input display
        if (parsed > stocks) {
          setInputQty(String(stocks));
        }
      } else {
        setInputQty(String(quantity));
      }
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [inputQty, quantity, stocks, id, updateQuantity]);

  const handleError = () => setImgError(true);

  const isDiscount = originalPrice && originalPrice > price;
  const discountPercent = isDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const showLimitPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleAdd = () => {
    if (quantity < stocks) {
      updateQuantity(id, 1);
    } else {
      showLimitPopup(`You can add only ${stocks} items`);
    }
  };

  const handleSubtract = () => {
    if (quantity > 0) {
      updateQuantity(id, -1);
    }
  };

  const totalPrice = price * quantity;

  return (
    <div className="w-full my-2 max-w-[300px] flex flex-col rounded-2xl shadow-sm bg-white border transition-all duration-300 hover:shadow-xl relative">
      {/* Image */}
      <div className="relative w-full h-[160px] sm:h-[200px] overflow-hidden rounded-t-2xl bg-gray-200">
        {!imgError && ImageURL ? (
          <img
            src={ImageURL}
            alt={title}
            className="w-full h-full object-cover rounded-t-2xl"
            onError={handleError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-100 rounded-t-2xl">
            Image not available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col bg-cover bg-top bg-[url(/cardbg.jpg)] rounded-b-2xl">
        <h3 className="text-lg sm:text-xl min-h-7 font-semibold text-black">
          {title || "Product Title"}
        </h3>
        <div className="min-h-10 py-2 flex items-center">
          <p className="text-sm text-gray-300 line-clamp-2 leading-snug">
            {description || "Product Description..."}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-green-400">
              ₹{price}
            </span>
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

        {/* Quantity or Add to Cart */}
        <div className="flex items-center justify-center min-h-16 mt-2 relative">
          {quantity > 0 ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={handleSubtract}
                  className="bg-white text-gray-800 px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                <input
                  type="number"
                  min={1}
                  max={stocks}
                  value={inputQty}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      if (value === "") {
                        setInputQty("");
                      } else {
                        const numValue = parseInt(value, 10);
                        if (numValue > stocks) {
                          setInputQty(String(stocks));
                        } else {
                          setInputQty(value);
                        }
                      }
                    }
                  }}
                  onBlur={() => {
                    if (inputQty === "") {
                      setInputQty(String(quantity));
                    } else {
                      const parsed = parseInt(inputQty, 10);
                      if (!isNaN(parsed)) {
                        if (parsed > stocks) {
                          setInputQty(String(stocks));
                          updateQuantity(id, stocks - quantity);
                        } else if (parsed >= 1) {
                          updateQuantity(id, parsed - quantity);
                        } else {
                          setInputQty(String(quantity));
                        }
                      } else {
                        setInputQty(String(quantity));
                      }
                    }
                  }}
                  className="w-12 sm:w-14 px-2 py-1 text-center text-base text-white bg-transparent border border-white rounded-md focus:outline-none"
                />

                <button
                  onClick={handleAdd}
                  className="bg-white relative text-gray-800 px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
                  aria-label="Increase quantity"
                  disabled={showPopup}
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-sm sm:text-base font-bold text-gray-800">
                <p className="text-xs sm:text-sm text-gray-300">Total Price</p>
                <span className="text-green-400">₹{totalPrice}</span>
              </div>
            </div>
          ) : (
            <button
              disabled={isAdmin}
              onClick={() => addToCart(product, 1)}
              className="w-full cursor-pointer flex items-center justify-center space-x-2 border-2 border-white text-white text-sm font-medium px-4 py-2 sm:py-3 rounded-lg hover:opacity-80 hover:border-[#9a9898] transition-all duration-300"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          )}

          {/* Popup message */}
          {showPopup && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap shadow-lg z-50">
              {popupMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
