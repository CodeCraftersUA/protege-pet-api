// Dependencies
import dotenv from "dotenv";


dotenv.config(); // Config dotenv

const PORT = process.env.PORT || null;
const SERVER_RESOURSE = process.env.SERVER_RESOURSE || null;

interface ServerConfigs {
	PORT: string,
	SERVER_RESOURSE: string,
	SERVER_LINK: string,
}

const getAdminLogin = (): ServerConfigs => {
	if (!PORT || ! SERVER_RESOURSE)
		throw new Error("Cannot get server running configs");

	return {
		PORT,
		SERVER_RESOURSE,
        SERVER_LINK: `${SERVER_RESOURSE}:${PORT}`
	}
};

export default getAdminLogin;