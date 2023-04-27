// Dependencies
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

// Routes
import accountRoutes from "./routes/accountRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";

// Middlewares
import { handleAppErrors } from "./middlewares/handleAppErrors.js";

dotenv.config(); // Config dotenv
const PORT = process.env.PORT || 3000; // API listen port

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/account", accountRoutes);
app.use("/animal", animalRoutes);

// Default middlewares
app.use(handleAppErrors);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`API running at: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
start();