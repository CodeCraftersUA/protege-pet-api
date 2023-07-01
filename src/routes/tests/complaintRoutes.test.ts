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

const validCreateComplaintData = {
  name: "Complaint created by automated test",
  phone: "4599999999",
  description: "Achei um gatinho machucado no meio da rua, alguém pode vir socorrer?",
  specie: "CAT",
  situation: "NORMAL",
  address: {
    street: "Rua das Rosas",
    zipCode: "88888888",
    city: "Foz do Iguaçu",
    state: "Paraná",
    complement: "Perto do UPA",
    district: "Distrito"
  }
}

const invalidCreateComplaintData = {
  name: "Complaint not created by automated test",
  phone: {},
  escription: "Achei um gatinho machucado no meio da rua, alguém pode vir socorrer?",
  specie: ["CAT"],
  address: {
    street: 123123,
    zipCode: {},
    city: "Foz do Iguaçu",
    state: "Paraná",
    complement: "Perto do UPA"
  }
}

// Complaint
describe("on list complaints as admin", () => {
  it("should return status 200", async () => {
    await request(API_URL)
      .get(`/admin/complaints`)
      .set({ 'authorization': ADMIN_TOKEN })
      .expect(200)
  })
});

describe("on list complaints as protector", () => {
  it("should return status 200", async () => {
    await request(API_URL)
      .get(`/complaints`)
      .set({ 'authorization': PROTECTOR_TOKEN })
      .expect(200)
  })
});

describe("on post complaint", () => {
  it("should return status 201", async () => {
    await request(API_URL)
      .post(`/complaints`)
      .send(validCreateComplaintData)
      .expect(201)
  })
});

describe("on post complaint with invalid body", () => {
  it("should return status 400", async () => {
    await request(API_URL)
      .post(`/complaints`)
      .send(invalidCreateComplaintData)
      .expect(400)
  })
});


