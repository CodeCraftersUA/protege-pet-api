// Models
import Animal from "../../../models/animal";


class AnimalDTO {
	private animals: Animal[];

	execute = (animals: Animal) => {
		return this.animals.map(animal => ({
			id: animal.id,
			gender: animal.gender,
			specie: animal.specie,
			name: animal.name,
			sickness: animal.sickness,
			owner: { ...animal.account }
		}))
	}

	constructor(animals: Animal | Animal[]) {
		if (Array.isArray(animals))
			this.animals = animals
		else
			this.animals = [animals];
	}
}

export default AnimalDTO;