// Errors
import AppError from "../errors/AppError.js";

// Mock
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Returns all protectors
const fetchProtectors = async () => {
  const protectorsMock = require("../mock/protectors.json");
  return protectorsMock;
}

// Returns protector by ID
const fetchProtector = async id => {
  const protectorsMock = require("../mock/protectors.json");
  const protectorMock = protectorsMock.find(protector => protector.id === id);

  if (protectorMock) {
    return protectorMock;
  }

  throw new AppError(`Protector ${id} not found`, 404);
}

export { fetchProtectors, fetchProtector }