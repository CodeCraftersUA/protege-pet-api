// Dependencies
import { NextFunction, Request, Response } from "express";
import { Schema } from "yup";

// Error class
import AppError from "../../errors/AppError.js";

const validate = (schema: Schema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    });

    return next();
  } catch (err) {
    if (err.path) {
      throw new AppError(`${err.path} is invalid`);
    } else {
      throw err;
    }
  }
};

export default validate;