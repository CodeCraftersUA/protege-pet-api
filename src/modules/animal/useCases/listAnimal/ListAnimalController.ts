// Dependencies
import { Response, Request } from "express";

// UseCases
import ListAnimalUseCase from "./ListAnimalUseCase.ts";


const listAnimalUseCase = new ListAnimalUseCase();

class ListAnimalsController {
	handler = async (req: Request, res: Response): Promise<void> => {	
		const animals = await listAnimalUseCase.execute();
		res.status(200).json(animals);
	}
}

export default ListAnimalsController;