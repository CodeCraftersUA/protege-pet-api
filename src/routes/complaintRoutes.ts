// Dependencies
import express from "express";

// Controllers
import CreateComplaintController from "../modules/complaint/useCases/createComplaint/CreateComplaintController.js";

// Middlewares
//import Authenticate from "../middlewares/authenticate.js";
import { createComplaintValidate } from "../middlewares/validations/complaint/complaint.js";

// Types
import { UserType } from "../models/account.js";

const app = express();

const createComplaintController = new CreateComplaintController();

//const authenticateAdmin = new Authenticate(UserType.ADMIN);

app.post("", createComplaintValidate, createComplaintController.handler);

export default app;