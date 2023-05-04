// Dependencies
import express from "express";

// Controllers
import CreateAnimalController from "../modules/animal/useCases/createAnimal/CreateAnimalController.js";
import ListAnimalController from "../modules/animal/useCases/listAnimal/ListAnimalController.js";

// Middlewares
import { createAnimalValidate } from "../middlewares/validations/animal/animal.js";
import Authenticate from "../middlewares/authenticate.js";

// Models
import { UserType } from "../models/account.js";


const app = express();

const authenticateProtector = new Authenticate(UserType.PROTECTOR);
const createAnimalController = new CreateAnimalController();
const listAnimalController = new ListAnimalController();

app.post("", authenticateProtector.execute, createAnimalValidate, createAnimalController.handler);
app.get("", listAnimalController.handler);

export default app;