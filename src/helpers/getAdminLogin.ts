// Dependencies
import dotenv from "dotenv";


dotenv.config(); // Config dotenv

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || null;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || null;

interface AdminData {
	ADMIN_EMAIL: string,
	ADMIN_PASSWORD: string,
}

const getAdminLogin = (): AdminData => {
	if (!ADMIN_EMAIL || ! ADMIN_PASSWORD)
		throw new Error("Cannot get admin login info");

	return {
		ADMIN_EMAIL,
		ADMIN_PASSWORD
	}
};

export default getAdminLogin;