// Dependencies
import yup from "yup";

// Validate
import { validate } from "./index.js";


const loginValidateSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(255).matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, "auth.invalid_password").required()
  })
});
export const loginValidate = validate(loginValidateSchema);
