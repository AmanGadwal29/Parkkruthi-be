const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, URL } = require("./config");
require("dotenv").config();

//! CORS Connection -------------------------------------------
const cors = require("cors");

//! Notification-------------------------------------------
const pushNotification = require("./pushNotification");

//!Midllesware  -------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//! Routers -------------------------------------------
const adminRouter = require("./Routers/AdminRouter");
const userRouter = require("./Routers/UserRouter");
const productRouter = require("./Routers/ProductsRouter");
const cartRouter = require("./Routers/CartRouter");
const addressRouter = require("./Routers/AddressRouter");

//! API -------------------------------------------
//! Version-1
//? Consumers
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/users", userRouter);
//? Products
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
//? Addresses
app.use("/api/v1/addresses", addressRouter);

//! Database Connection -------------------------------------------
const connectDb = async () => {
  const parkkruthiDb = await mongoose.connect(URL);
};
connectDb();

//! Routing -------------------------------------------
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome...", PUBLIC_KEY: process.env.PUBLIC_KEY });
});

//! Running the Server -------------------------------------------
app.listen(PORT, (err) => {
  if (err) throw err;
});
