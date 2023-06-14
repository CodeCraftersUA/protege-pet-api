// Dependencies
import { PrismaClient } from "@prisma/client";

// Error
import AppError from "../../../../errors/AppError.js";

// Types
import { AccountByAdmin } from "../../../../models/account";

const prisma = new PrismaClient();

interface params {
  id: string,
  approved?: boolean,
  cnpj?: string,
  name?: string,
  email?: string,
}

class UpdateApprovedAccountUseCase {
  execute = async ({ id, approved, cnpj, name, email }: params): Promise<AccountByAdmin> => {
    try {
      const queryResult = await prisma.account.update({
        data: {
          approved: approved,
          cnpj: cnpj,
          name: name,
          email: email
        },
        where: {
          id: id,
        }
      });

      return {
        id: queryResult.id,
        approved: queryResult.approved,
        cnpj: queryResult.cnpj,
        name: queryResult.name,
        email: queryResult.email,
        type: queryResult.type
      };
    } catch (err) {
      if (err?.code === "P2025")
        throw new AppError(`Could not find id ${id}`, 404)

      throw err;
    }
  }
}

export default UpdateApprovedAccountUseCase;