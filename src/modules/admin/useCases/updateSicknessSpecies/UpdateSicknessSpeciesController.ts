// Dependencies
import { Response, Request } from "express";
import { AnimalSpecie } from "@prisma/client";

// UseCases
import UpdateSicknessSpeciesUseCase from "./UpdateSicknessSpeciesUseCase.js";
import AppError from "../../../../errors/AppError.js";

const updateSicknessSpeciesUseCase = new UpdateSicknessSpeciesUseCase();

class UpdateSicknessSpeciesController {
	handler = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const species = req.body;

		if (!species.length) throw new AppError("Species cannot be empty", 400);

		const updatedSicknessSpecies = await updateSicknessSpeciesUseCase.execute({
			id: id,
			species: species as AnimalSpecie[],
		});

		res.status(201).json(updatedSicknessSpecies);
	}
}

export default UpdateSicknessSpeciesController;