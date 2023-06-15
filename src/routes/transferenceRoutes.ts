// Dependencies
import express from "express";
import { AccountType } from "@prisma/client";

// Controllers
import RequestTransferenceController from "../modules/transferences/useCases/RequestTransference/RequestTransferenceController.js";

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { requestTransferenceValidate } from "../middlewares/validations/transference/transference.js";

const app = express();

const authenticateProtector = new Authenticate(AccountType.PROTECTOR);

const requestTransferenceController = new RequestTransferenceController();


app.post("", authenticateProtector.execute, requestTransferenceValidate, requestTransferenceController.handler);

export default app;