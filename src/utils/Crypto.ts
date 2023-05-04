// Dependencies
import bcrypt from "bcrypt";

// Error
import AppError from "../errors/AppError.ts";

const SECRET_KEY = "123"

const algorithm = 'aes-192-cbc';

class Crypto {
  async encrypt(stringToEncrypt: string) {
    try {
      const encryptedString = await bcrypt.hash(stringToEncrypt, 12);
      return encryptedString;
    } catch (err) {
      console.error(err);
      throw new AppError("Error during encryption", 500);
    }
  };

  async compare(stringToCompare: string, hash: string) {
    try {
      const comparisonResult =  bcrypt.compare(stringToCompare, hash);
      return comparisonResult;
    } catch (err) {
      console.error(err);
      throw new AppError("Error during decryption", 500);
    }
  }
}

export default Crypto;