import React from "react";

const Help = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 font-sans">
      <h1 className="text-4xl font-bold font-display text-center text-[#1B3C2E] mb-4">
        Need Help?
      </h1>
      <p className="text-center text-gray-700 text-base max-w-xl mx-auto mb-10 leading-relaxed">
        We’re here to support your Parkkruthi experience. For orders, issues, or guidance — feel free to reach out.
      </p>

      {/* Contact Info */}
      <div className="bg-white shadow-md rounded-2xl border border-green-100 p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-semibold font-display text-[#1B3C2E] mb-4">
          Customer Support
        </h2>
        <ul className="space-y-2 text-gray-800 text-sm leading-relaxed">
          <li>
            📧 <strong>Email:</strong>{" "}
            <a
              href="mailto:support@parkkruthi.com"
              className="text-green-700 underline hover:text-green-900 transition"
            >
              support@parkkruthi.com
            </a>
          </li>
          <li>
            📞 <strong>Phone:</strong> +91 98765 43210
          </li>
          <li>
            ⏰ <strong>Hours:</strong> Mon – Sat, 10:00 AM to 6:00 PM
          </li>
          <li>
            💬 Quick help? Use our chat icon on the bottom-right of the screen.
          </li>
        </ul>
      </div>

      {/* Support Topics */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Order Help",
            desc: "Didn't get confirmation or delivery? Mail us with your Order ID — we’ll handle the rest.",
          },
          {
            title: "Damaged or Wrong Plant",
            desc: "Share photos of any issue within 48 hrs — we’ll send a replacement or issue a refund.",
          },
          {
            title: "Shipping Details",
            desc: "We ship pan-India. Delivery within 3–7 days. Use your profile to track your order.",
          },
          {
            title: "Returns & Refunds",
            desc: "Valid returns accepted within 5 days. Refunds are processed in 3–5 working days.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold font-display text-[#1B3C2E] mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact Button */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 text-sm">
          Still need assistance? Contact our team.
        </p>
        <a
          href="mailto:support@parkkruthi.com"
          className="inline-block mt-4 px-6 py-2 bg-[#2C6D31] text-white text-sm font-medium rounded-full hover:bg-[#1e4b21] transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Help;
