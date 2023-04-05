// Errors
import AppError from "../errors/AppError.js";

// Mock
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Types
import { User } from "../models/user.js";


// Returns all protectors
const fetchProtectors = async (): Promise<Array<User>> => {
  const usersMock: Array<User> = require("../mock/users.json");
  const protectorsMock = usersMock.filter(user => user.type === "PROTECTOR");
  return protectorsMock;
}

// Returns protector by ID
const fetchProtector = async (
  id: number
) => {
  const protectorsMock: Array<User> = require("../mock/users.json");
  const protectorMock = protectorsMock.find(protector => protector.id === id);

  if (protectorMock) {
    return protectorMock;
  }

  throw new AppError(`Protector ${id} not found`, 404);
}

export { fetchProtectors, fetchProtector }