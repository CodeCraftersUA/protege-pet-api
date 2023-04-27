// Dependencies
import express from "express";

// Controllers
import CreateAnimalController from "../modules/animal/useCases/createAnimal/CreateAnimalController.js";

// Middlewares
import { createAnimalValidate } from "../middlewares/validations/animal/animal.js";
import Authenticate from "../middlewares/authenticate.js";

// Models
import { UserType } from "../models/account.js";


const app = express();

const authenticateProtector = new Authenticate(UserType.PROTECTOR);
const createAnimalController = new CreateAnimalController();

app.post("", authenticateProtector.execute, createAnimalValidate, createAnimalController.handler);

export default app;