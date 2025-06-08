import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [accordionOpen, setAccordionOpen] = useState({});
  const Category = {
    Plants: {
      "Flower Plants": { path: "/plants/category/flowerplants" },
      "Indoor Plants": { path: "/plants/category/indoorplants" },
      "Potted Plants": { path: "/plants/category/pottedplants" },
      "Special Plants": { path: "/plants/category/specialplants" },
    },
    Pots: {
      "Plastic Pots": { path: "/pots/category/plasticpots" },
      "Mud Pots": { path: "/pots/category/mudpots" },
    },
    Fertilizers: {
      "Organic Fertilizers": { path: "/fertilizers/category/organicfertilizers" },
      "Chemical Fertilizers": { path: "/fertilizers/category/chemicalfertilizers" },
    }
  };

  const toggleAccordion = (key) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* Sidebar - visible only on large screens and above */}
      <div
        className="hs-overlay lg:block hidden w-64 transition-all duration-300 transform bg-white border-e h-full border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Header */}
          <header className="p-4 flex justify-between items-center gap-x-2">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Categories
            </h2>
          </header>

          {/* Body */}
          <nav className="h-full overflow-y-auto px-2 pb-4 custom-scrollbar">
            <ul className="space-y-1">
              {Object.entries(Category).map(([category, subcategories]) => (
                <li key={category}>
                  <button
                    className="w-full flex items-center justify-between py-2 px-3 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    onClick={() => toggleAccordion(category)}
                  >
                    {category}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
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
                              className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-lg"
                            >
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
