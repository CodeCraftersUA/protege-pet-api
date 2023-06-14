// Dependencies
import { Response, Request } from "express";

// UseCases
import ListAnimalUseCase from "./ListAnimalUseCase.js";

// Helpers
import getOffsetAndQuantity from "../../../../helpers/getOffsetAndQuantity.js";


const listAnimalUseCase = new ListAnimalUseCase();

class ListAnimalsController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { offset, quantity } = getOffsetAndQuantity(req);

    const animals = await listAnimalUseCase.execute({ offset, quantity });
    res.status(200).json(animals);
  }
}

export default ListAnimalsController;