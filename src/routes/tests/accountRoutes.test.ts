// Dependecies
import { describe } from "@jest/globals";
import request from "supertest";

// Helpers
import getServerRunningConfigs from "../../helpers/getServerRunningConfigs.ts";
import generateUniqueId from "../../helpers/generateUniqueId.ts";

// Utils
import Admin from "../../utils/Admin.ts";


const { SERVER_LINK } = getServerRunningConfigs();
const admin = new Admin();

const testUser = {
	name: generateUniqueId(),
	type: "PROTECTOR",
	email: `${generateUniqueId()}@email.com`,
	password: generateUniqueId(),
	cnpj: "46883214000154",
	token: ""
}

beforeAll(async () => {
	await admin.login();

	// Create test user
	await request(SERVER_LINK)
		.post("/account")
		.send(testUser)
		.expect(201);

	// Login as test user
	const response = await request(SERVER_LINK)
		.post("/account/login")
		.send({ email: testUser.email, password: testUser.password })
		.expect(200);

		testUser.token = response.body.token;
});

describe("on login with valid info", () => {
	it("should return token", async () => {
		const response = await request(SERVER_LINK)
			.post("/account/login")
			.send({ email: testUser.email, password: testUser.password })
			.expect(200);

		expect(true).toBe(true);
	})
});
