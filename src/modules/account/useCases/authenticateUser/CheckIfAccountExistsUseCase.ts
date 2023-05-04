// Dependencies
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

class ValidateAccountExistsUserCase {
  execute = async (userId: string): Promise<boolean> => {
    const resultCount = await prisma.account.count({
      where: {
        id: userId,
        active: true
      }
    });

    return resultCount ? true : false;
  }
}

export default ValidateAccountExistsUserCase;