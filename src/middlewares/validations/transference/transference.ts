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
	})
});


export const requestTransferenceValidate = validate(requestTransferenceValidateSchema);