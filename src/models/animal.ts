export default interface Animal {
  id: string,
  name: string,
  specie: AnimalSpecie,
  gender: AnimalGender,
  sickness: Sickness[],
  owner?: string,
  account?: {
    id: string,
    name: string
  }
}

export const AnimalSpecie: { [x: string]: 'DOG' | 'CAT' } = {
  DOG: "DOG",
  CAT: "CAT",
}

export const AnimalGender: { [x: string]: 'MALE' | 'FEMALE' } = {
  MALE: "MALE",
  FEMALE: "FEMALE",
}

export interface Sickness {
  id: string,
  name?: string,
  specie?: AnimalSpecie[]
}

export type AnimalSpecie = typeof AnimalSpecie[keyof typeof AnimalSpecie]
export type AnimalGender = typeof AnimalGender[keyof typeof AnimalGender]