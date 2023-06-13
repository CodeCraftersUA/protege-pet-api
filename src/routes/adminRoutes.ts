// Dependencies
import express from "express";

// Controllers
import ListAccountsController from "../modules/admin/useCases/listAccounts/ListAccountsController.js";

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { UserType } from "../models/account.js";

const app = express();

const listAccountsController = new ListAccountsController();
const authenticateAdmin = new Authenticate(UserType.admin);

app.get("/accounts", authenticateAdmin.execute, listAccountsController.handler);

export default app;