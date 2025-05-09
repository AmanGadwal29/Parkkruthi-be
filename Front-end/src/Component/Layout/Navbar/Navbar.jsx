import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const SocialLinks = () => {
  const links = [
    { href: "https://www.instagram.com/urvann.india", icon: faInstagram },
    {
      href: "https://www.facebook.com/groups/217942056914835",
      icon: faFacebook,
    },
    { href: "https://www.youtube.com/c/UrvannAcademy", icon: faYoutube },
    { href: "https://www.linkedin.com/company/urvann/", icon: faLinkedin },
    {
      href: "https://api.whatsapp.com/send/?phone=919599585773",
      icon: faWhatsapp,
    },
    { href: "mailto:customersupport@urvann.com", icon: faEnvelope },
    { href: "https://in.pinterest.com/urvann_india/", icon: faPinterest },
  ];

  return (
    <div className="flex gap-6">
      {links.map(({ href, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-2xl hover:text-[#216060] transition-colors duration-300">
          <FontAwesomeIcon icon={icon} />
        </a>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Authentication check
  let isAuthenticated = location.state?.isAuthenticated;
  if (isAuthenticated === undefined) {
    isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  }

  // On mount: fetch user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserName("");
    navigate("/login");
  };

  return (
    <>
      {/* Topbar */}
      <div
        className={`bg-gradient-to-r from-[#008080] via-[#008B8B] to-[#2aded5] text-white flex ${
          userName ? "justify-between" : "justify-center"
        }  px-5 py-2 font-[Arial]`}>
        <SocialLinks />
        {isAuthenticated && (
          <h1 className="text-xl font-bold text-white mr-10">
            Welcome back{userName ? ", " : " "}
            <span className="text-yellow-300">
              {userName?.charAt(0).toUpperCase() + userName?.slice(1)}
            </span>
            <span className="absolute animate-bounce mx-2">!</span>
          </h1>
        )}
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-5 py-4 bg-white shadow-sm border-b border-gray-200">
        {/* Logo */}
        <div className="h-[75px]">
          <Link to="/">
            <img src="/logo1.jpg" alt="Parkkhruthi Logo" className="h-full" />
          </Link>
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-700">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#31aeae]" />
          <span>Bangalore</span>
          <button className="text-[#31aeae] ml-1 underline hover:text-[#237c7c] transition-colors">
            (Change)
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-grow max-w-[400px] mx-5">
          <input
            type="text"
            placeholder="Search by Products"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md outline-none text-sm"
          />
          <button className="bg-[#31aeae] hover:bg-[#237c7c] text-white px-4 rounded-r-md">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/help"
            className="px-4 py-2 text-sm font-medium border border-[#31aeae] text-[#31aeae] rounded-md hover:bg-[#e6f5f5] transition-all">
            Help
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium border border-red-400 text-red-500 rounded-md hover:bg-red-50 transition-all">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium border border-[#31aeae] text-[#31aeae] rounded-md hover:bg-[#e6f5f5] transition-all">
              Login
            </Link>
          )}

          <Link to="/cart" className="relative ml-2">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-[#31aeae] text-2xl hover:scale-110 transition-transform duration-300 drop-shadow-sm"
            />
            <span
  className={`absolute -top-2 -right-2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md ring-2 ring-white ${
    cartCount === 0 ? "bg-red-500" : "bg-[#31aeae]"
  }`}
>
  {cartCount}
</span>

          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="block md:hidden text-xl text-[#31aeae] ml-4"
          onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Dropdown navigation */}
      <DropdownNav
        isMenuOpen={isMenuOpen}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
    </>
  );
};

export default Navbar;
