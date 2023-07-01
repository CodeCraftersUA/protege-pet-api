// Dependencies
import { PrismaClient } from "@prisma/client";

// Error
import AppError from "../../../../errors/AppError.js";
import { KEY_ALREADY_EXISTS, RECORD_DOES_NOT_EXIST } from "../../../../errors/prismaErrorsCodes.js";

// Types
import { Account } from "../../../../models/account";

const prisma = new PrismaClient();

interface params {
  id: string
}

class GetAccountUseCase {
  execute = async ({ id }: params): Promise<Account> => {
    try {
      const queryResult = await prisma.account.findFirstOrThrow({
        select: {
          id: true,
          email: true,
          name: true,
          type: true,
          active: true,
          approved: true,
          cnpj: true,
          addedAt: true
        },
        where: {
          id: id,
        }
      });

      return {
        id: queryResult.id,
        email: queryResult.email,
        name: queryResult.name,
        type: queryResult.type,
        cnpj: queryResult.cnpj
      }

    } catch (err) {
      if (err?.code === RECORD_DOES_NOT_EXIST)
        throw new AppError(`Could not find id ${id}`, 404);

      if (err.code === KEY_ALREADY_EXISTS)
        throw new AppError(`Attribute ${err.meta.target} already exists`, 409);

      throw err;
    }
  }
}

export default GetAccountUseCase;