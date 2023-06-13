// Dependencies
import { PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';

// Models
import Animal from '../../../../models/animal.js';


const prisma = new PrismaClient();

class ListAnimalsUserCase {
	private listAnimals = async (): Promise<any> => {
		const animals = await prisma.animal.findMany({
			select: {
				id: true,
				gender: true,
				specie: true,
				name: true,
				sickness: true,
				owner: false,
				account: {
					select: {
						id: true,
						name: true
					}
				}
			}
		});


		return animals.map(animal => ({
			id: animal.id,
			gender: animal.gender,
			specie: animal.specie,
			name: animal.name,
			sickness: animal.sickness,
			owner: { ...animal.account }
		}))
	}

	execute = async (): Promise<any> => {
		const animals = await this.listAnimals();
		return animals;
	}
}

export default ListAnimalsUserCase;