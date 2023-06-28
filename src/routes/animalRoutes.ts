// Dependencies
import express from "express";

// Controllers
import CreateAnimalController from "../modules/animal/useCases/createAnimal/CreateAnimalController.js";
import DeleteAnimalController from "../modules/animal/useCases/deleteAnimal/DeleteAnimalController.js";
import GetAnimalController from "../modules/animal/useCases/getAnimal/GetAnimalController.js";
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
const deleteAnimalController = new DeleteAnimalController();
const getAnimalController = new GetAnimalController();
const listAnimalController = new ListAnimalController();
const updateAnimalController = new UpdateAnimalController();

app.post("", authenticateProtector.execute, createAnimalValidate, createAnimalController.handler);
app.get("", listAnimalValidate, listAnimalController.handler);
app.get("/:id", getAnimalController.handler);
app.patch("/:id", updateAnimalValidate, authenticateProtector.execute, updateAnimalController.handler);
app.delete("/:id", authenticateProtector.execute, deleteAnimalController.handler);

export default app;