import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./routes/router";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connect to DB");
  })
  .catch((e) => console.log(e));

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());

app.use("/", router);
