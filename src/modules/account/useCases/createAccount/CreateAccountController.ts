// Dependencies
import { Request, Response } from "express";

// UseCases
import CreateAccountUseCase from "./CreateAccountUseCase.js";

// Utils
import Crypto from "../../../../utils/Crypto.js";

const crypto = new Crypto();
const createAccountUseCase = new CreateAccountUseCase();

class CreateAccountController {
  handler = async (req: Request, res: Response) => {
    const userData = req.body;

    const encryptedPassword = await crypto.encrypt(userData.password);
    await createAccountUseCase.execute({
      ...userData,
      password: encryptedPassword
    });

    res.sendStatus(201);
  }
}

export default CreateAccountController;