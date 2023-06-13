// Dependencies
import { PrismaClient } from "@prisma/client";

// Types
import { Account } from "../../../../models/account";

const prisma = new PrismaClient();

interface params {
  approved?: boolean
}

class ListAccounts {
  execute = async ({ approved = true }: params = {}): Promise<Account[]> => {
    const accounts = prisma.account.findMany({
      select: {
        id: true,
        cnpj: true,
        name: true,
        email: true,
        type: true,
      },
      where: {
        approved: approved
      }
    });

    return accounts;
  }
}

export default ListAccounts;