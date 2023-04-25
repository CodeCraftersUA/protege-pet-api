// Dependencies
import { Request, Response } from "express";

// UseCases
import CreateAccountUseCase from "./CreateAccountUseCase.js";

class CreateAccountController {
  handler = async (req: Request, res: Response) => {
    const createAccountUseCase = new CreateAccountUseCase();
    await createAccountUseCase.execute(req.body);

    res.sendStatus(201);
  }
}

export default CreateAccountController;