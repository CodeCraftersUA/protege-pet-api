// Dependencies
import { Response, Request } from "express";

// UseCases
import ListAccountsUseCase from "./ListAccountsUseCase.js";

// Helpers
import convertStringToBoolean from "../../../../helpers/convertStringToBoolean.js";
import getOffsetAndQuantity from "../../../../helpers/getOffsetAndQuantity.js";


const listAccountsUseCase = new ListAccountsUseCase();

class ListAccounts {
  handler = async (req: Request, res: Response): Promise<void> => {
    let { approved } = req.query;

    const formatedApproved = convertStringToBoolean(`${approved}`);

    const { offset, quantity } = getOffsetAndQuantity(req);

    const accountsInfo = await listAccountsUseCase.execute({
      approved: formatedApproved,
      offset,
      quantity
    });

    res.status(200).json(accountsInfo);
  }
}

export default ListAccounts;