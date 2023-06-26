// Dependencies
import express from "express";

// Controllers
import CreateComplaintController from "../modules/complaint/useCases/createComplaint/CreateComplaintController.js";
import ListComplaintController from "../modules/complaint/useCases/listComplaint/ListComplaintController.js";

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { createComplaintValidate } from "../middlewares/validations/complaint/complaint.js";

// Types
import { UserType } from "../models/account.js";

const app = express();

const authenticateProtector = new Authenticate(UserType.PROTECTOR);

const createComplaintController = new CreateComplaintController();
const listComplaintController = new ListComplaintController();


app.get("", authenticateProtector.execute, listComplaintController.handler);
app.post("", createComplaintValidate, createComplaintController.handler);

export default app;