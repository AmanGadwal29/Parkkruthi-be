import React from "react";

const ShimmerCard = () => {
  return (
    <div className="cursor-pointer w-full sm:w-[250px] md:w-[270px] lg:w-[260px] mx-auto overflow-hidden flex flex-col items-center justify-between bg-gray-50 rounded-lg transition-all duration-300 ease-in-out">
      <div className="w-full h-56 sm:h-64 lg:h-52 overflow-hidden shimmer mb-4 bg-gray-100"></div>
      <div className="w-full px-4 py-2 text-center">
        <div className="h-6 bg-gray-200 shimmer rounded-full mb-3 w-3/4 mx-auto"></div>
        <div className="mt-2 text-lg font-semibold">
          <div className="h-6 bg-gray-200 shimmer rounded-full mb-2 w-1/2 mx-auto"></div>
        </div>
        <div className="flex justify-center items-center mt-2 text-yellow-400 text-sm">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className="w-3 h-3 bg-gray-200 shimmer rounded-full mr-0.5"
            ></span>
          ))}
          <div className="h-4 bg-gray-200 shimmer rounded-full mb-2 w-1/3 mx-auto"></div>
        </div>
        <div className="mt-4">
          <div className="h-10 bg-gray-200 shimmer rounded-lg w-2/3 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

const ShimmerCards = () => {
  return (
    <div className="h-fit w-full overflow-hidden">
      <div className="grid grid-cols-1 my-[2rem] px-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
      <div className="flex justify-center my-5">
        <div
          className="mx-1 px-4 py-4 rounded-lg bg-gray-200 shimmer"
        ></div>
        <div
          className="mx-1 px-4 py-4 rounded-lg bg-gray-200 shimmer"
        ></div>
    </div>
    </div>
  );
};

export default ShimmerCards;
