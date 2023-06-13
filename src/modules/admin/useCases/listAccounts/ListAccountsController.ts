// Dependencies
import { Response, Request } from "express";

// UseCases
import ListAccountsUseCase from "./ListAccountsUseCase.js";


const listAccountsUseCase = new ListAccountsUseCase();

class ListAccounts {
	handler = async (req: Request, res: Response): Promise<void> => {
		let { approved } = req.params;
		const mustBeApproved = approved === "true" ? true : false;

		const accounts = await listAccountsUseCase.execute({
			approved: mustBeApproved
		});
		res.status(200).json(accounts);
	}
}

export default ListAccounts;