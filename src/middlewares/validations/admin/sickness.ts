// Dependencies
import yup from "yup";

// Validate
import validate from "../validate.js";
import { AnimalSpecie } from "@prisma/client";



const createSicknessValidateScheme = yup.object({
  body: yup.object({
    name: yup.string().min(3).max(55).required(),
    species: yup.array(yup.string().oneOf([AnimalSpecie.CAT, AnimalSpecie.DOG]).required()),
  })
});

const updateSicknessValidateScheme = yup.object({
  body: yup.object({
    name: yup.string().min(3).max(55).notRequired(),
  })
});


export const createSicknessValidate = validate(createSicknessValidateScheme);
export const updateSicknessValidate = validate(updateSicknessValidateScheme);