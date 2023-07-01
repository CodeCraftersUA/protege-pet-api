// Dependencies
import { AnimalSpecie, AnimalsOnSickness, SicknessOnAnimalSpecie, PrismaClient } from '@prisma/client';

// Errors
import AppError from '../../../../errors/AppError.js';
import { KEY_ALREADY_EXISTS } from '../../../../errors/prismaErrorsCodes.js';

interface params {
    id: string,
    species: AnimalSpecie[]
}

const prisma = new PrismaClient();

class UpdateSicknessSpeciesUseCase {
    execute = async ({ id, species }: params) => {
        try {
            const queryResult = await prisma.$transaction(async () => {

                await prisma.sicknessOnAnimalSpecie.deleteMany({
                    where: {
                        sicknessId: id
                    }
                })

                for (let specie of species){
                    return await prisma.sickness.update({
                        data: {
                            species: {
                                create: {
                                    specie: specie
                                }
                            }
                        },
                        select: {
                            id: true,
                            name: true,
                            species: {
                                select: {
                                    specie: true
                                }
                            }
                        },
                        where: {
                            id: id
                        }
                    });
                }
            });
            
            prisma.$disconnect();
            
            if (!queryResult) 
                throw new AppError(`Sickness not found`, 400)

            return {
                id: queryResult.id,
                name: queryResult.name,
                species: queryResult.species.map(specie => ({
                    specie: specie.specie
                }))
            }
        } catch (err) {
            console.error(err)
            if (err.code === KEY_ALREADY_EXISTS)
                throw new AppError(`Attribute ${err.meta.target} already exists`, 400);

            throw err;
        }
    }
}

export default UpdateSicknessSpeciesUseCase;