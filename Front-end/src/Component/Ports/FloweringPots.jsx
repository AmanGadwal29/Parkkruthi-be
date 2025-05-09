import React, { useEffect } from "react";

import Sidebar4 from "./Sidebar4.jsx";
import Layout from "../Layout/Layout.jsx";
import PortCards from "./PortCards.jsx";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";

const FloweringPots = () => {
  const ports = [
    { id: 1, name: "Aloe Vera", price: "₹80", image: "/ports/1.avif" },
    {
      id: 2,
      name: "Fiddle Leaf Fig",
      price: "₹199",
      image: "/ports/1.avif",
    },
    {
      id: 3,
      name: "Snake port",
      price: "₹149",
      image: "/ports/1.avif",
    },
    { id: 4, name: "Peace Lily", price: "₹175", image: "/ports/1.avif" },
    {
      id: 5,
      name: "Spider port",
      price: "₹129",
      image: "/ports/1.avif",
    },
    { id: 6, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 7, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 8, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 9, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 10, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 11, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 12, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 13, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 14, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 15, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
    { id: 16, name: "Pothos", price: "₹90", image: "/ports/1.avif" },
  ];

  const category = useParams();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin?.token;

    axios
      .get(`http://localhost:3000/portsapi/showports/${category.category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // set your state here if needed
      })
      .catch((err) => {
        console.error(err);
        // optional: redirect to login or show unauthorized message
      });
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="my-5">Flowering ports</h1>
        <div className="lg:flex">
          <div>
            <Sidebar4 />
          </div>
          <div className="flex-1 h-[100svh] hide-scrollbar overflow-auto">
            <div className="w-full mt-[2rem] px-2 grid grid-cols-2 md:grid-cols-4 md:gap-4 ">
              {ports.map((port) => (
                <portCard
                  key={port.id}
                  name={port.name}
                  price={port.price}
                  image={port.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FloweringPots;
