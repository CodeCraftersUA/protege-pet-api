import { AnimalSpecie } from "./animal";


export interface Sickness {
  id: string,
  name: string,
  species?: AnimalSpecie[]
}

export interface NewSickness {
  name: string,
  species: AnimalSpecie[]
}
