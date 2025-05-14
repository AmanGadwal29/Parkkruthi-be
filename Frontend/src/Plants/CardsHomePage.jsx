import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Layout from "../Component/Layout/Layout.jsx";
import Sidebar from "./Sidebar.jsx";
import CardsComponent from "./CardsComponent.jsx";
import Shimmer from "./Shimmer.jsx";
import axios from "axios";

const CardsHomePage = () => {
  const { category, type } = useParams();
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PRODUCTS_API = import.meta.env.VITE_PRODUCTS_API;


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        let url = "";
        if (type) {
          url = `${PRODUCTS_API}/${category}/${type}`;
        } else {
          url = `${PRODUCTS_API}/${category}`;
        }

        const response = await axios.get(url);
        console.log("url: ", url);

        console.log(response.data.status);
        if (response.data.status === "Success") {
          console.log(response.data.data.finalPayload);
          const filteredData = type
            ? response.data.data.finalPayload.filter((cat) => cat.CategoryRoute === type)
            : response.data.data.finalPayload;
          setCategories(filteredData);
          console.log(filteredData);

        } else {
          setError("Failed to load categories");
        }
      } catch (error) {
        setError(
          "An error occurred while fetching categories: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [category, type]);


  return (
    <Layout>
      <div>
        <div className="lg:flex">
          <Sidebar />
          <div className="w-full h-[100%]">
            <h1 className="text-3xl font-bold capitalize p-5 pl-16 border-b-[1px] border-gray-300">
              {type ? Categories[0]?.Category : `All ${category}`}
            </h1>

            <div className="flex-1 flex flex-col items-center justify-center ">
              <CardsComponent
                Categories={Categories}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CardsHomePage;
