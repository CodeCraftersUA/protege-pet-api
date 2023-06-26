// Dependencies
import express from "express";

// Controllers
import CreateSicknessController from "../modules/admin/useCases/createSickness/CreateSicknessController.js";
import ListAccountsController from "../modules/admin/useCases/listAccounts/ListAccountsController.js";
import ListComplaintController from "../modules/admin/useCases/listComplaint/ListComplaintController.js";
import UpdateAccountController from "../modules/admin/useCases/updateApprovedAccount/UpdateAccountController.js";
import UpdateComplaintController from "../modules/admin/useCases/updateComplaint/UpdateComplaintController.js";

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { createSicknessValidate } from "../middlewares/validations/admin/sickness.js";
import { listComplaintValidate, updateComplaintValidate } from "../middlewares/validations/admin/complaints.js";
import { updateAccountValidate } from "../middlewares/validations/admin/account.js";

// Types
import { UserType } from "../models/account.js";

const app = express();

const listAccountsController = new ListAccountsController();
const updateAccountController = new UpdateAccountController();

const createSicknessController = new CreateSicknessController();

const listComplaintController = new ListComplaintController();
const updateComplaintController = new UpdateComplaintController();

const authenticateAdmin = new Authenticate(UserType.ADMIN);

app.get("/accounts", authenticateAdmin.execute, listAccountsController.handler);
app.patch("/accounts/:id", authenticateAdmin.execute, updateAccountValidate, updateAccountController.handler);

app.post("/sickness", authenticateAdmin.execute, createSicknessValidate, createSicknessController.handler);

app.get("/complaints", listComplaintValidate, authenticateAdmin.execute, listComplaintController.handler);
app.patch("/complaints/:id", updateComplaintValidate, authenticateAdmin.execute, updateComplaintController.handler);

export default app;