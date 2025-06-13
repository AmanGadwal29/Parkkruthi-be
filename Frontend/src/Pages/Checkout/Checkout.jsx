import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAddress } from "../../Context/AddressContext";
import {
  CreditCard,
  IndianRupee,
  Wallet,
  CheckCircle2,
  X,
} from "lucide-react";

const Checkout = () => {
  const { cart } = useCart();
  const { address } = useAddress();

  const [selectedAddr, setSelectedAddr] = useState(address?.[0]?._id || null);
  const [payMode, setPayMode] = useState("CARD");
  const [card, setCard] = useState({ name: "", no: "", expiry: "", cvv: "" });
  const [upi, setUPI] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const total = cart.reduce((acc, itm) => acc + itm.price * itm.quantity, 0);

  const AddressCard = ({ a }) => (
    <label
      className={`relative flex-1 p-4 rounded-xl border ${
        selectedAddr === a._id
          ? "border-green-600 ring-2 ring-green-300"
          : "border-gray-200"
      } shadow-sm cursor-pointer transition hover:shadow-lg`}
    >
      <input
        type="radio"
        name="addr"
        value={a.id}
        checked={selectedAddr === a._id}
        onChange={() => setSelectedAddr(a._id)}
        className="sr-only"
      />
      <p className="font-semibold text-gray-800">{a.FirstName}</p>
      <p className="text-gray-600 text-sm mt-1 leading-snug">
        {a?.Street1}, {a?.City} – {a?.Pincode}
      </p>
      <p className="text-gray-600 text-sm mt-1">📞 {a.Phone}</p>
      {selectedAddr === a._id && (
        <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-green-600" />
      )}
    </label>
  );

  const PaymentTab = ({ mode, icon: Icon, label }) => (
    <button
      onClick={() => setPayMode(mode)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
        payMode === mode
          ? "border-green-600 bg-green-50 text-green-800"
          : "border-gray-200 text-gray-700 hover:bg-gray-50"
      } transition`}
    >
      <Icon className="w-5 h-5" /> {label}
    </button>
  );

  const handleMockPay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentDone(true);
    }, 1500);
  };

  const RazorpayMockModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-[90%] sm:w-[420px] shadow-xl relative">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <button
            onClick={() => {
              setShowModal(false);
              setIsPaying(false);
              setPaymentDone(false);
            }}
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </header>

        <div className="px-6 py-8 text-center">
          {!paymentDone ? (
            <>
              <div className="mb-6">
                <span className="text-2xl font-extrabold text-[#0d6efd]">
                  Razor<span className="text-gray-900">pay</span>
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">₹{total.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-6">
                Payment method – {payMode}
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setIsPaying(false);
                    setPaymentDone(false);
                  }}
                  className="px-5 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  disabled={isPaying}
                  onClick={handleMockPay}
                  className="px-6 py-2 rounded bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-medium disabled:opacity-60"
                >
                  {isPaying ? "Processing…" : "Pay Now"}
                </button>
              </div>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Payment Successful</h4>
              <p className="text-gray-600 mb-6">
                Thank you! Your order is confirmed.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const isLoading = cart.length === 0 || address.length === 0;
  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 animate-pulse">
        {/* Skeleton */}
        {/* Left and Right loading UI */}
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      {showModal && <RazorpayMockModal />}

      <h1 className="text-3xl font-extrabold text-green-700 mb-8 text-center md:text-left">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2 space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              1. Delivery Address
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {address.map((a) => (
                <AddressCard key={a._id} a={a} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              2. Payment Method
            </h2>
            <div className="flex gap-3 mb-6 flex-wrap">
              <PaymentTab
                mode="CARD"
                icon={CreditCard}
                label="Credit / Debit Card"
              />
              <PaymentTab mode="UPI" icon={IndianRupee} label="UPI" />
              <PaymentTab mode="COD" icon={Wallet} label="Cash on Delivery" />
            </div>

            {payMode === "CARD" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={card.name}
                  onChange={(e) =>
                    setCard({ ...card, name: e.target.value })
                  }
                  className="w-full input"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength="19"
                  value={card.no}
                  onChange={(e) => setCard({ ...card, no: e.target.value })}
                  className="w-full input"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={(e) =>
                      setCard({ ...card, expiry: e.target.value })
                    }
                    className="flex-1 input"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    value={card.cvv}
                    onChange={(e) =>
                      setCard({ ...card, cvv: e.target.value })
                    }
                    className="flex-1 input"
                  />
                </div>
              </div>
            )}

            {payMode === "UPI" && (
              <input
                type="text"
                placeholder="Your UPI ID (e.g., name@bank)"
                value={upi}
                onChange={(e) => setUPI(e.target.value)}
                className="w-full input"
              />
            )}

            {payMode === "COD" && (
              <p className="text-sm text-gray-600">
                Cash will be collected at delivery. Please keep the exact
                amount ready.
              </p>
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <div className="divide-y max-h-64 border py-2 rounded-lg overflow-y-auto px-3">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-start text-sm py-2"
              >
                <div className="w-3/5">
                  <p className="font-semibold text-gray-800 truncate">
                    {item?.title}
                  </p>
                  <div className="text-xs text-gray-500">
                    <span className="line-through mr-2">
                      ₹{item?.originalPrice?.toFixed(2)}
                    </span>
                    <span className="text-gray-800 font-medium">
                      ₹{item?.price.toFixed(2)}
                    </span>
                    <span className="ml-1">× {item.quantity}</span>
                  </div>
                </div>
                <div className="w-2/5 text-right font-medium text-gray-800">
                  ₹{(item?.price * item?.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <button
            disabled={!selectedAddr}
            onClick={() => setShowModal(true)}
            className="w-full py-4 rounded-xl bg-green-700 disabled:opacity-50 hover:bg-green-800 text-white font-semibold text-lg transition"
          >
            Pay ₹{total.toFixed(2)}
          </button>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
