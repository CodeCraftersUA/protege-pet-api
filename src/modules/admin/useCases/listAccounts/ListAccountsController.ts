// Dependencies
import { Response, Request } from "express";

// UseCases
import ListAccountsUseCase from "./ListAccountsUseCase.js";

// Helpers
import convertStringToBoolean from "../../../../helpers/convertStringToBoolean.js";

const MAX_QUATITY_FILTER = 100;

const listAccountsUseCase = new ListAccountsUseCase();

class ListAccounts {
  handler = async (req: Request, res: Response): Promise<void> => {
    let { approved, offset, quantity } = req.query;

    const formatedApproved = convertStringToBoolean(`${approved}`);
    const formatedOffset = Number(offset);
    const formatedQuantity = Number(quantity) > MAX_QUATITY_FILTER ? MAX_QUATITY_FILTER : Number(quantity);

    const accountsInfo = await listAccountsUseCase.execute({
      approved: formatedApproved,
      offset: isNaN(formatedOffset) ? 0 : formatedOffset,
      quantity: isNaN(formatedQuantity) ? MAX_QUATITY_FILTER : formatedQuantity
    });

    res.status(200).json(accountsInfo);
  }
}

export default ListAccounts;