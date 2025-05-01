import React from "react";
import { Link } from "react-router-dom";
import "./PopularCateg.css";

// Import images
import popcat1 from "/popcat1.avif";
import popcat2 from "/popcat2.avif";
import popcat3 from "/popcat3.avif";
import popcat4 from "/popcat4.avif";
import popcat5 from "/popcat5.avif";
import popcat6 from "/popcat6.avif";

const PopularCateg = () => {
  const categories = [
    { id: 1, name: "Flowering Plants", image: popcat1, path: "/flowering-plants" },
    { id: 2, name: "Indoor Plants", image: popcat2, path: "/indoor-plants" },
    { id: 3, name: "Potted Plants", image: popcat3, path: "/potted-plants" },
    { id: 4, name: "Special Plant Combos", image: popcat4, path: "/special-plant-combos" },
    { id: 5, name: "Pots", image: popcat5, path: "/pots" },
    { id: 6, name: "Soil & More", image: popcat6, path: "/soil-and-more" },
  ];

  return (
    <div className="px-8 my-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Popular Categories</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link key={category.id} to={category.path} className="category-item">
            <div>
              <div className="category-image-container">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
              </div>
              <p className="category-name">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCateg;
