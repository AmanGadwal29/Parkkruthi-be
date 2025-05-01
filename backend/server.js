const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const { PORT, URL } = process.env;


//! CORS Connection ------------------------------
const cors = require("cors");

//!Midllesware ------------------------------
app.use(express.json());
app.use(cors());

//! Routers ------------------------------
const adminRouter = require("./Routers/AdminRouter");
const userRouter = require("./Routers/UserRouter");
const productsRouter = require("./Routers/ProductsRouter");

//! Dynamically handle category-based routing
const validCategories = ["plants", "pots", "fertilizers"]; 

validCategories.forEach((category) => {
  app.use(`/${category}`, productsRouter);
});

// Admin and User specific routes
app.use("/adminsapi", adminRouter);
app.use("/usersapi", userRouter);

//! Database Connection ------------------------------
const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
connectDb();

//! Routing-------------------------------------------
app.get("/", (req, res) => {
  res.send("Parkkruthi");
});

//! Starting Server ------------------------------
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running at http://localhost:${PORT}`);
});
