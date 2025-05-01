import React from 'react';

const Button = () => {
  return (
    <div className="flex justify-center items-center mt-4 mb-8">
      <button className="flex items-center group justify-end px-2 w-48 h-[50px] rounded-full border border-green-500 bg-green-800 cursor-pointer overflow-hidden relative">
        <span className="flex items-center justify-center w-10 h-9 bg-white rounded-full transition-all duration-300 ease-in-out group-hover:w-[94%] absolute left-[6px] top-[6px]">
          <img 
            width="24" 
            height="24" 
            src="https://img.icons8.com/color/48/add-shopping-cart--v1.png" 
            alt="add-shopping-cart--v1" 
            className="transition-all duration-300 ease-in-out"
          />
        </span>
        <p className="text-white text-nowrap ml-5 z-10 text-md transition-all duration-300 ease-in-out group-hover:translate-x-full group-hover:text-transparent w-full">
          Add To Cart
        </p>
      </button>
    </div>
  );
};

export default Button;
