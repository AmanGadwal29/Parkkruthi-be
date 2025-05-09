import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function DropdownNav({ setActiveDropdown, activeDropdown, isMenuOpen }) {
  const dropdownRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setHoveredCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setActiveDropdown]);

  const dropdownCategories = {
    Plants: {
      "Flower Plants": { path: "/plants/Flower Plants" },
      "Indoor Plants": { path: "/plants/Indoor Plants" },
      "Potted Plants": { path: "/plants/Potted Plants" },
      "Special Plants": { path: "/plants/Special Plants" },
    },
    Pots: {
      "Plastic Pots": { path: "/pots/Plastic Pot" },
      "Mud Pots": { path: "/pots/Mud Pot" },
    },
    Fertilizers: {
      "Organic Fertilizers": { path: "/fertilizers/Organic Fertilizers" },
      "Chemical Fertilizers": { path: "/fertilizers/Chemical Fertilizers" },
    }
  };

  const handleMouseEnter = (key) => {
    setActiveDropdown(key);
    setHoveredCategory(key);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setHoveredCategory(null);
  };

  return (
    <div className="relative z-50 text-white">
      <ul className="flex flex-wrap items-center justify-start w-full bg-gradient-to-r from-[#008080] via-[#008B8B] to-[#2aded5]">
        {Object.keys(dropdownCategories).map((key) => (
          <li
            key={key}
            className={`relative px-3.5 py-3 text-xs cursor-pointer flex items-center gap-1 hover:bg-[#006464] ${
              activeDropdown === key ? "bg-[#006464]" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={() => handleMouseLeave()}>
            <Link
              to={`/${key}`}
              className="text-white no-underline"
              onClick={(e) => e.preventDefault()}>
              {key}
            </Link>
            <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" />
          </li>
        ))}
      </ul>

      {/* Full-width dropdown */}
      {hoveredCategory && (
        <div
          ref={dropdownRef}
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={handleMouseLeave}
          className="absolute -z-10 left-0 w-full bg-[#2ce0da] text-[#333] border-t border-gray-300 shadow-lg animate-slide-down"
          style={{
            top: "100%",
          }}>
          {Object.keys(dropdownCategories[hoveredCategory]).length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full lg:grid-cols-8 gap-6 px-5 py-6">
              {Object.keys(dropdownCategories[hoveredCategory])?.map((subKey) => (
                <div key={subKey} className="text-nowrap">
                  <ul className="list-none p-0">
                    <li className="mb-1">
                      <Link
                        state={subKey}
                        to={dropdownCategories[hoveredCategory][subKey].path}
                        onClick={() => setActiveDropdown(null)}
                        className="text-md font-semibold text-white no-underline hover:text-[#2b6e2b] block py-1">
                        {subKey}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-lg min-h-20 w-[100%] text-gray-500">
              No items available
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownNav;
