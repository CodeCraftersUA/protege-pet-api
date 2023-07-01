// Dependencies
import { describe } from "@jest/globals";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config(); // Config dotenv

const SERVER_RESOURSE = process.env.SERVER_RESOURSE;
const PORT = process.env.PORT || 3000;
const API_URL = `${SERVER_RESOURSE}:${PORT}`;

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const PROTECTOR_TOKEN = process.env.APPROVED_PROTECTOR_TOKEN;

const PROTECTOR_EMAIL = process.env.PROTECTOR_EMAIL;
const PROTECTOR_PASSWORD = process.env.PROTECTOR_PASSWORD;

let createdAccountId: string | undefined;
let receivedToken: string | undefined;

const validEmail = "automated_test_email@test.com";
const validPassword = "automated_test_password_144";

const validNameToUpdate = "Name updated by automated test";
const validCNPJToUpdate = "58493510250014";

// Create account validations
describe("on create account with valid data", () => {
  it("should return status 201", async () => {
    const createAccountResponse = await request(API_URL)
      .post("/accounts")
      .send({
        name: "Automated Test Created account",
        email: validEmail,
        password: validPassword,
        type: "PROTECTOR",
        cnpj: "84593510005742",
      })
      .expect(201)

    const { body } = createAccountResponse;
    expect(body).toBeDefined();
    expect(body.id).toBeDefined();

    createdAccountId = body.id;
  })
});

describe("on create account with duplicated email", () => {
  it("should return status 490", async () => {
    await request(API_URL)
      .post("/accounts")
      .send({
        name: "Automated Test Created account 2",
        email: validEmail,
        password: validPassword,
        type: "PROTECTOR",
        cnpj: "84593510005743",
      })
      .expect(409)
  })
});

describe("on create account with duplicated name", () => {
  it("should return status 490", async () => {
    await request(API_URL)
      .post("/accounts")
      .send({
        name: "Automated Test Created account",
        email: `second_${validEmail}`,
        password: validPassword,
        type: "PROTECTOR",
        cnpj: "84593510005743",
      })
      .expect(409)
  })
});

describe("on create account with duplicated cnpj", () => {
  it("should return status 490", async () => {
    await request(API_URL)
      .post("/accounts")
      .send({
        name: "Automated Test Created account 2",
        email: `second_${validEmail}`,
        password: validPassword,
        type: "PROTECTOR",
        cnpj: "84593510005742",
      })
      .expect(409)
  })
});

describe("on create account with invalid email", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post("/accounts")
      .send({
        name: "Automated Test Created account",
        email: "invalid",
        password: validPassword,
        type: "PROTECTOR",
        cnpj: "84593510005742",
      })
      .expect(400);
  })
});

describe("on create account with invalid name", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post("/accounts")
      .send({
        name: "n",
        email: validEmail,
        password: validPassword,
        type: "PROTECTOR",
        cnpj: "84593510005742",
      })
      .expect(400);
  })
});

describe("on create account with invalid password", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post("/accounts")
      .send({
        name: "Automated Test Created account",
        email: validEmail,
        password: "invalid",
        type: "PROTECTOR",
        cnpj: "84593510005742",
      })
      .expect(400);
  })
});

describe("on create account with invalid type", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post("/accounts")
      .send({
        name: "Automated Test Created account",
        email: validEmail,
        password: validPassword,
        type: "invalid",
        cnpj: "84593510005742",
      })
      .expect(400);
  })
});

describe("on create account with invalid cnpj", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post("/accounts")
      .send({
        name: "Automated Test Created account",
        email: validEmail,
        password: validPassword,
        type: "PROTECTOR",
        cnpj: "8459351",
      })
      .expect(400);
  })
});

// Update account as ADMIN
describe("on update account with admin token", () => {
  it("should return status 403", async () => {
    const updateAccountResponse = await request(API_URL)
      .patch(`/admin/accounts/${createdAccountId}`)
      .send({ "approved": true })
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(200);

    const { body } = updateAccountResponse;

    expect(body).toBeDefined();
    expect(body.id).toBeDefined();
    expect(body.approved).toBeTruthy();
    expect(body.cnpj).toBeDefined();
    expect(body.name).toBeDefined();
    expect(body.type).toBeDefined();
    expect(body.email).toBeDefined();
  });
});

describe("on update account with invalid body", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .patch(`/admin/accounts/${createdAccountId}`)
      .send({ "approved": "invalid" })
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(400);
  });
});

describe("on update account without token", () => {
  it("should return status 401", async () => {
    await request(API_URL)
      .patch(`/admin/accounts/${createdAccountId}`)
      .send({ "approved": true })
      .expect(401);
  });
});

describe("on update account with protector token", () => {
  it("should return status 403", async () => {
    await request(API_URL)
      .patch(`/admin/accounts/${createdAccountId}`)
      .send({ "approved": true })
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(403);
  });
});

// Login validations
describe("on login with valid data", () => {
  it("should return data", async () => {
    const loginResponse = await request(API_URL)
      .post("/accounts/login")
      .send({ email: validEmail, password: validPassword })
      .expect(200)

    const { body } = loginResponse;

    expect(body.token).toBeDefined();
    expect(body.token.split(" ")[1]).toBeDefined();
    expect(body.expiresIn).toBeDefined();

    receivedToken = body.token.split(" ")[1];
  });
});

describe("on login with invalid password", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post("/accounts/login")
      .send({ email: PROTECTOR_EMAIL, password: "invalid-password" })
      .expect(400)
  });
});

describe("on login with wrong password", () => {
  it("should return status 403", async () => {
    await request(API_URL)
      .post("/accounts/login")
      .send({ email: PROTECTOR_EMAIL, password: "wrong-password-123" })
      .expect(401)
  });
});

describe("on login with invalid email", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post("/accounts/login")
      .send({ email: "invalid_email", password: PROTECTOR_PASSWORD })
      .expect(400)
  });
});

describe("on login with wrong email", () => {
  it("should return status 403", async () => {
    await request(API_URL)
      .post("/accounts/login")
      .send({ email: "not_existing_email@email.com", password: PROTECTOR_PASSWORD })
      .expect(401)
  });
});

// List Accounts
describe("on list accounts with admin token", () => {
  it("should return options", async () => {
    const listAccountsResponse = await request(API_URL)
      .get("/admin/accounts")
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(200)

    const { options } = listAccountsResponse.body;

    expect(options).toBeDefined();
    expect(options.total).toBeGreaterThan(-1);
    expect(options.offset).toBeGreaterThan(-1);
    expect(options.quantity).toBeGreaterThan(0);
    expect(options.length).toBeGreaterThan(-1);
  });

  it("should return data", async () => {
    const listAccountsResponse = await request(API_URL)
      .get("/admin/accounts")
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(200)

    const { data } = listAccountsResponse.body;

    expect(data).toBeInstanceOf(Array);
    expect(data[0].id).toBeDefined();
    expect(data[0].approved).toBeDefined();
    expect(data[0].cnpj).toBeDefined();
    expect(data[0].name).toBeDefined();
    expect(data[0].email).toBeDefined();
    expect(data[0].type).toBeDefined();
  });
});

describe("on list accounts without token", () => {
  it("should return status 401", async () => {
    await request(API_URL)
      .get("/admin/accounts")
      .expect(401)
  });
});

describe("on list accounts with protector token", () => {
  it("should return status 403", async () => {
    await request(API_URL)
      .get("/admin/accounts")
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(403)
  });
});

// Update my account
describe("on update my account with valid data and token", () => {
  it("should update account", async () => {
    const updateMyAccountResponse = await request(API_URL)
      .patch("/accounts")
      .send({ name: validNameToUpdate, cnpj: validCNPJToUpdate })
      .set({ "authorization": receivedToken })
      .expect(200);

    const { body } = updateMyAccountResponse;
    expect(body.name).toBe(validNameToUpdate)
  });
});

describe("on update my account with invalid name", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .patch("/accounts")
      .send({ name: "in" })
      .set({ "authorization": receivedToken })
      .expect(400);
  });
});

describe("on update my account with invalid cnpj", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .patch("/accounts")
      .send({ cnpj: -102 })
      .set({ "authorization": receivedToken })
      .expect(400);
  });
});

describe("on update account with duplicated name", () => {
  it("should return status 409", async () => {
    await request(API_URL)
      .patch("/accounts")
      .send({ "name": validNameToUpdate })
      .set({ "authorization": PROTECTOR_TOKEN })
      .expect(409);
  });
});

describe("on update account with duplicated cnpj", () => {
  it("should return status 409", async () => {
    await request(API_URL)
      .patch("/accounts")
      .send({ "cnpj": validCNPJToUpdate })
      .set({ "authorization": PROTECTOR_TOKEN })
      .expect(409);
  });
});

// Delete account validations
describe("on delete account with protector token", () => {
  it("should return status 403", async () => {
    await request(API_URL)
      .delete(`/admin/accounts/${createdAccountId}`)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(403)
  })
});

describe("on delete account without token", () => {
  it("should return status 403", async () => {
    await request(API_URL)
      .delete(`/admin/accounts/${createdAccountId}`)
      .expect(401)
  })
});

describe("on delete account with admin token", () => {
  it("should return status 200", async () => {
    await request(API_URL)
      .delete(`/admin/accounts/${createdAccountId}`)
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(200)
  })
});