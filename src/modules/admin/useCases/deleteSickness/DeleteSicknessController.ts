// Dependencies
import { Response, Request } from "express";

// UseCases
import DeleteSicknessUseCase from "./DeleteSicknessUseCase.js";


const deleteSicknessUseCase = new DeleteSicknessUseCase();

class DeleteSicknessController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    await deleteSicknessUseCase.execute({ id });

    res.sendStatus(200);
  }
}

export default DeleteSicknessController;