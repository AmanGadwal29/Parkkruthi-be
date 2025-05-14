import React, { useEffect, useState } from "react";
import "preline/preline.js";

const Sidebar4 = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [accordionOpen, setAccordionOpen] = useState({
    categories: false,
    plants: false,
    flowering: false,
  });

  const toggleAccordion = (key) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* Navigation Toggle */}
      {/* <div className="lg:hidden py-16 text-center">
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-gray-950 focus:outline-hidden focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-sidebar-collapsible-group"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-sidebar-collapsible-group"
        >
          Open
        </button>
      </div> */}
      {/* End Navigation Toggle */}
      {/* Sidebar */}
      <div className="lg:hidden block w-full overflow-hidden">
        <nav className="flex justify-start w-auto overflow-x-scroll gap-4 px-4 whitespace-nowrap">
          <button className="px-4 py-2 bg-green-100 rounded">
            Summer Flowering Plant
          </button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
          <button className="px-4 py-2 bg-green-100 rounded">abcd</button>
        </nav>
      </div>
      <div
        id="hs-sidebar-collapsible-group hidden lg:block"
        className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64
              transition-all duration-300 transform 
            hidden
             bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Header */}
          <header className="p-4 flex justify-between items-center gap-x-2">
            <a
              className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white"
              href="#"
              aria-label="Brand"
            ></a>

            <div className="lg:hidden -me-2">
              {/* Close Button */}
              <button
                type="button"
                className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                data-hs-overlay="#hs-sidebar-collapsible-group"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
              {/* End Close Button */}
            </div>
          </header>
          {/* End Header */}

          {/* Body */}

          <nav className="h-full overflow-y-auto px-2 pb-4 custom-scrollbar">
        <ul className="space-y-1">
          {/* Categories Accordion */}
          <li>
            <button
              className="w-full flex items-center justify-between py-2 px-3 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
              onClick={() => toggleAccordion("categories")}
            >
              Categories
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                {accordionOpen.categories ? (
                  <path d="m18 15-6-6-6 6" />
                ) : (
                  <path d="m6 9 6 6 6-6" />
                )}
              </svg>
            </button>

            {accordionOpen.categories && (
              <ul className="pl-4 space-y-1">
                {/* Plants Accordion */}
                <li>
                  <button
                    className="w-full flex items-center justify-between py-2 px-3 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    onClick={() => toggleAccordion("plants")}
                  >
                    Plants
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      {accordionOpen.plants ? (
                        <path d="m18 15-6-6-6 6" />
                      ) : (
                        <path d="m6 9 6 6 6-6" />
                      )}
                    </svg>
                  </button>

                  {accordionOpen.plants && (
                    <ul className="pl-4 space-y-1">
                      <li>
                        <a href="#" className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-lg">
                          Link 1
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-lg">
                          Link 2
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-lg">
                          Link 3
                        </a>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Flowering Accordion */}
                <li>
                  <button
                    className="w-full flex items-center justify-between py-2 px-3 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    onClick={() => toggleAccordion("flowering")}
                  >
                    Flowering Plants
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      {accordionOpen.flowering ? (
                        <path d="m18 15-6-6-6 6" />
                      ) : (
                        <path d="m6 9 6 6 6-6" />
                      )}
                    </svg>
                  </button>

                  {accordionOpen.flowering && (
                    <ul className="pl-4 space-y-1">
                      <li>
                        <a href="#" className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-lg">
                          Link 1
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-lg">
                          Link 2
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 rounded-lg">
                          Link 3
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
          {/* End Body */}
        </div>
      </div>
      {/* End Sidebar */}
    </div>
  );
};

export default Sidebar4;
