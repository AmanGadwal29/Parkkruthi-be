import React from "react";

const Button = ({ text, color = "#3AA560", onClick,}) => {
  return (
    <button
      onClick={onClick}
      className={`font-semibold relative px-5 py-2 rounded-lg border-none text-white cursor-pointer transition-transform duration-200 active:scale-95 font-poppins`}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};

export default Button;
