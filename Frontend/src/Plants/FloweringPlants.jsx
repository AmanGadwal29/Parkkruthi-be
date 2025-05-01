import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar3 from "./Sidebar3.jsx";
import Layout from "../Component/Layout/Layout.jsx";
import PlantCard from "../Component/Other/Carousel2/PlantsCard.jsx";

const FloweringPlants = () => {
  const categories = {
    Plants: {
      "Flower Plants": { path: "/flower-plants" },
      "Indoor Plants": { path: "/indoor-plants" },
      "Potted Plants": { path: "/potted-plants" },
      "Special Plants": { path: "/special-plants" },
    },
    Pots: {
      "Plastic Pots": { path: "/plastic-pots" },
      "Mud Pots": { path: "/mud-pots" },
    },
    "Soil & More": {},
    "Home Decor Plants": {},
    Seeds: {},
    Tools: {},
    Gifting: {},
    "Bulk Gifting": {},
    Others: {},
    Sale: {},
    "Best Sellers": {},
    "Plant Stands": {},
    Blog: {},
  };

  const plants = [
    { id: 1, name: "Aloe Vera", price: "₹80", image: "/plant_images/1.avif" },
    { id: 2, name: "Fiddle Leaf Fig", price: "₹199", image: "/plant_images/1.avif" },
    { id: 3, name: "Snake Plant", price: "₹149", image: "/plant_images/1.avif" },
    { id: 4, name: "Peace Lily", price: "₹175", image: "/plant_images/1.avif" },
    { id: 5, name: "Spider Plant", price: "₹129", image: "/plant_images/1.avif" },
    { id: 6, name: "Pothos", price: "₹90", image: "/plant_images/1.avif" },
    { id: 7, name: "Pothos", price: "₹90", image: "/plant_images/1.avif" },
  ];

  const location = useLocation();
  const Name = location.state || "Plants";

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold capitalize p-5">{Name}</h1>

        <div className="lg:flex">
          <Sidebar3 categories={categories} />
          <div className="flex-1 h-[100svh] hide-scrollbar overflow-auto">
            <div className="w-full mt-[2rem] px-2 grid grid-cols-2 md:grid-cols-3 md:gap-3">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  name={plant.name}
                  price={plant.price}
                  image={plant.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FloweringPlants;
