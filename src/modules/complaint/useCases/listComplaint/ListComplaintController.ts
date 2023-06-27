// Dependencies
import { Response, Request } from "express";
import { AnimalSpecie } from "@prisma/client";

// UseCases
import ListComplaintUseCase from "./ListComplaintUseCase.js";

// Helpers
import getOffsetAndQuantity from "../../../../helpers/getOffsetAndQuantity.js";


const listComplaintUseCase = new ListComplaintUseCase();

class ListComplaintController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { offset, quantity } = getOffsetAndQuantity(req);
    const { specie } = req.query;

    const animals = await listComplaintUseCase.execute({
      offset,
      quantity,
      specie: specie ? `${specie}` as AnimalSpecie : undefined,
    });
    res.status(200).json(animals);
  }
}

export default ListComplaintController;