// Dependencies
import express from "express";

// Controllers
import ListAccountsController from "../modules/admin/useCases/listAccounts/ListAccountsController.js";
import UpdateAccountController from "../modules/admin/useCases/updateApprovedAccount/UpdateAccountController.js"

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { updateAccountValidate } from "../middlewares/validations/admin/account.js";

// Types
import { UserType } from "../models/account.js";

const app = express();

const listAccountsController = new ListAccountsController();
const updateAccountController = new UpdateAccountController();

const authenticateAdmin = new Authenticate(UserType.ADMIN);

app.get("/accounts", authenticateAdmin.execute, listAccountsController.handler);
app.patch("/accounts/:id", authenticateAdmin.execute, updateAccountValidate, updateAccountController.handler);

export default app;