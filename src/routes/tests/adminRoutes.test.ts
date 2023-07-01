// Dependencies
import { describe } from "@jest/globals";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config(); // Config dotenv

const SERVER_RESOURSE = process.env.SERVER_RESOURSE;
const PORT = process.env.PORT || 3000;
const API_URL = `${SERVER_RESOURSE}:${PORT}`;

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const INVALID_ADMIN_TOKEN = "InVaLiDtOKeN1m2kf94mfs91nfi";

let createdSicknessId: undefined | string;

const validCreateSicknessData = {
  name: "Sickness created by automated test",
  species: ["DOG"]
}

const invalidCreateSicknessData = {
  name: "Sickness not created by automated test",
  species: {}
}

// Sickness
describe("on create sickness", () => {
  it("should return status 201", async () => {
    const cresteSicknessResponse = await request(API_URL)
      .post(`/admin/sickness`)
      .send(validCreateSicknessData)
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(201);

    const { body } = cresteSicknessResponse;

    expect(body.id).toBeDefined();
    createdSicknessId = body.id;
  });
});

describe("on delete sickness", () => {
  it("should return status 200", async () => {
    console.log(createdSicknessId);

    await request(API_URL)
      .delete(`/admin/sickness/${createdSicknessId}`)
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(200)
  })
});

describe("on create sickness with invalid token", () => {
  it("should return status 403", async () => {
    await request(API_URL)
      .post(`/admin/sickness`)
      .send(validCreateSicknessData)
      .set({ 'authorization': INVALID_ADMIN_TOKEN })
      .expect(403)
  })
});

describe("on create sickness with invalid body", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post(`/admin/sickness`)
      .send(invalidCreateSicknessData)
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(400)
  })
});