// Dependencies
import { Response, Request } from "express";

// UseCases
import ListSicknessUseCase from "./ListSicknessUseCase.js";

// Helpers
import getOffsetAndQuantity from "../../../../helpers/getOffsetAndQuantity.js";
import { AnimalSpecie } from "@prisma/client";


const listSicknessUseCase = new ListSicknessUseCase();

class ListSicknessController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { offset, quantity } = getOffsetAndQuantity(req);
    let { specie } = req.query;

    const sickness = await listSicknessUseCase.execute({
      offset,
      quantity,
      specie: specie as AnimalSpecie | undefined
    });

    res.status(200).json(sickness);
  }
}

export default ListSicknessController;