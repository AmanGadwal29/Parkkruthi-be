const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, URL } = require("./config");
const adminRouter = require("./Routers/AdminRouter");
const userRouter = require("./Routers/UserRouter");
const plantsRouter = require("./Routers/PlantsRouter");
const potsRouter = require("./Routers/PotsRouter");
const cors = require("cors");
//!Midllesware  ----------------------------------------
app.use(express.json());

app.use(cors());
app.use("/adminsapi", adminRouter);
app.use("/usersapi", userRouter);
app.use("/plants", plantsRouter);
app.use("/pots", potsRouter);

//! Database Connection------------------------------
const connectDb = async () => {
  let prakrithiDb = await mongoose.connect(URL);
};
connectDb();

//!Routing-------------------------------------------
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server is running at http://localhost:${PORT}`);
});
