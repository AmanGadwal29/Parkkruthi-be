import React from "react";
import "./Footer.css"; // Ensure you have styles defined in this file
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
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand w-full">
          <p className="flex gap-20 items-center">
            <img
              src="./logo1.png"
              alt="Urvann Logo"
              className="footer-logo h-32 "
            />
            <span>
              {" "}
              Parkkruthi is your one-stop online nursery for plants, planters,
              gardening accessories, and tools. Order fresh plants and
              get free home delivery on the next day!
            </span>
            <div className="flex justify-end">
              <div className="footer-newsletter flex-1">
                <h3>NEWSLETTER</h3>
                <p>Subscribe to get Email Updates</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Email" />
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          </p>
        </div>

        <div className="footer-columns">
          {/* Information Column */}
          <div className="footer-column">
            <h3>Information</h3>
            <ul>
              {nav1.map((item) => (
                <li key={item.id} onClick={() => navigate(item.path)}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Column */}
          <div className="footer-column">
            <h3>Policies</h3>
            <ul>
              <li>Refund Policy</li>
              <li>Return Policy</li>
              <li>Cashback Program</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="footer-column">
            <h3>Account</h3>
            <ul>
              <li>My Account</li>
              <li>Wishlist</li>
              <li>Track Order</li>
            </ul>
          </div>

          {/* Major Categories Column */}
          <div className="footer-column">
            <h3>Major Categories</h3>
            <ul>
              <li>Plants</li>
              <li>Planters & Pots</li>
              <li>Soil Fertilizers & Pesticides</li>
              <li>Seeds & Bulbs</li>
            </ul>
          </div>

          {/* Gifting Column */}
          <div className="footer-column">
            <h3>Gifting</h3>
            <ul>
              <li>Teachers Day Gifts</li>
              <li>Friendship Day Gifts</li>
              <li>Birthday Gifts</li>
              <li>Anniversary Gifts</li>
            </ul>
          </div>

          {/* Offers under 99 Column */}
          <div className="footer-column">
            <h3>Offers under 99</h3>
            <ul>
              <li>Under 99 Store</li>
              <li>Plants Under 99</li>
              <li>Indoor Plants Under 99</li>
              <li>Flowering Plants Under 99</li>
            </ul>
          </div>

          {/* Offers Under 199 Column */}
          <div className="footer-column">
            <h3>Offers Under 199</h3>
            <ul>
              <li>Under 199 Store</li>
              <li>Plants Under 199</li>
              <li>Indoor Plants Under 199</li>
              <li>Flowering Plants Under 199</li>
            </ul>
          </div>

          {/* Plants Column */}
          <div className="footer-column">
            <h3>Plants</h3>
            <ul>
              <li>Indoor Plants</li>
              <li>Low Maintenance Plants</li>
              <li>Flowering Plants</li>
              <li>Outdoor Plants</li>
            </ul>
          </div>

          {/* Planters Column */}
          <div className="footer-column">
            <h3>Planters</h3>
            <ul>
              <li>Plastic Planters</li>
              <li>Ceramic Planters</li>
              <li>Clay Planters</li>
            </ul>
          </div>

          {/* Gardening Tools Column */}
          <div className="footer-column">
            <h3>Gardening Tools & Equipment</h3>
            <ul>
              <li>Watering Tools</li>
              <li>Gardening Tools</li>
              <li>Other Gardening Essentials</li>
            </ul>
          </div>

          {/* Soil & Fertilizers Column */}
          <div className="footer-column">
            <h3>Soil & Fertilizers</h3>
            <ul>
              <li>Fertilizers</li>
              <li>Soil Additives</li>
              <li>Potting Mixes</li>
              <li>Pesticides & Insecticides</li>
            </ul>
          </div>

          {/* Home Decor Plants Column */}
          <div className="footer-column">
            <h3>Home Decor Plants</h3>
            <ul>
              <li>Indoor Home Decor Plants</li>
              <li>Flowering Home Decor Plants</li>
              <li>Outdoor Home Decor Plants</li>
            </ul>
          </div>

          {/* Best Sellers Column */}
          <div className="footer-column">
            <h3>Best Sellers</h3>
            <ul>
              <li>Tulsi</li>
              <li>Jades</li>
              <li>Pothos</li>
              <li>Roses</li>
            </ul>
          </div>

          {/* Seeds Column */}
          <div className="footer-column">
            <h3>Seeds</h3>
            <ul>
              <li>Flower Seeds</li>
              <li>Vegetable Seeds</li>
              <li>Herb Seeds</li>
            </ul>
          </div>

          {/* Membership & Gift Cards Column */}
          <div className="footer-column">
            <h3>Membership & Gift Cards</h3>
            <ul>
              <li>Membership Card</li>
              <li>Gift Cards</li>
            </ul>
          </div>
        </div>

        {/* Delivery Locations */}
        <div className="footer-delivery">
          <p>
            <strong>We deliver to:</strong> Delhi | Bangalore | Gurugram |
            Hyderabad | Pune | Noida
          </p>
        </div>

        {/* Copyright Section */}
        <div className="footer-copyright">
          <p className="text-center">
            India's Number 1 Choice for Plants | Parkkruthi India Private
            Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
