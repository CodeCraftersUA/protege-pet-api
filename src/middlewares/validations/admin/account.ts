// Dependencies
import yup from "yup";

// Validate
import validate from "../validate.js";



const updateAccountValidateSchema = yup.object({
  body: yup.object({
    approved: yup.boolean().notRequired(),
    name: yup.string().min(5).max(55).notRequired(),
    email: yup.string().email().notRequired(),
    cnpj: yup.string().length(14).notRequired(),
  })
});


export const updateAccountValidate = validate(updateAccountValidateSchema);