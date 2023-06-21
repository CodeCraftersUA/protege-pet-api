// Dependencies
import express from "express";

// Controllers
import ListSicknessController from "../modules/sickness/useCases/listSickness/ListSicknessController.js";

// Middlewares
import { listSicknessValidate } from "../middlewares/validations/sickness/sickness.js";

const app = express();

const listSicknessController = new ListSicknessController();

app.get("", listSicknessValidate, listSicknessController.handler);

export default app;