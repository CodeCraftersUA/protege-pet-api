// Dependencies
import { Response, Request } from "express";

// UseCases
import GetAnimalUseCase from "./GetAnimalUseCase.js";


const getAnimalUseCase = new GetAnimalUseCase();

class ListAnimalsController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const animal = await getAnimalUseCase.execute({ id });
    res.status(200).json(animal);
  }
}

export default ListAnimalsController;