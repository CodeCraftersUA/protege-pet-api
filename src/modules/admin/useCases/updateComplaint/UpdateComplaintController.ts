// Dependencies
import { Response, Request } from "express";
import { ComplaintStatus } from "@prisma/client";

// UseCases
import UpdateComplaintUseCase from "./UpdateComplaintUseCase.js";


const updateComplaintUseCase = new UpdateComplaintUseCase();

class UpdateComplaintController {
	handler = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params
		const { status } = req.body;

		const updatedComplaint = await updateComplaintUseCase.execute({
			id: id,
			status: status as ComplaintStatus,
		});

		res.status(201).json(updatedComplaint);
	}
}

export default UpdateComplaintController;