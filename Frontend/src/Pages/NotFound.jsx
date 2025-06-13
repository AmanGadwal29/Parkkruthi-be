import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-80 w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <style>
        {`
          @keyframes fadeInSlide {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-in {
            animation: fadeInSlide 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className="text-center fade-in max-w-xl">
        <img
          src="https://illustrations.popsy.co/gray/error-404.svg"
          alt="404"
          className="w-72 mx-auto mb-8"
        />
        <h1 className="text-6xl font-extrabold text-green-600 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
