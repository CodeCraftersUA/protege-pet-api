// Dependencies
import { AccountType } from "@prisma/client";
import yup from "yup";

// Validate
import validate from "../validate.js";

// Tests
import animalExists from "../yupTests/exists/animalExists.js";
import accountExists from "../yupTests/exists/accountExists.js";


const existsIsApprovedAndIsProtector = async (accountId: string): Promise<boolean> => {
  const result = await accountExists({
    accountId,
    approved: true,
    type: AccountType.PROTECTOR
  });

  return result;
}

const requestTransferenceValidateSchema = yup.object({
  body: yup.object({
    animalId: yup.string().min(5).max(55).required().test(animalExists),
    receiverId: yup.string().min(5).max(55).required().test(existsIsApprovedAndIsProtector),
  }),
});

const updateTransferenceValidateSchema = yup.object({
  body: yup.object({
    status: yup.string().required().oneOf(["ACCEPTED", "CANCELED", "REFUSED"])
  }),
});

const listTransferenceValidateSchema = yup.object({
  query: yup.object({
    receiverId: yup.string().min(5).max(55).notRequired(),
    requesterId: yup.string().min(5).max(55).notRequired(),
    animalId: yup.string().min(5).max(55).notRequired(),
  })
});


export const updateTransferenceValidate = validate(updateTransferenceValidateSchema);
export const listTransferenceValidate = validate(listTransferenceValidateSchema);
export const requestTransferenceValidate = validate(requestTransferenceValidateSchema);