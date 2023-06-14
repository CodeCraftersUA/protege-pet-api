// Dependencies
import { Response } from "express";

// Error
import AppError from "../../../../errors/AppError.js";

// UseCases
import UpdateAccountUseCase from "./UpdateAccountUseCase.js";
import { RequestWithAuth } from "../../../../models/request.js";


const updateAccountUseCase = new UpdateAccountUseCase();

class UpdateAccount {
  handler = async (req: RequestWithAuth, res: Response): Promise<void> => {
    if (!req.auth) throw new AppError("Internal server error", 500);

    const { cnpj, name } = req.body;
    const id = req.auth.id;

    const accountsInfo = await updateAccountUseCase.execute({
      id,
      cnpj,
      name,
    });

    res.status(200).json(accountsInfo);
  }
}

export default UpdateAccount;