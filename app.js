import express from "express";
import mongoose from "mongoose";

import User_route from "./Route/userRouter.js";
import TechPartItem_route from "./Route/techPartItemRouter.js";
import orderRouter from "./Route/orderRouter.js";
const app = express();



app.use(express.json());




app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH"
    );

    return res.status(200).json({});
  }

  next();
});




app.use("/users", User_route);
app.use("/techPartItems", TechPartItem_route);

app.use("/orders", orderRouter);






const MONGO_URI =
  process.env.MONGO_URI ;

const PORT = process.env.PORT || 3000;


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((error) => {

    console.error(
      "Failed to connect to MongoDB:",
      error
    );

  });