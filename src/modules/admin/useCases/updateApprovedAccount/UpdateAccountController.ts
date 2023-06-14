// Dependencies
import { Response, Request } from "express";

// UseCases
import UpdateApprovedAccountUseCase from "./UpdateAccountUseCase.js";

// Helpers
import convertStringToBoolean from "../../../../helpers/convertStringToBoolean.js";
import getOffsetAndQuantity from "../../../../helpers/getOffsetAndQuantity.js";


const updateApprovedAccountUseCase = new UpdateApprovedAccountUseCase();

class ListAccounts {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { approved, cnpj, name, email } = req.body;

    const accountsInfo = await updateApprovedAccountUseCase.execute({
      id,
      approved,
      cnpj,
      name,
      email
    });

    res.status(200).json(accountsInfo);
  }
}

export default ListAccounts;