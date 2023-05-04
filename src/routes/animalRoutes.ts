// Dependencies
import express from "express";

// Controllers
import CreateAnimalController from "../modules/animal/useCases/createAnimal/CreateAnimalController.ts";
import ListAnimalController from "../modules/animal/useCases/listAnimal/ListAnimalController.ts";

// Middlewares
import { createAnimalValidate } from "../middlewares/validations/animal/animal.ts";
import Authenticate from "../middlewares/authenticate.ts";

// Models
import { UserType } from "../models/account.ts";


const app = express();

const authenticateProtector = new Authenticate(UserType.PROTECTOR);
const createAnimalController = new CreateAnimalController();
const listAnimalController = new ListAnimalController();

app.post("", authenticateProtector.execute, createAnimalValidate, createAnimalController.handler);
app.get("", listAnimalController.handler);

export default app;