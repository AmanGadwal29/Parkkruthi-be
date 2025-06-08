import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const categories = [
  {
    name: "Plants",
    subcategories: [
      { label: "Flower Plants", path: "/plants/category/flowerplants" },
      { label: "Indoor Plants", path: "/plants/category/indoorplants" },
      { label: "Potted Plants", path: "/plants/category/pottedplants" },
      { label: "Special Plants", path: "/plants/category/specialplants" },
    ],
  },
  {
    name: "Pots",
    subcategories: [
      { label: "Plastic Pots", path: "/pots/category/plasticpots" },
      { label: "Mud Pots", path: "/pots/category/mudpots" },
    ],
  },
  {
    name: "Fertilizers",
    subcategories: [
      { label: "Organic Fertilizers", path: "/fertilizers/category/organicfertilizers" },
      { label: "Chemical Fertilizers", path: "/fertilizers/category/chemicalfertilizers" },
    ],
  },
];

const DropdownNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setExpandedCategory(null);
  };

  const toggleCategory = (name) => {
    setExpandedCategory((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-[#276139] flex justify-end">
        <button
          onClick={handleSidebarToggle}
          aria-label="Toggle sidebar"
          className="text-white"
        >
          {sidebarOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block w-full bg-[#276139] shadow relative z-50 select-none">
        <ul className="flex justify-center gap-12 px-6 py-4 text-lg font-semibold text-white">
          {categories.map(({ name, subcategories }) => (
            <li key={name} className="relative group cursor-pointer">
              <div className="flex items-center gap-1 hover:text-[#a4d2a0] transition select-none">
                {name}
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="text-xs transform group-hover:rotate-180 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[260px] bg-[#276139] rounded shadow-lg py-3 px-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                <ul className="flex flex-col gap-2">
                  {subcategories.map(({ label, path }) => (
                    <li key={label}>
                      <Link
                        to={path}
                        className="block text-[#d6f0d6] hover:text-white hover:bg-green-700 hover:pl-4 transition-all duration-200 rounded"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-[#276139] text-white z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={handleSidebarClose} aria-label="Close sidebar">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto px-4 pb-6">
          {categories.map(({ name, subcategories }) => (
            <div key={name} className="mb-2 border-b border-white/20">
              <button
                onClick={() => toggleCategory(name)}
                className="w-full text-left py-2 font-semibold flex justify-between items-center text-[#d6f0d6] hover:text-white transition-colors"
              >
                {name}
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`transition-transform duration-300 ${
                    expandedCategory === name ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedCategory === name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="pl-4 pb-2 space-y-1">
                  {subcategories.map(({ label, path }) => (
                    <li key={label}>
                      <Link
                        to={path}
                        onClick={handleSidebarClose}
                        className="block py-1 text-[#d6f0d6] hover:text-white hover:pl-2 transition-all"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleSidebarClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default DropdownNav;
