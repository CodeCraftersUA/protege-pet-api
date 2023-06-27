// Dependencies
import { ComplaintStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface params {
  status?: ComplaintStatus[],
  quantity: number,
  offset: number
}

class ListComplaintUseCase {
  execute = async ({ status = undefined, quantity = 100, offset = 0 }: params) => {
    const queryResult = await prisma.$transaction([
      prisma.complaint.count({
        where: {
          status: {
            in: status
          }
        }
      }),
      prisma.complaint.findMany({
        select: {
          id: true,
          name: true,
          specie: true,
          phone: true,
          description: true,
          addedAt: true,
          status: true,
          situation: true,
          address: {
            select: {
              city: true,
              district: true,
              state: true,
              street: true,
              zipCode: true,
              complement: true
            }
          }
        },
        where: {
          status: {
            in: status
          }
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
        quatity: quantity,
      },
      data: queryResult[1].map(complaint => ({
        id: complaint.id,
        name: complaint.name,
        specie: complaint.specie,
        phone: complaint.phone,
        description: complaint.description,
        status: complaint.status,
        addedAt: complaint.addedAt,
        situation: complaint.situation,
        address: {
          city: complaint.address.city,
          district: complaint.address.district,
          state: complaint.address.state,
          street: complaint.address.street,
          zipCode: complaint.address.zipCode,
          complement: complaint.address.complement
        }
      }))
    };
  }
}

export default ListComplaintUseCase;