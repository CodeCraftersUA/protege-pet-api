// Dependencies
import { Response, Request } from "express";

// UseCases
import UpdateAccountUseCase from "../../../account/useCases/updateAccount/UpdateAccountUseCase.js";


const updateAccountUseCase = new UpdateAccountUseCase();

class UpdateAccount {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { approved, cnpj, name, email } = req.body;

    const accountsInfo = await updateAccountUseCase.execute({
      id,
      approved,
      cnpj,
      name,
      email,
      asAdmin: true
    });

    res.status(200).json(accountsInfo);
  }
}

export default UpdateAccount;