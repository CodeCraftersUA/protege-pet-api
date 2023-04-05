// Mock
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Returns all protectors
const fetchUserByEmailAndPassword = async (email, password) => {
    const usersMock = require("../mock/users.json");
    
    const foundedUser = usersMock.find(userMock => userMock.email === email && userMock.password === password);
    
    return foundedUser;
}

export { fetchUserByEmailAndPassword }