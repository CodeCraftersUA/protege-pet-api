// Dependencies
import express from "express";

// Controllers
import AuthenticateUserController from "../modules/account/useCases/authenticateUser/AuthenticateUserController.js";
import CreateAccountController from "../modules/account/useCases/createAccount/CreateAccountController.js";
import UpdateAccountController from "../modules/account/useCases/updateAccount/UpdateAccountController.js";
import GetAccountController from "../modules/account/useCases/getAccount/GetAccountController.js";

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { loginValidate, createAccountValidate, updateAccountValidate } from "../middlewares/validations/account/account.js";

const app = express();

const authenticate = new Authenticate();

const authenticateUserController = new AuthenticateUserController();
const createAccountController = new CreateAccountController();
const updateAccountController = new UpdateAccountController();
const getAccountController = new GetAccountController();

app.post("/login", loginValidate, authenticateUserController.handler);
app.post("", createAccountValidate, createAccountController.handler);
app.patch("", authenticate.execute, updateAccountValidate, updateAccountController.handler);
app.get("/:id", authenticate.execute, getAccountController.handler)

export default app;