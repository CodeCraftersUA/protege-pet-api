// Dependencies
import { Response, Request } from "express";

// UseCases
import ListAnimalUseCase from "./ListAnimalUseCase.js";

// Helpers
import getOffsetAndQuantity from "../../../../helpers/getOffsetAndQuantity.js";
import { AnimalGender, AnimalSpecie } from "@prisma/client";


const listAnimalUseCase = new ListAnimalUseCase();

class ListAnimalsController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { offset, quantity } = getOffsetAndQuantity(req);
    const { gender, specie, owner } = req.query;

    const animals = await listAnimalUseCase.execute({
      offset,
      quantity,
      gender: gender ? `${gender}` as AnimalGender : undefined,
      specie: specie ? `${specie}` as AnimalSpecie : undefined,
      accountId: owner ? `${owner}` : undefined
    });
    res.status(200).json(animals);
  }
}

export default ListAnimalsController;