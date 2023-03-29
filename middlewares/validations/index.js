import AppError from "../../errors/AppError.js";

export const validate = schema => async (req, res, next) => {
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