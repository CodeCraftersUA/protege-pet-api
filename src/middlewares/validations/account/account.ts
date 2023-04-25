// Dependencies
import yup from "yup";

// Validate
import validate from "../validate.js";

const yupPasswordValidation = yup.string().min(8).max(255).matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, "account.invalid_password").required()

const loginValidateSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yupPasswordValidation
  })
});

const createAccountValidateSchema = yup.object({
  body: yup.object({
    name: yup.string().min(5).max(55).required(),
    type: yup.string().oneOf(['PROTECTOR']).required(),
    email: yup.string().email().required(),
    password: yupPasswordValidation,
    cnpj: yup.string().length(14).notRequired()
  })
});


export const loginValidate = validate(loginValidateSchema);
export const createAccountValidate = validate(createAccountValidateSchema);