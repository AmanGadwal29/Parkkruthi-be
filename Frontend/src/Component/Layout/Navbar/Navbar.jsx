import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faMapMarkerAlt,
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
import { useCart } from "../../../context/CartContext.jsx";
import LocationFetcher from "../../../Utils/locationFetcher/LocationFetcher.jsx";
import AddressSelectorModal from "../../../Pages/Address/AddressSelectorModal.jsx";

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
    <div className="flex gap-4 sm:gap-6">
      {links.map(({ href, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-lg sm:text-2xl hover:text-[#216060] transition-colors duration-300"
          aria-label={`Link to ${href}`}
        >
          <FontAwesomeIcon icon={icon} />
        </a>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const { getTotalItemsCount } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  let isAuthenticated = location.state?.isAuthenticated;
  if (isAuthenticated === undefined) {
    isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.UserName);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setActiveDropdown(null);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setUserName("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("defaultAddressId");
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Top social + welcome */}
      <div className="bg-[#674023] text-white flex flex-col sm:flex-row justify-between w-full px-4 sm:px-10 py-2 font-[Arial] gap-2 sm:gap-0 items-center">
        <SocialLinks />
        {isAuthenticated && (
          <h1 className="text-base sm:text-xl font-bold text-white flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            Welcome back
            {userName ? (
              <span className="text-yellow-300">
                {", " + userName.charAt(0).toUpperCase() + userName.slice(1)}
              </span>
            ) : (
              ""
            )}
            <span className="animate-bounce mx-1">!</span>
          </h1>
        )}
      </div>

      {/* Main Navbar */}
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 lg:gap-6 px-4 sm:px-10 py-4 bg-[#FBFBFB] shadow-sm border-b border-gray-200">
        {/* Logo */}
        <div className="h-16 sm:h-20 lg:h-28 flex-shrink-0 overflow-hidden">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Parkkhruthi Logo"
              className="h-full w-auto scale-110 sm:scale-125"
            />
          </Link>
        </div>

        {/* Location - show on md+ */}
        <div className="hidden md:flex items-center gap-2 text-gray-700 flex-shrink-0 whitespace-nowrap">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#276139]" />
          <span className="text-sm md:text-base">
            <LocationFetcher />
          </span>
          <button
            onClick={() => setShowSelector(true)}
            className="text-[#276139] ml-1 group hover:text-[#237c7c] transition-colors text-sm md:text-base"
            aria-label="Change address"
          >
            (<span className="group-hover:underline">Change</span>)
          </button>
        </div>
        {showSelector && (
          <AddressSelectorModal onClose={() => setShowSelector(false)} />
        )}

        {/* Search */}
        <div className="flex flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Products"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md outline-none text-sm sm:text-base"
          />
          <button className="bg-[#276139] hover:bg-[#237c7c] text-white px-3 sm:px-4 rounded-r-md">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center gap-3 lg:gap-5 flex-shrink-0 whitespace-nowrap">
          <Link
            to="/help"
            className="px-3 sm:px-6 py-2 text-sm sm:text-base font-medium border border-[#276139] text-[#276139] rounded-md hover:bg-[#e6f5f5] transition-all"
          >
            Help
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogoutClick}
              className="px-3 py-2 text-sm sm:text-base font-medium border border-red-400 text-red-500 rounded-md hover:bg-red-50 transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 sm:px-5 py-2 text-sm sm:text-base font-medium border border-[#276139] text-[#276139] rounded-md hover:bg-[#e6f5f5] transition-all"
            >
              Login
            </Link>
          )}

          <Link to="/cart" className="relative ml-1 sm:ml-2">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-[#276139] text-xl sm:text-2xl hover:scale-110 transition-transform duration-300 drop-shadow-sm"
              aria-label="Cart"
            />
            <span
              className={`absolute -top-2 -right-2 text-xs sm:text-sm w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md ${
                getTotalItemsCount() === 0
                  ? "bg-red-600 text-white"
                  : "bg-[#4aba6b] text-white"
              }`}
            >
              {getTotalItemsCount()}
            </span>
          </Link>
        </div>
      </div>

      {/* Dropdown navigation */}
      <DropdownNav
        isMenuOpen={isMenuOpen}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Logout
            </h2>
            <p className="mb-6 text-gray-600">Are you sure you want to logout?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
