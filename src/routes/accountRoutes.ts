// Dependencies
import express from "express";

// Controllers
import AuthenticateUserController from "../modules/account/useCases/authenticateUser/AuthenticateUserController.ts";
import CreateAccountController from "../modules/account/useCases/createAccount/CreateAccountController.ts";

// Middlewares
import { loginValidate, createAccountValidate } from "../middlewares/validations/account/account.ts";

const app = express();

const authenticateUserController = new AuthenticateUserController();
const createAccountController = new CreateAccountController();

app.post("/login", loginValidate, authenticateUserController.handler);
app.post("", createAccountValidate, createAccountController.handler);

export default app;