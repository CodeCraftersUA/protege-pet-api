// Dependencies
import yup from "yup";

// Models
import { AnimalGender, AnimalSpecie } from "../../../models/animal.js";

// Validate
import validate from "../validate.js";


const createAnimalValidateSchema = yup.object({
  body: yup.object({
    name: yup.string().min(5).max(55).required(),
    specie: yup.string().oneOf([AnimalSpecie.CAT, AnimalSpecie.DOG]).required(),
    gender: yup.string().oneOf([AnimalGender.MALE, AnimalGender.FEMALE]).required(),
    sickness: yup.array(yup.object({
      id: yup.string().length(36).required()
    })).notRequired()
  })
});


export const createAnimalValidate = validate(createAnimalValidateSchema);