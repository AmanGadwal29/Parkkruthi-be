import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";

const CategoryType = () => {
  const { category } = useParams();
  console.log(category);
  return (
    <Layout>
      <h1>{category}</h1>
    </Layout>
  );
};

export default CategoryType;
