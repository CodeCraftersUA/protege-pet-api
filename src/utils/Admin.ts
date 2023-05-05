// Dependencies
import request from "supertest";

// Helpers
import getAdminLogin from "../helpers/getAdminLogin.ts";
import getServerRunningConfigs from "../helpers/getServerRunningConfigs.ts";

const { ADMIN_EMAIL, ADMIN_PASSWORD } = getAdminLogin();
const { SERVER_LINK } = getServerRunningConfigs();

class Admin {
	public token: null | string = null;

	private email = ADMIN_EMAIL;
	private password = ADMIN_PASSWORD;

	login = async (): Promise<void> => {
		const response = await request(SERVER_LINK)
			.post("/account/login")
			.send({ email: this.email, password: this.password });

		this.token = response.body.token;
	}
}

export default Admin;