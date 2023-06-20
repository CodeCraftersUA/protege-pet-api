// Dependencies
import express from "express";
import { AccountType } from "@prisma/client";

// Controllers
import RequestTransferenceController from "../modules/transferences/useCases/RequestTransference/RequestTransferenceController.js";
import ListTransferenceController from "../modules/transferences/useCases/ListTransference/ListTransferenceController.js";
import UpdateTransferenceController from "../modules/transferences/useCases/UpdateTransference/UpdateTransferenceController.js";

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { listTransferenceValidate, requestTransferenceValidate, updateTransferenceValidate } from "../middlewares/validations/transference/transference.js";

const app = express();

const authenticate = new Authenticate();
const authenticateProtector = new Authenticate(AccountType.PROTECTOR);

const requestTransferenceController = new RequestTransferenceController();
const listTransferenceController = new ListTransferenceController();
const updateTransferenceUseCase = new UpdateTransferenceController();


app.post("", authenticateProtector.execute, requestTransferenceValidate, requestTransferenceController.handler);
app.get("", authenticate.execute, listTransferenceValidate, listTransferenceController.handler);
app.patch("/:id", authenticateProtector.execute, updateTransferenceValidate, updateTransferenceUseCase.handler);

export default app;