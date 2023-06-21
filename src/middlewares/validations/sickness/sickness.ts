// Dependencies
import yup from "yup";

// Models
import { AnimalGender, AnimalSpecie } from "../../../models/animal.js";

// Validate
import validate from "../validate.js";


const listSicknessValidateSchema = yup.object({
  query: yup.object({
    specie: yup.string().oneOf([AnimalSpecie.CAT, AnimalSpecie.DOG]).notRequired(),
    quantity: yup.number().positive().notRequired(),
    offset: yup.number().min(0).notRequired(),
  })
});

export const listSicknessValidate = validate(listSicknessValidateSchema);