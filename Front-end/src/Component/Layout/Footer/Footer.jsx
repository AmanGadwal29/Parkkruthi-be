import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const nav1 = [
    { id: 1, title: "About Us", path: "/" },
    { id: 2, title: "Contact Us", path: "/login" },
    { id: 3, title: "Careers", path: "/" },
    { id: 4, title: "Blogs", path: "/" },
    { id: 5, title: "Get Help", path: "/" },
  ];

  return (
    <footer className="bg-[#f8f9fa] text-[#333] p-2.5 px-5 font-sans border-t-2 border-[#e9ecef] relative z-[40]">
      <div className="max-w-[1200px] mx-auto w-full px-5">
        {/* Top Brand Section */}
        <div className="w-full mb-10">
          <div className="flex flex-wrap md:flex-nowrap gap-10 items-center">
            <img
              src="/logo1.jpg"
              alt="Urvann Logo"
              className="h-40 mix-blend-multiply"
            />
            <span className="text-[15px] leading-[1.6] text-[#6c757d]">
              Parkkruthi is your one-stop online nursery for plants, planters, gardening accessories, and tools. Order fresh plants and get free home delivery on the next day!
            </span>
            <div className="flex justify-end flex-1">
              <div className="bg-white rounded-lg p-6 max-w-[500px] w-full shadow-md">
                <h3 className="text-[#28a745] text-lg font-semibold mb-2">NEWSLETTER</h3>
                <p className="text-sm mb-4 text-[#6c757d]">Subscribe to get Email Updates</p>
                <div className="flex flex-wrap sm:flex-nowrap gap-5">
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex-1 min-w-[300px] px-4 py-3 border border-[#ced4da] rounded text-sm focus:outline-none focus:border-[#28a745] transition"
                  />
                  <button
                    className="bg-[#28a745] hover:bg-[#218838] text-white px-6 py-3 rounded text-sm font-semibold whitespace-nowrap w-full sm:w-auto transition"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-10">
          {/* Information Column */}
          <div>
            <h3 className="text-[#28a745] text-base font-semibold mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#28a745]">
              Information
            </h3>
            <ul className="space-y-2">
              {nav1.map((item) => (
                <li
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="text-sm text-[#495057] cursor-pointer transition-all duration-300 hover:text-[#28a745] hover:translate-x-1"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Repeat this block for other sections */}
          {[
            {
              heading: "Policies",
              items: ["Refund Policy", "Return Policy", "Cashback Program", "Privacy Policy"],
            },
            {
              heading: "Account",
              items: ["My Account", "Wishlist", "Track Order"],
            },
            {
              heading: "Major Categories",
              items: ["Plants", "Planters & Pots", "Soil Fertilizers & Pesticides", "Seeds & Bulbs"],
            },
            {
              heading: "Gifting",
              items: ["Teachers Day Gifts", "Friendship Day Gifts", "Birthday Gifts", "Anniversary Gifts"],
            },
            {
              heading: "Offers under 99",
              items: ["Under 99 Store", "Plants Under 99", "Indoor Plants Under 99", "Flowering Plants Under 99"],
            },
            {
              heading: "Offers Under 199",
              items: ["Under 199 Store", "Plants Under 199", "Indoor Plants Under 199", "Flowering Plants Under 199"],
            },
            {
              heading: "Plants",
              items: ["Indoor Plants", "Low Maintenance Plants", "Flowering Plants", "Outdoor Plants"],
            },
            {
              heading: "Planters",
              items: ["Plastic Planters", "Ceramic Planters", "Clay Planters"],
            },
            {
              heading: "Gardening Tools & Equipment",
              items: ["Watering Tools", "Gardening Tools", "Other Gardening Essentials"],
            },
            {
              heading: "Soil & Fertilizers",
              items: ["Fertilizers", "Soil Additives", "Potting Mixes", "Pesticides & Insecticides"],
            },
            {
              heading: "Home Decor Plants",
              items: ["Indoor Home Decor Plants", "Flowering Home Decor Plants", "Outdoor Home Decor Plants"],
            },
            {
              heading: "Best Sellers",
              items: ["Tulsi", "Jades", "Pothos", "Roses"],
            },
            {
              heading: "Seeds",
              items: ["Flower Seeds", "Vegetable Seeds", "Herb Seeds"],
            },
            {
              heading: "Membership & Gift Cards",
              items: ["Membership Card", "Gift Cards"],
            },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-[#28a745] text-base font-semibold mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#28a745]">
                {section.heading}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-[#495057] cursor-pointer transition-all duration-300 hover:text-[#28a745] hover:translate-x-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Delivery Locations */}
        <div className="text-[#495057] text-[15px] mt-10 pt-6 border-t border-[#e9ecef]">
          <p>
            <strong className="text-[#28a745] font-semibold">We deliver to:</strong> Delhi | Bangalore | Gurugram | Hyderabad | Pune | Noida
          </p>
        </div>

        {/* Copyright */}
        <div className="text-[#6c757d] text-xs mt-6 pt-6 border-t border-[#e9ecef] flex flex-col gap-1 text-center">
          <p>
            India's Number 1 Choice for Plants | Parkkruthi India Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
