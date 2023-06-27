// Dependencies
import { Response, Request } from "express";

// UseCases
import ListComplaintUseCase from "./ListComplaintUseCase.js";

// Helpers
import convertStringToBoolean from "../../../../helpers/convertStringToBoolean.js";
import getOffsetAndQuantity from "../../../../helpers/getOffsetAndQuantity.js";
import { ComplaintStatus } from "@prisma/client";


const listComplaintUseCaes = new ListComplaintUseCase();

class ListComplaintsController {
  handler = async (req: Request, res: Response): Promise<void> => {
    let { status } = req.query;


    if (status !== undefined)
      if (!Array.isArray(status))
        status = [status as ComplaintStatus]


    const { offset, quantity } = getOffsetAndQuantity(req);

    const complaints = await listComplaintUseCaes.execute({
      status: status as ComplaintStatus[] | undefined,
      offset,
      quantity
    });

    res.status(200).json(complaints);
  }
}

export default ListComplaintsController;