// Dependencies
import express from "express";

// Controllers
import ListAccountsController from "../modules/admin/useCases/listAccounts/ListAccountsController.js";
import UpdateAccountController from "../modules/admin/useCases/updateApprovedAccount/UpdateAccountController.js";
import CreateSicknessController from "../modules/admin/useCases/createSickness/CreateSicknessController.js";
import UpdateSicknessController from "../modules/admin/useCases/updateSickness/UpdateSicknessController.js";

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { updateAccountValidate } from "../middlewares/validations/admin/account.js";
import { createSicknessValidate, updateSicknessValidate } from "../middlewares/validations/admin/sickness.js";

// Types
import { UserType } from "../models/account.js";

const app = express();

const listAccountsController = new ListAccountsController();
const updateAccountController = new UpdateAccountController();

const createSicknessController = new CreateSicknessController();
const updateSicknessController = new UpdateSicknessController();

const authenticateAdmin = new Authenticate(UserType.ADMIN);

app.get("/accounts", authenticateAdmin.execute, listAccountsController.handler);
app.patch("/accounts/:id", authenticateAdmin.execute, updateAccountValidate, updateAccountController.handler);

app.post("/sickness", authenticateAdmin.execute, createSicknessValidate, createSicknessController.handler);
app.patch("/sickness/:id", authenticateAdmin.execute, updateSicknessValidate, updateSicknessController.handler);

export default app;