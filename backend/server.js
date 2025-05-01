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
const plantsRouter = require("./Routers/PlantsRouter");
const potsRouter = require("./Routers/PotsRouter");
const fertilizersRouter = require("./Routers/FertilizersRouter");

//! Static API Paths
//? API Version-1
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/plants", plantsRouter);
app.use("/api/v1/pots", potsRouter);
app.use("/api/v1/fertilizers", fertilizersRouter);

//! Database Connection ------------------------------
const connectDb = async () => {
  let prakrithiDb = await mongoose.connect(URL);
};
connectDb();

//!Home Response ------------------------------
app.get("/", (req, res) => {
  res.send("Parkkruthi");
});

//! Starting Server ------------------------------
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server is running at http://localhost:${PORT}`);
});
