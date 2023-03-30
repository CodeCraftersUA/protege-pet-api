// Dependencies
import express from "express";

const app = express();

// Controllers
import { fetchProtectors, fetchProtector } from "../controllers/protector.js";

// Middlewares
import { postValidate } from "../middlewares/validations/protector.js";


app.get("", async (req, res) => {
  const protectors = await fetchProtectors();

  res.status(200).json(protectors);
});

app.get("/:id", async (req, res) => {
  const protectorId = req.params.id;
  const protector = await fetchProtector(protectorId);

  res.status(200).json(protector);
});

app.patch("", (req, res) => {

});

app.post("", postValidate, (req, res) => {
  const newProtector = req.body;
  res.status(201).send(newProtector);
});

export default app;