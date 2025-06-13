import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";

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

  // Skeleton shimmer style
  const shimmerStyle = `
    .shimmer {
      position: relative;
      overflow: hidden;
      background: #f6f7f8;
      background-image: linear-gradient(
        90deg,
        #f6f7f8 0px,
        #edeef1 40px,
        #f6f7f8 80px
      );
      background-size: 600px 100%;
      animation: shimmer 1.5s infinite linear;
    }
    @keyframes shimmer {
      0% {
        background-position: -600px 0;
      }
      100% {
        background-position: 600px 0;
      }
    }
  `;

  const ProductCardSkeleton = () => (
    <div className="rounded-lg border shadow-md p-4 shimmer flex flex-col gap-4 h-72 w-full sm:w-auto">
      <div className="h-36 bg-gray-300 rounded-lg"></div>
      <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <>
        <style>{shimmerStyle}</style>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2 sm:p-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </>
    );
  }

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
      <style>{shimmerStyle}</style>

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
