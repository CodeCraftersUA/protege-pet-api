// Types
import { User } from "../models/user.js";

// Mock
import { createRequire } from "module";
const require = createRequire(import.meta.url);


const fetchUserByEmailAndPassword = async (
  email: String,
  password: String
): Promise<User | undefined> => {
  const usersMock: Array<User> = require("../mock/users.json");

  const foundedUser = usersMock.find(userMock => userMock.email === email && userMock.password === password);

  return foundedUser;
}

export { fetchUserByEmailAndPassword }