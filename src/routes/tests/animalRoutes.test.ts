// Dependencies
import { describe } from "@jest/globals";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config(); // Config dotenv

const SERVER_RESOURSE = process.env.SERVER_RESOURSE;
const PORT = process.env.PORT || 3000;
const API_URL = `${SERVER_RESOURSE}:${PORT}`;

const PROTECTOR_TOKEN = process.env.APPROVED_PROTECTOR_TOKEN;

const validAnimalData = {
    name: "Animal created by automated test",
    gender: "FEMALE",
    specie: "DOG",
    description: "Animal created for test purposes",
    sickness: []
}

describe("on list animals", () => {
    it("should return request options", async () => {
        const listAnimalsResponse = await request(API_URL)
            .get("/animals")
            .expect(200);

        const { options } = listAnimalsResponse.body;

        expect(options).toBeDefined();
        expect(options.total).toBeGreaterThan(-1);
        expect(options.offset).toBeGreaterThan(-1);
        expect(options.quantity).toBeGreaterThan(0);
        expect(options.length).toBeGreaterThan(-1);
    });

    it("should return animals list", async () => {
        const listAnimalsResponse = await request(API_URL)
            .get("/animals")
            .expect(200);

        const { data } = listAnimalsResponse.body;
        expect(data).toBeInstanceOf(Array);
    });
});

describe("on create animal with valid data", () => {
    it("should create animal and return created animal data", async () => {
        const createAnimalResponse = await request(API_URL)
            .post("/animals")
            .send(validAnimalData)
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(201)

        const { body } = createAnimalResponse;

        expect(body).toBeDefined();
        expect(body.id).toBeDefined();
        expect(body.gender).toBeDefined();
        expect(body.specie).toBeDefined();
        expect(body.name).toBeDefined();
        expect(body.addedAt).toBeDefined();
        expect(body.description).toBeDefined();
        expect(body.sickness).toBeInstanceOf(Array);

        expect(body.account).toBeInstanceOf(Object);
        expect(body.account.id).toBeDefined();
        expect(body.account.name).toBeDefined();
    });
});