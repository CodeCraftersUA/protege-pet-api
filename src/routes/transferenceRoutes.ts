// Dependencies
import express from "express";
import { AccountType } from "@prisma/client";

// Controllers
import RequestTransferenceController from "../modules/transferences/useCases/RequestTransference/RequestTransferenceController.js";
import ListTransferenceController from "../modules/transferences/useCases/ListTransference/ListTransferenceController.js";


// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { listTransferenceValidate, requestTransferenceValidate } from "../middlewares/validations/transference/transference.js";

const app = express();

const authenticate = new Authenticate();
const authenticateProtector = new Authenticate(AccountType.PROTECTOR);

const requestTransferenceController = new RequestTransferenceController();
const listTransferenceController = new ListTransferenceController()


app.post("", authenticateProtector.execute, requestTransferenceValidate, requestTransferenceController.handler);
app.get("", authenticate.execute, listTransferenceValidate, listTransferenceController.handler);

export default app;