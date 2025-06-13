import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../Context/CartContext";

const CartItem = ({ item, openModal }) => {
  const {
    updateQuantity,
    getItemQuantity,
    getStock,
  } = useCart();

  const quantity = getItemQuantity(item.productId);
  const stock = getStock(item.productId);
  const [showPopup, setShowPopup] = useState(false);

  const handleAdd = () => {
    if (quantity < stock) {
      updateQuantity(item.productId, +1);
    } else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleSubtract = () => {
    if (quantity > 0) {
      updateQuantity(item.productId, -1);
    }
  };

  return (
    <article
      key={item.ProductId}
      className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-3xl border border-gray-200 transition hover:shadow-2xl"
    >
      <div className="flex flex-col flex-grow w-full sm:w-auto min-w-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 select-text truncate">
          {item.title}
        </h2>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={handleSubtract}
            aria-label={`Decrease quantity of ${item?.title}`}
            className="bg-gray-100 hover:bg-gray-200 p-2.5 sm:p-3 rounded-full text-gray-600 transition active:outline-none active:ring-2 focus:ring-[#276139]"
          >
            <Minus size={16} />
          </button>

          <span className="w-12 sm:w-14 text-center py-1.5 sm:py-2 border rounded-md font-semibold text-lg sm:text-xl select-text">
            {quantity}
          </span>

          <button
            onClick={handleAdd}
            disabled={showPopup}
            aria-label={`Increase quantity of ${item?.title}`}
            className={`bg-gray-100 relative hover:bg-gray-200 p-2.5 sm:p-3 rounded-full text-gray-600 transition active:outline-none active:ring-2 focus:ring-[#276139] ${
              showPopup
                ? "before:content-['Maximum_limit_reached!'] before:absolute before:bottom-10 before:left-1/2 before:-translate-x-1/2 before:bg-[#000000a0] before:text-white before:text-xs before:px-3 before:py-1 before:rounded-md before:whitespace-nowrap before:shadow-lg before:z-50 before:opacity-100 before:transform before:transition-all before:duration-200"
                : "before:opacity-0 before:transform"
            }`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-5 h-full w-full sm:w-auto mt-6 sm:mt-0 flex-shrink-0">
        <p className="text-xl sm:text-2xl font-bold text-[#276139] select-text">
          ₹{item.price * quantity}
        </p>
        <button
          onClick={() => openModal(item)}
          aria-label={`Remove ${item?.title} from cart`}
          className="text-red-600 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
