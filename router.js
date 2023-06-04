import express from "express";
import * as dotenv from "dotenv";

import { Configuration, OpenAIApi } from "openai";
import {
  registerRouter,
  userDataRouter,
  loginRouter,
} from "./routes/auth.routes.js";

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALLE.E ROUTES" });
});

router.post("/customizer/api/dalle", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image, message: "This works" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/auth/register", registerRouter);
// router.post("/auth/login", loginRouter);
// router.post("/auth/userData", userDataRouter);

export default router;
