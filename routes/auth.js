// Dependencies
import express from "express";
const app = express();

// Controllers
import { generateUserToken } from "../controllers/auth.js";

// Middlewares
import { loginValidate } from "../middlewares/validations/auth.js";


app.post("/login", loginValidate, async (req, res) => {
  const { email, password } = req.body;

  const token = await generateUserToken({ email, password });

  res.status(200).json({ token: `bearer ${token}` });
});

export default app;