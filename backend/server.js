const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, URL } = require("./config");

//! Routers -------------------------------------------
const adminRouter = require("./Routers/AdminRouter");
const userRouter = require("./Routers/UserRouter");
const productRouter = require("./Routers/ProductsRouter");

//! CORS Connection -------------------------------------------
const cors = require("cors");

//!Midllesware  -------------------------------------------
app.use(express.json());
app.use(cors());

//! API -------------------------------------------
//? Version-1
//* Consumers
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/users", userRouter);

//* Products
app.use("/api/v1/products/:productType", productRouter);

//! Database Connection -------------------------------------------
const connectDb = async () => {
  const parkkruthiDb = await mongoose.connect(URL);
};
connectDb();

//!Routing -------------------------------------------
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`http://localhost:${PORT}`);
});
