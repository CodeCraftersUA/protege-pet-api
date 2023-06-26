// Dependencies
import yup from "yup";

// Models
import { AnimalSpecie } from "../../../models/animal.js";

// Validate
import validate from "../validate.js";


const createComplaintValidateSchema = yup.object({
  body: yup.object({
    name: yup.string().min(5).max(55).required(),
    specie: yup.string().oneOf([AnimalSpecie.CAT, AnimalSpecie.DOG]).required(),
    phone: yup.string().min(10).max(15).required(),
    description: yup.string().min(12).max(510).required(),
    address: yup.object({
      city: yup.string().min(5).max(55).required(),
      state: yup.string().min(5).max(55).required(),
      zipCode: yup.string().min(8).max(10).required(),
      complement: yup.string().min(5).max(55).notRequired(),
      street: yup.string().min(5).max(55).required(),
    })
  })
});

export const createComplaintValidate = validate(createComplaintValidateSchema);