import React, { useState } from "react";
import { Trash2, Plus, Minus, Leaf } from "lucide-react";
import { useCart } from "../../Context/CartContext";

const CartItem = ({ item, openModal }) => {
  const { updateQuantity, getItemQuantity, getStock } = useCart();
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
      key={item.productId}
      className="flex flex-col sm:flex-row items-center justify-between gap-6 p-5 bg-gradient-to-br from-white via-green-50 to-white border border-green-100 rounded-2xl shadow-sm transition"
    >
      {/* Placeholder Image */}
      <div className="relative w-24 h-24 flex items-center justify-center rounded-xl bg-green-100/60">
        <Leaf className="w-8 h-8 text-green-500" />
        {stock === 0 && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
            Out of Stock
          </span>
        )}
      </div>

      {/* Title + Quantity Controls */}
      <div className="flex flex-col flex-grow w-full sm:w-auto min-w-0 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSubtract}
            aria-label={`Decrease quantity of ${item?.title}`}
            className="bg-white border border-green-300 text-green-700 hover:bg-green-50 rounded-full p-2 transition"
          >
            <Minus size={16} />
          </button>

          <span className="px-4 py-1 text-lg font-medium border rounded-md text-gray-700 bg-white shadow-sm">
            {quantity}
          </span>

          <button
            onClick={handleAdd}
            disabled={showPopup}
            aria-label={`Increase quantity of ${item?.title}`}
            className={`bg-white border border-green-300 text-green-700 hover:bg-green-50 rounded-full p-2 transition relative ${
              showPopup
                ? "before:content-['Max_limit'] before:absolute before:-top-8 before:left-1/2 before:-translate-x-1/2 before:text-xs before:bg-black/80 before:text-white before:px-2 before:py-0.5 before:rounded-md"
                : ""
            }`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Price & Delete Button */}
      <div className="flex flex-col items-end gap-3">
        <p className="text-xl font-bold text-green-700 select-text">₹{item.price * quantity}</p>
        <button
          onClick={() => openModal(item?.productId)}
          aria-label={`Remove ${item?.title} from cart`}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 size={22} />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
