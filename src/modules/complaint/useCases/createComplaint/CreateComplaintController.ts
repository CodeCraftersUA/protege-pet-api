// Dependencies
import { Response, Request } from "express";

// UseCases
import CreateComplaintUseCase from "./CreateComplaintUseCase.js";


const createComplaintUseCase = new CreateComplaintUseCase();

class CreateComplaintController {
  handler = async (req: Request, res: Response): Promise<void> => {
    const complaintData = req.body;

    const createdComplaint = await createComplaintUseCase.execute({
      complaint: complaintData,
    });

    res.status(201).json(createdComplaint);
  }
}

export default CreateComplaintController;