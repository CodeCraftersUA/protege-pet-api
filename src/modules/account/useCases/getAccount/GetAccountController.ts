// Dependencies
import { Response } from "express";

// Error
import AppError from "../../../../errors/AppError.js";

// UseCases
import { RequestWithAuth } from "../../../../models/request.js";
import GetAccountUseCase from "./GetAccountUseCase.js";


const getAccountUseCase = new GetAccountUseCase();

class GetAccountController {
  handler = async (req: RequestWithAuth, res: Response): Promise<void> => {
    if (!req.auth) throw new AppError("Internal server error", 500);

    const id = req.params.id;

    const accountsInfo = await getAccountUseCase.execute({
      id
    });

    res.status(200).json(accountsInfo);
  }
}

export default GetAccountController;