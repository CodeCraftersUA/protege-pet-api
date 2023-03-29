// Dependencies
import yup from "yup";

// Validate
import { validate } from "./index.js";


const postValidateSchema = yup.object({
  body: yup.object({
    cnpj: yup.string().length(14).required(),
    name: yup.string().min(3).max(100).required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10).max(11),
    password: yup.string().min(8).max(255).matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, "protector.invalid_password").required()
  })
});
export const postValidate = validate(postValidateSchema);
