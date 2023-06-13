// Dependencies
import { PrismaClient } from "@prisma/client";

// Types
import { Account } from "../../../../models/account";

const prisma = new PrismaClient();

interface params {
  approved?: boolean,
  quantity: number,
  offset: number
}

interface ReturnType {
  options: {
    total: number,
    offset: number,
    quatity: number,
    length: number
  },
  data: Account[]
}

class ListAccounts {
  execute = async ({ approved = undefined, quantity = 100, offset = 0 }: params): Promise<ReturnType> => {
    const queryResult = await prisma.$transaction([
      prisma.account.count({
        where: {
          active: true
        }
      }),
      prisma.account.findMany({
        select: {
          id: true,
          cnpj: true,
          name: true,
          email: true,
          type: true,
        },
        where: {
          approved: approved,
          active: true
        },
        skip: offset,
        take: quantity
      })
    ]);

    return {
      options: {
        total: queryResult[0],
        length: queryResult[1].length,
        offset: offset,
        quatity: quantity,
      },
      data: queryResult[1].map(account => ({
        id: account.id,
        cnpj: account.cnpj,
        name: account.name,
        email: account.email,
        type: account.type
      }))
    };
  }
}

export default ListAccounts;