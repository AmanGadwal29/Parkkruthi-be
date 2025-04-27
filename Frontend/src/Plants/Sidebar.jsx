import { Link } from "react-router-dom";
import Layout from "../Component/Layout/Layout.jsx";
import { useState } from "react";

const Sidebar = () => {
  const [accordionOpen, setAccordionOpen] = useState({});
  const Category = {
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

  const toggleAccordion = (key) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* Mobile Horizontal Category Buttons */}
      <div className="lg:hidden outline block w-full overflow-hidden">
        <nav className="flex justify-start w-auto overflow-x-scroll gap-4 px-4 whitespace-nowrap">
          {Object.keys(Category).map((category) => (
            <button key={category} className="px-4 py-2 bg-green-100 rounded">
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Sidebar */}
      <div
        id="hs-sidebar-collapsible-group"
        className="hs-overlay [--auto-close:lg] lg:block w-64 transition-all duration-300 transform bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar">
        <div className="relative flex flex-col h-full max-h-full">
          {/* Header */}
          <header className="p-4 flex justify-between items-center gap-x-2">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Categories
            </h2>
            <div className="lg:hidden -me-2">
              <button
                type="button"
                className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full"
                data-hs-overlay="#hs-sidebar-collapsible-group">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </header>

          {/* Body */}
          <nav className="h-full overflow-y-auto px-2 pb-4 custom-scrollbar">
            <ul className="space-y-1">
              {Object.entries(Category).map(([category, subcategories]) => (
                <li key={category}>
                  <button
                    className="w-full flex items-center justify-between py-2 px-3 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    onClick={() => toggleAccordion(category)}>
                    {category}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24">
                      {accordionOpen[category] ? (
                        <path d="m18 15-6-6-6 6" />
                      ) : (
                        <path d="m6 9 6 6 6-6" />
                      )}
                    </svg>
                  </button>

                  {accordionOpen[category] &&
                    Object.keys(subcategories).length > 0 && (
                      <ul className="pl-4 space-y-1">
                        {Object.keys(subcategories).map((subcategory) => (
                          <li key={subcategory}>
                            <Link
                              to={subcategories[subcategory].path}
                              className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-lg">
                              {subcategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
