// Dependencies
import { AccountType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface params {
	accountId: string,
	approved?: boolean
	type?: AccountType
}

const accountExists = async ({ accountId, approved = true, type }: params): Promise<boolean> => {
	const queryResult = await prisma.account.count({
		where: {
			id: accountId,
			active: true,
			approved: approved,
			type: type
		}
	});

	if (queryResult)
		return true;

	return false;
};

export default accountExists;