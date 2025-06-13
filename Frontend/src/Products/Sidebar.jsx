import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
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

  useEffect(() => {
    const openState = {};
    Object.entries(Category).forEach(([category, subcategories]) => {
      const isMatch = Object.values(subcategories).some(({ path }) =>
        location.pathname.startsWith(path)
      );
      openState[category] = isMatch;
    });
    setAccordionOpen(openState);
  }, [location.pathname]);

  const handleMouseEnter = (category) => {
    setAccordionOpen((prev) => ({ ...prev, [category]: true }));
  };

  const handleMouseLeave = (category) => {
    const isActive = Object.values(Category[category]).some(({ path }) =>
      location.pathname.startsWith(path)
    );
    if (!isActive) {
      setAccordionOpen((prev) => ({ ...prev, [category]: false }));
    }
  };

  return (
    <div>
      <div
        className="hs-overlay lg:block hidden w-64 transition-all duration-300 transform bg-[#276139] text-white border-e h-full border-[#1d4d31]"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <header className="p-4 flex justify-between items-center gap-x-2">
            <h2 className="text-xl font-semibold">Categories</h2>
          </header>

          <nav className="h-full overflow-y-auto px-3 pb-4 custom-scrollbar">
            <ul className="space-y-1">
              {Object.entries(Category).map(([category, subcategories]) => {
                const isOpen = accordionOpen[category];

                return (
                  <li
                    key={category}
                    onMouseEnter={() => handleMouseEnter(category)}
                    onMouseLeave={() => handleMouseLeave(category)}
                  >
                    <div className="w-full flex items-center justify-between py-2 px-3 text-sm rounded-lg hover:bg-[#2a7c4c] transition-colors cursor-pointer">
                      <span>{category}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>

                    {/* Accordion with slow transition */}
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"
                      }`}
                    >
                      <ul className="pl-4 py-2 space-y-1">
                        {Object.entries(subcategories).map(([subcategory, { path }]) => (
                          <li key={subcategory}>
                            <Link
                              to={path}
                              className={`block py-2 px-3 text-sm rounded-lg transition-all duration-300 ${
                                location.pathname === path
                                  ? "bg-green-700 text-white"
                                  : "text-[#d6f0d6] hover:bg-[#378b5a] hover:text-white hover:pl-4"
                              }`}
                            >
                              {subcategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
