// Dependencies
import yup from "yup";
import { ComplaintStatus } from "@prisma/client";

// Validate
import validate from "../validate.js";


const listComplaintValidateSchema = yup.object({
  query: yup.object({
    status: yup.string().oneOf([ComplaintStatus.ANSWERED, ComplaintStatus.REQUESTED, ComplaintStatus.WAITING_APPROVAL, ComplaintStatus.CANCELED]).notRequired(),
    quantity: yup.number().positive().notRequired(),
    offset: yup.number().min(0).notRequired(),
  })
});

const updateComplaintValidateSchema = yup.object({
  body: yup.object({
    status: yup.string().oneOf([ComplaintStatus.ANSWERED, ComplaintStatus.REQUESTED, ComplaintStatus.WAITING_APPROVAL, ComplaintStatus.CANCELED]).notRequired(),
  })
});


export const listComplaintValidate = validate(listComplaintValidateSchema);
export const updateComplaintValidate = validate(updateComplaintValidateSchema);