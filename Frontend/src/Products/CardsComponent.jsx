import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import Shimmer from "./Shimmer.jsx";

const CardsComponent = ({ Categories, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [displayCategories, setDisplayCategories] = useState([]);

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    const currentItems = Categories?.slice(offset, offset + itemsPerPage);
    setDisplayCategories(currentItems);
  }, [currentPage, Categories]);

  const totalPages = Math.ceil(Categories.length / itemsPerPage);

  if (loading) return <Shimmer />;

  if (error || Categories.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-64 bg-inherit px-4 text-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-500">Item Not Available</h2>
          <p className="mt-4 text-lg text-gray-400">
            Sorry, the item you're looking for is currently out of stock or unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-fit relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2 sm:p-4">
        {displayCategories.map((category) => (
          <ProductCard
            key={category?._id}
            id={category?._id}
            title={category?.Title}
            description={category?.Description}
            price={category?.Price}
            ImageURL={category?.ImageURL[0]}
            stocks={category?.Stocks}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-6 flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${
              currentPage === pageNum
                ? "bg-[#2C8A4F] text-white"
                : "bg-[#aaeec1] hover:bg-[#3AA560] hover:text-white"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardsComponent;
