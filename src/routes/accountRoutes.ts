// Dependencies
import express from "express";

// Controllers
import AuthenticateUserController from "../modules/account/useCases/authenticateUser/AuthenticateUserController.js";
import CreateAccountController from "../modules/account/useCases/createAccount/CreateAccountController.js";
import UpdateAccountController from "../modules/account/useCases/updateAccount/UpdateAccountController.js";

// Middlewares
import Authenticate from "../middlewares/authenticate.js";
import { loginValidate, createAccountValidate, updateAccountValidate } from "../middlewares/validations/account/account.js";

const app = express();

const authenticate = new Authenticate();

const authenticateUserController = new AuthenticateUserController();
const createAccountController = new CreateAccountController();
const updateAccountController = new UpdateAccountController();

app.post("/login", loginValidate, authenticateUserController.handler);
app.post("", createAccountValidate, createAccountController.handler);
app.patch("", authenticate.execute, updateAccountValidate, updateAccountController.handler);

export default app;