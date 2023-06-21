// Dependencies
import express from "express";

// Controllers
import CreateAnimalController from "../modules/animal/useCases/createAnimal/CreateAnimalController.js";
import ListAnimalController from "../modules/animal/useCases/listAnimal/ListAnimalController.js";
import UpdateAnimalController from "../modules/animal/useCases/updateAnimal/UpdateAnimalController.js";

// Middlewares
import { createAnimalValidate, listAnimalValidate, updateAnimalValidate } from "../middlewares/validations/animal/animal.js";
import Authenticate from "../middlewares/authenticate.js";

// Models
import { UserType } from "../models/account.js";


const app = express();

const authenticateProtector = new Authenticate(UserType.PROTECTOR);

const createAnimalController = new CreateAnimalController();
const listAnimalController = new ListAnimalController();
const updateAnimalController = new UpdateAnimalController();

app.post("", authenticateProtector.execute, createAnimalValidate, createAnimalController.handler);
app.get("", listAnimalValidate, listAnimalController.handler);
app.patch("/:id", updateAnimalValidate, authenticateProtector.execute, updateAnimalController.handler);

export default app;