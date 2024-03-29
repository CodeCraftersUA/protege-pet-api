// Dependencies
import { PrismaClient } from "@prisma/client";

// Types
import { AccountByAdmin } from "../../../../models/account";

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
    quantity: number,
    length: number
  },
  data: AccountByAdmin[]
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
          approved: true
        },
        where: {
          approved: approved,
          active: true
        },
        skip: offset,
        take: quantity,
        orderBy: {
          addedAt: 'desc'
        }
      })
    ]);

    return {
      options: {
        total: queryResult[0],
        length: queryResult[1].length,
        offset: offset,
        quantity: quantity,
      },
      data: queryResult[1].map(account => ({
        id: account.id,
        approved: account.approved,
        cnpj: account.cnpj,
        name: account.name,
        email: account.email,
        type: account.type
      }))
    };
  }
}

export default ListAccounts;