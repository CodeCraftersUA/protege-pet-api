// Dependencies
import { describe } from "@jest/globals";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config(); // Config dotenv

const SERVER_RESOURSE = process.env.SERVER_RESOURSE;
const PORT = process.env.PORT || 3000;
const API_URL = `${SERVER_RESOURSE}:${PORT}`;

const PROTECTOR_TOKEN = process.env.APPROVED_PROTECTOR_TOKEN;
const APPROVED_SECONDARY_PROTECTOR_TOKEN = process.env.APPROVED_SECONDARY_PROTECTOR_TOKEN;

const VALID_SECONDARY_PROTECTOR_ID = process.env.VALID_SECONDARY_PROTECTOR_ID;

const validCreateAnimalForTransferenceData = {
  name: "Animal created for transference by automated test",
  gender: "FEMALE",
  specie: "DOG",
  description: "Animal created for test purposes",
  sickness: []
}

// Complaint
describe("on transference", () => {
  it("should return status 201", async () => {
    const createAnimalResponse = await request(API_URL)
      .post("/animals")
      .send(validCreateAnimalForTransferenceData)
      .set({ "authorization": PROTECTOR_TOKEN })
      .expect(201)

    const { body } = createAnimalResponse;

    expect(body).toBeDefined();
    expect(body.id).toBeDefined();

    const validCreateTransferenceData = {
      "receiverId": VALID_SECONDARY_PROTECTOR_ID,
      "animalId": body.id
    }

    await request(API_URL)
      .post(`/transferences`)
      .send(validCreateTransferenceData)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(201)
  })
});

describe("on transference with not possessed animal", () => {
  it("should return status 400", async () => {
    const createAnimalResponse = await request(API_URL)
      .post("/animals")
      .send(validCreateAnimalForTransferenceData)
      .set({ "authorization": PROTECTOR_TOKEN })
      .expect(201)

    const { body } = createAnimalResponse;

    expect(body).toBeDefined();
    expect(body.id).toBeDefined();

    const validCreateTransferenceData = {
      "receiverId": VALID_SECONDARY_PROTECTOR_ID,
      "animalId": body.id
    }

    await request(API_URL)
      .post(`/transferences`)
      .send(validCreateTransferenceData)
      .set({ 'authorization': APPROVED_SECONDARY_PROTECTOR_TOKEN })
      .expect(400)
  })
});

describe("on transference with non existent animal", () => {
  it("should return status 400", async () => {
    const invalidCreateTransferenceData = {
      "receiverId": VALID_SECONDARY_PROTECTOR_ID,
      "animalId": "invalidb-957a-49f7-ba87-a913b13044f9"
    }

    await request(API_URL)
      .post(`/transferences`)
      .send(invalidCreateTransferenceData)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(400)
  })
});

describe("on transference list", () => {
  it("should return status 200", async () => {
    await request(API_URL)
      .get(`/transferences`)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(200)
  })
});

describe("on transference list without a token", () => {
  it("should return status 401", async () => {
    await request(API_URL)
      .get(`/transferences`)
      .expect(401)
  })
});

describe("on transference patch", () => {
  it("should return status 200", async () => {
    const createAnimalResponse = await request(API_URL)
      .post("/animals")
      .send(validCreateAnimalForTransferenceData)
      .set({ "authorization": PROTECTOR_TOKEN })
      .expect(201)

    const { body } = createAnimalResponse;

    expect(body).toBeDefined();
    expect(body.id).toBeDefined();

    const validCreateTransferenceData = {
      "receiverId": VALID_SECONDARY_PROTECTOR_ID,
      "animalId": body.id
    }

    const createdTransferenceResponse = await request(API_URL)
      .post(`/transferences`)
      .send(validCreateTransferenceData)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(201)

    const transferenceBody = createdTransferenceResponse.body;

    expect(transferenceBody).toBeDefined();
    expect(transferenceBody.id).toBeDefined();

    const validPatchTransferenceData = {
      status: "ACCEPTED"
    }

    const transferenceId = transferenceBody.id;

    console.log(transferenceId)
    await request(API_URL)
      .patch(`/transferences/${transferenceId}`)
      .send(validPatchTransferenceData)
      .set({ 'authorization': APPROVED_SECONDARY_PROTECTOR_TOKEN })
      .expect(200)
  })
});

describe("on transference patch with invalid protector token", () => {
  it("should return status 403", async () => {
    const createAnimalResponse = await request(API_URL)
      .post("/animals")
      .send(validCreateAnimalForTransferenceData)
      .set({ "authorization": PROTECTOR_TOKEN })
      .expect(201)

    const { body } = createAnimalResponse;

    expect(body).toBeDefined();
    expect(body.id).toBeDefined();

    const validCreateTransferenceData = {
      "receiverId": VALID_SECONDARY_PROTECTOR_ID,
      "animalId": body.id
    }

    const createdTransferenceResponse = await request(API_URL)
      .post(`/transferences`)
      .send(validCreateTransferenceData)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(201)

    const transferenceBody = createdTransferenceResponse.body;

    expect(transferenceBody).toBeDefined();
    expect(transferenceBody.id).toBeDefined();

    const validPatchTransferenceData = {
      status: "ACCEPTED"
    }

    const transferenceId = transferenceBody.id;

    console.log(transferenceId)
    await request(API_URL)
      .patch(`/transferences/${transferenceId}`)
      .send(validPatchTransferenceData)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(403)
  })
});

describe("on transference patch with invalid transference id", () => {
  it("should return status 401", async () => {
    const validPatchTransferenceData = {
      status: "ACCEPTED"
    }

    const transferenceId = "invalid2-a8d8-409f-b541-d3d867e299b3";

    console.log(transferenceId)
    await request(API_URL)
      .patch(`/transferences/${transferenceId}`)
      .send(validPatchTransferenceData)
      .set({ 'authorization': APPROVED_SECONDARY_PROTECTOR_TOKEN })
      .expect(403)
  })
});

describe("on transference patch with invalid body", () => {
  it("should return status 400", async () => {
    const createAnimalResponse = await request(API_URL)
      .post("/animals")
      .send(validCreateAnimalForTransferenceData)
      .set({ "authorization": PROTECTOR_TOKEN })
      .expect(201)

    const { body } = createAnimalResponse;

    expect(body).toBeDefined();
    expect(body.id).toBeDefined();

    const validCreateTransferenceData = {
      "receiverId": VALID_SECONDARY_PROTECTOR_ID,
      "animalId": body.id
    }

    const createdTransferenceResponse = await request(API_URL)
      .post(`/transferences`)
      .send(validCreateTransferenceData)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(201)

    const transferenceBody = createdTransferenceResponse.body;

    expect(transferenceBody).toBeDefined();
    expect(transferenceBody.id).toBeDefined();

    const validPatchTransferenceData = {
      status: "INVALID_ENUM"
    }

    const transferenceId = transferenceBody.id;

    console.log(transferenceId)
    await request(API_URL)
      .patch(`/transferences/${transferenceId}`)
      .send(validPatchTransferenceData)
      .set({ 'authorization': APPROVED_SECONDARY_PROTECTOR_TOKEN })
      .expect(400)
  })
});