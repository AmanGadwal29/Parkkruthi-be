import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
    getTotalItemsCount,
  } = useCart();

  const [modalOpen, setModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const openModal = (product) => {
    setProductToRemove(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setProductToRemove(null);
    setModalOpen(false);
  };

  const confirmRemove = () => {
    if (productToRemove) {
      removeFromCart(productToRemove.id);
      closeModal();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-600 px-4 sm:px-0">
        <img
          src="/emptycart.png"
          alt="Empty Cart"
          className="w-28 mb-6 select-none"
          draggable={false}
        />
        <h2 className="text-3xl font-semibold text-gray-800 mb-5 text-center">
          Your cart is empty
        </h2>
        <Link
          to="/"
          className="inline-block mt-4 px-10 py-3 bg-[#276139] hover:bg-[#1f4d2d] text-white rounded-full font-semibold shadow-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 relative">
      <h1 className="text-4xl font-extrabold text-[#276139] mb-12 select-none text-center sm:text-left">
        Your Shopping Cart
      </h1>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Cart Items Section */}
        <section className="flex-1 space-y-8">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              getItemQuantity={getItemQuantity}
              openModal={openModal}
            />
          ))}
        </section>

        {/* Summary Section */}
        <aside className="w-full md:w-80 bg-white bg-opacity-95 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-200 sticky top-20 self-start">
          <h2 className="text-3xl font-bold mb-8 text-[#276139] select-text">
            Summary
          </h2>
          <div className="flex justify-between text-gray-700 mb-4 font-medium text-lg">
            <span>Total Items</span>
            <span>{getTotalItemsCount()}</span>
          </div>
          <div className="flex justify-between mb-10 text-gray-900 font-extrabold text-2xl">
            <span>Total Price</span>
            <span className="text-[#276139]">₹{totalPrice}</span>
          </div>
          <button
            className="w-full py-4 rounded-xl bg-[#276139] hover:bg-[#1d4f2d] text-white font-semibold text-lg shadow-lg transition"
            onClick={() => alert("Proceeding to checkout...")}
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="modal-title"
              className="text-xl font-semibold text-gray-900 mb-4 select-text"
            >
              Remove Item
            </h3>
            <p id="modal-description" className="mb-6 text-gray-700 select-text">
              Are you sure you want to remove{" "}
              <span className="font-semibold">{productToRemove?.name}</span> from
              your cart?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
