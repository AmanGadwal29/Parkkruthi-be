import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, updateQuantity, getItemQuantity, openModal }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAdd = (id, quantity, stocks) => {
    if (quantity < stocks) {
      updateQuantity(id, 1);
    } else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <article
      key={item.id}
      className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-3xl border border-gray-200 transition hover:shadow-2xl"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full max-w-[140px] h-[140px] sm:w-[140px] sm:h-[140px] object-cover rounded-3xl shadow-md select-none flex-shrink-0"
        draggable={false}
      />
      <div className="flex flex-col flex-grow w-full sm:w-auto min-w-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 select-text truncate">
          {item.name}
        </h2>
        <p className="text-gray-600 mt-1 mb-4 line-clamp-3 sm:line-clamp-2 select-text">
          {item.description}
        </p>
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            aria-label={`Decrease quantity of ${item.name}`}
            className="bg-gray-100 hover:bg-gray-200 p-2.5 sm:p-3 rounded-full text-gray-600 transition focus:outline-none focus:ring-2 focus:ring-[#276139]"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 sm:w-14 text-center py-1.5 sm:py-2 border rounded-md font-semibold text-lg sm:text-xl select-text">
            {getItemQuantity(item.id)}
          </span>
          <button
            disabled={showPopup}
            onClick={() => handleAdd(item.id, item.quantity, item.stocks)}
            aria-label={`Increase quantity of ${item.name}`}
            className={`bg-gray-100 relative hover:bg-gray-200 p-2.5 sm:p-3 rounded-full text-gray-600 transition focus:outline-none focus:ring-2 focus:ring-[#276139] ${
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
          ₹{item.price * getItemQuantity(item.id)}
        </p>
        <button
          onClick={() => openModal(item)}
          aria-label={`Remove ${item.name} from cart`}
          className="text-red-600 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
