const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, URL } = require("./config");

//! CORS Connection ------------------------------
const cors = require("cors");

//!Midllesware ------------------------------
app.use(express.json());
app.use(cors());

//! Routers ------------------------------
const adminRouter = require("./Routers/AdminRouter");
const userRouter = require("./Routers/UserRouter");
const productsRouter = require("./Routers/ProductsRouter");
const cors = require("cors");

//! Middleware  ----------------------------------------
app.use(express.json());
app.use(cors());

//! Dynamically handle category-based routing
const validCategories = ["plants", "pots", "fertilizers"]; // Add more categories here

validCategories.forEach((category) => {
  app.use(`/${category}`, productsRouter); // Dynamically using the same router for all categories
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

app.get("/", (req, res) => {
  res.send("Parkkruthi");
});

//! Starting Server ------------------------------
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running at http://localhost:${PORT}`);
});
