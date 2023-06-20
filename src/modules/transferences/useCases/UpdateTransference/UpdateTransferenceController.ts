// Dependencies
import { Response } from "express";

// Error
import AppError from "../../../../errors/AppError.js";

// UseCases
import UpdateTransferenceUseCase from "./UpdateTransferenceUseCase.js";
import { RequestWithAuth } from "../../../../models/request.js";

// Utils
import { getTransferenceAccountAssociation } from "../../../../utils/validations/getTransferenceAccountAssociation.js";
import { doesTransferenceCanBeUpdated } from "../../../../utils/validations/doesTransferenceCanBeUpdated.js";


const updateTransferenceUseCase = new UpdateTransferenceUseCase();

class UpdateTransferenceController {
  handler = async (req: RequestWithAuth, res: Response): Promise<void> => {
    if (!req.auth) throw new AppError("Internal server error", 500);

    const { id } = req.params;
    const { status } = req.body;
    const accountId = req.auth.id;

    const transfereceCanBeUpdated = await doesTransferenceCanBeUpdated({
      transferenceId: id
    });

    if (!transfereceCanBeUpdated)
      throw new AppError("Transference cannot be updated", 403)

    // Validate if transference status is allowed
    const transferenceAccountAssociation = await getTransferenceAccountAssociation({
      accountId,
      transferenceId: id
    });

    if (!transferenceAccountAssociation)
      throw new AppError("Update not allowed, could not locate transference", 403);

    if (transferenceAccountAssociation === "RECEIVER") {
      const receiverAllowedStatus = ["ACCEPTED", "REFUSED"];

      if (!receiverAllowedStatus.includes(status))
        throw new AppError("Status not allowed", 403);
    }

    if (transferenceAccountAssociation === "REQUESTER") {
      const receiverAllowedStatus = ["CANCELED"];

      if (!receiverAllowedStatus.includes(status))
        throw new AppError("Status not allowed", 403);
    }

    const accountsInfo = await updateTransferenceUseCase.execute({
      id,
      status,
    });

    res.status(200).json(accountsInfo);
  }
}

export default UpdateTransferenceController;