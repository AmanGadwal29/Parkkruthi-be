import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faMapMarkerAlt,
  faBars,
  faTimes,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faWhatsapp,
  faLinkedin,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import DropdownNav from "./DropdownNav";
import Button from "./Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = "Bangalore"; // You can replace this with dynamic location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="navbar-container">
        {/* Top bar with social icons and delivery message */}
        <div className="top-bar ">
          <div className="social-icons">
            <a
              href="https://www.instagram.com/urvann.india"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.facebook.com/groups/217942056914835"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.youtube.com/c/UrvannAcademy"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://www.linkedin.com/company/urvann/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=919599585773&text&type=phone_number&app_absent=0"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a
              href="mailto:customersupport@urvann.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href="https://in.pinterest.com/urvann_india/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faPinterest} />
            </a>
          </div>
          {/* <div className="delivery-message">
            ✨ Free Next Day Delivery on Orders Received by 7 PM ✨
          </div> */}
        </div>

        {/* Main navbar */}
        <div className="main-navbar">
          <div className="logo">
            <Link to="/">
              <img src="/logo1.jpg" alt="Nurvann Logo" />
            </Link>
          </div>

          <div className="location-selector">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{location}</span>
            <button className="change-btn">(Change)</button>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search by Products" />
            <button className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <div className="nav-actions ">
            <Link to="/help" className="help-btn ">
              <Button text="HELP" />
            </Link>
            <Link to="/login" className="login-btn ">
              <Button text="LOGIN" />
            </Link>
            <Link to="/cart" className="cart-icon">
              <FontAwesomeIcon size="xl" color="#B7E66C" icon={faShoppingCart} />
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
      <DropdownNav
        setActiveDropdown={setActiveDropdown}
        activeDropdown={activeDropdown}
        isMenuOpen={isMenuOpen}
      />
    </>
  );
};

export default Navbar;
