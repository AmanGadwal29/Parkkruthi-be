import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function DropdownNav({ setActiveDropdown, activeDropdown, isMenuOpen }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveDropdown]);

  const categories = {
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
    "Soil & More": {},
    "Home Decor Plants": {},
    Seeds: {},
    Tools: {},
    Gifting: {},
    "Bulk Gifting": {},
    Others: {},
    Sale: {},
    "Best Sellers": {},
    "Plant Stands": {},
    Blog: {},
  };

  return (
    <>
      <div className={`nav-menu ${isMenuOpen ? "open" : ""}`} ref={dropdownRef}>
        <ul className="menu-items">
          {Object.keys(categories).map((key) => (
            <li
              key={key}
              className={`menu-item dropdown ${
                activeDropdown === key ? "active" : ""
              }`}
              onMouseEnter={() => setActiveDropdown(key)}
              onMouseLeave={() => setActiveDropdown(null)}>
              <Link to={`/${key}`} onClick={(e) => e.preventDefault()}>
                {key}
              </Link>

              <FontAwesomeIcon
                icon={faChevronDown}
                aria-expanded={activeDropdown === key ? "true" : "false"}
              />

              {activeDropdown === key &&
                Object.keys(categories[key]).length > 0 && (
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      {Object.keys(categories[key]).map((subKey) => (
                        <div key={subKey} className="dropdown-column">
                          <ul>
                            <li>
                              <Link
                                state={subKey}
                                to={categories[key][subKey].path}
                                onClick={() => setActiveDropdown(null)}>
                                {subKey}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DropdownNav;
