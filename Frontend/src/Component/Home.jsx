import React, { useEffect, useState } from "react";
import Carousel from "./Other/Carousel/Carousel.jsx";
import PopularCateg from "./Other/PopularCateg/PopularCategory.jsx";
import Carousel3 from "./Other/Carousel/Carousel3.jsx";
import Testimonials from "./Other/Review/Testimonials.jsx";
import Faq from "./Other/Faq/Faq.jsx";

const Home = () => {
  return (
    <div className="w-full h-fit">
      <Carousel />
      <PopularCateg />
      <Carousel3 />
      <Testimonials />
      <Faq />
    </div>
  );
};

export default Home;
