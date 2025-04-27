import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name);
    }
    
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  let isAuthenticated = location.state?.isAuthenticated;
  if (isAuthenticated === undefined) {
    isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setUserName("");
    navigate("/login");
  };

  return (
    <>
      <div className="w-full relative font-arial">
        <div className="bg-gradient-to-br from-[#3aa560] via-[#3aa560] to-[#b7e66c] text-white flex justify-between px-5 py-2">
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/urvann.india"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.facebook.com/groups/217942056914835"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.youtube.com/c/UrvannAcademy"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://www.linkedin.com/company/urvann/"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=919599585773"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a
              href="mailto:customersupport@urvann.com"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href="https://in.pinterest.com/urvann_india/"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faPinterest} />
            </a>
          </div>
          <div>
            {isAuthenticated && (
              <h1 className="text-xl font-bold text-white mr-10">
                Welcome back{userName ? ', ' : ' '}
                <span className="text-yellow-300">{userName ? userName[0].toUpperCase() + userName.slice(1) : ""}</span>
                <span className="absolute animate-bounce mx-2">!</span>
              </h1>
            )}
          </div>
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
            <span>Bangalore</span>
            <button className="change-btn">(Change)</button>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search by Products" />
            <button className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <div className="nav-actions ">
            <Link to="/help" className='font-semibold relative px-4 py-2 rounded-lg border-none transition-all hover:bg-[#2a7845] bg-[#3AA560] text-white cursor-pointer  duration-200 active:scale-95 font-poppins'>
              Help
            </Link>

            {isAuthenticated ? (
              <button
              onClick={handleLogout}
              className='font-semibold relative px-5 py-2 rounded-lg border-none bg-red-400 text-white cursor-pointer transition-transform duration-200 active:scale-95 font-poppins'
            >LOGOUT</button>) : (
              <Link to="/login" className='font-semibold relative px-4 py-2 rounded-lg border-none transition-all hover:bg-[#2a7845] bg-[#3AA560] text-white cursor-pointer  duration-200 active:scale-95 font-poppins'>
                Login
              </Link>
            )}

            <Link to="/cart" className="cart-icon">
              <FontAwesomeIcon
                size="xl"
                color="#B7E66C"
                icon={faShoppingCart}
              />
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* Dropdown */}
      <DropdownNav
        setActiveDropdown={setActiveDropdown}
        activeDropdown={activeDropdown}
        isMenuOpen={isMenuOpen}
      />
    </>
  );
};

export default Navbar;
