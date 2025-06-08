import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import CardsComponent from "./CardsComponent.jsx";
import axios from "axios";

const CardsHomePage = () => {
  const { productType, category } = useParams();
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PRODUCTS_API = import.meta.env.VITE_PRODUCTS_API;

  useEffect(() => {
  const controller = new AbortController();

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${PRODUCTS_API}/${productType}/category/${category}`,
        { signal: controller.signal }
      );
      if (response.data.status === "Success") {
        setCategories(response.data.data.finalPayload);
      } else {
        setError("Failed to load categories");
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Fetch cancelled");
      } else {
        setError("An error occurred while fetching categories: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchCategories();

  // Cleanup: cancel ongoing request
  return () => controller.abort();
}, [productType, category]);


  return (
    <div className="lg:flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 w-full">
        <h1 className="text-2xl md:text-3xl font-bold capitalize px-4 md:px-8 py-5 border-b border-gray-300">
          {category && Categories.length > 0
            ? Categories[0].Category
            : `All ${productType}`}
        </h1>

        <div className="flex flex-col items-center justify-center px-2 sm:px-4 md:px-6">
          <CardsComponent
            Categories={Categories}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default CardsHomePage;
