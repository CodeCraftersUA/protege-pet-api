export default interface Animal {
  id: string,
  name: string,
  specie: AnimalSpecie,
  gender: AnimalGender,
  sickness: Sickness[],
  owner: string
}

export enum AnimalSpecie {
  DOG = "DOG",
  CAT = "CAT",
}

export enum AnimalGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface Sickness {
  id: string,
  name: string,
  specie?: AnimalSpecie[]
}