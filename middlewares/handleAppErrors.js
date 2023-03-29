import AppError from "../errors/AppError.js";

const handleAppErrors = (err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
}

export { handleAppErrors };