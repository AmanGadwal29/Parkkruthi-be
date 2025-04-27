import React, { useState, useEffect } from "react";
import PlantCard from "./PlantsCard.jsx";
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

  if (Categories.length === 0) {
    return <div className="flex justify-center items-center w-full h-64 bg-inherit">
    <div className="text-center px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-500">Item Not Available</h2>
      <p className="mt-4 text-lg text-gray-400">Sorry, the item you're looking for is currently out of stock or unavailable.</p>
    </div>
  </div>;
  }

  if (loading) {
    return <Shimmer />;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">
          Something went wrong, please try again.
        </h2>
      </div>
    );
  }

  const totalPages = Math.ceil(Categories.length / itemsPerPage);

  return (
    <div className="flex-1 h-fit hide-scrollbar w-full relative">
      <div className="w-full mt-[2rem] px-2 grid grid-cols-2 md:grid-cols-3 md:gap-3">
        {displayCategories.map((category) => (
          <PlantCard
            key={category._id}
            name={category.Title}
            price={category.Price}
            image={category.Image}
          />
        ))}
      </div>

      <div className="flex justify-center my-5">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`mx-1 px-3 py-1 rounded-lg ${
                currentPage === pageNum
                  ? "bg-[#2C8A4F] text-white" // Darker green for active state
                  : "bg-[#aaeec1] hover:bg-[#3AA560] hover:text-white" // Lighter green for hover effect
              }`}>
              {pageNum}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CardsComponent;
