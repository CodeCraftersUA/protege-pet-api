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
const PROTECTOR_SECONDARY_TOKEN = process.env.APPROVED_SECONDARY_PROTECTOR_TOKEN;

let createdAnimalId: string | undefined;

const validCreateAnimalData = {
    name: "Animal created by automated test",
    gender: "FEMALE",
    specie: "DOG",
    description: "Animal created for test purposes",
    sickness: []
}

const validUpdateAnimalData = {
    gender: "MALE",
    specie: "CAT",
    description: null,
    name: "Animal updated by automated test"
}

const validateAnimalData = (animal: any) => {
    expect(animal.id).toBeDefined();
    expect(animal.gender).toBeDefined();
    expect(animal.specie).toBeDefined();
    expect(animal.name).toBeDefined();
    expect(animal.addedAt).toBeDefined();
    expect(animal.description).toBeDefined();
    expect(animal.sickness).toBeInstanceOf(Array);
    expect(animal.account.id).toBeDefined();
    expect(animal.account.name).toBeDefined();
}

// Create animal validations
describe("on create animal with valid data", () => {
    it("should create animal and return created animal data", async () => {
        const createAnimalResponse = await request(API_URL)
            .post("/animals")
            .send(validCreateAnimalData)
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

        createdAnimalId = body.id;
    });
});

describe("on create animal with invalid gender", () => {
    it("should return status 400", async () => {
        await request(API_URL)
            .post("/animals")
            .send({ ...validCreateAnimalData, gender: "INVALID" })
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on create animal with invalid specie", () => {
    it("should return status 400", async () => {
        await request(API_URL)
            .post("/animals")
            .send({ ...validCreateAnimalData, specie: "INVALID" })
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on create animal with invalid name", () => {
    it("should return status 400", async () => {
        await request(API_URL)
            .post("/animals")
            .send({ ...validCreateAnimalData, name: "N" })
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on create animal with invalid description", () => {
    it("should return status 400", async () => {
        await request(API_URL)
            .post("/animals")
            .send({ ...validCreateAnimalData, description: "N" })
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on create animal without data", () => {
    it("should return status 400", async () => {
        await request(API_URL)
            .post("/animals")
            .send({})
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on create animal without token", () => {
    it("should return status 401", async () => {
        await request(API_URL)
            .post("/animals")
            .send(validCreateAnimalData)
            .expect(401)
    });
});

describe("on create animal as administrator", () => {
    it("should return status 403", async () => {
        await request(API_URL)
            .post("/animals")
            .send(validCreateAnimalData)
            .set({ "authorization": ADMIN_TOKEN })
            .expect(403)
    });
});

describe("on create animal with invalid token", () => {
    it("should return status 403", async () => {
        await request(API_URL)
            .post("/animals")
            .send(validCreateAnimalData)
            .set({ "authorization": "InVaLiDtOKeN1m2kf94mfs91nfi" })
            .expect(403)
    });
});

// List animals validations
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
        validateAnimalData(data[0]);
    });
});

// Get animal validations
describe("on get animal", () => {
    it("should update animal", async () => {
        const getAnimalResponse = await request(API_URL)
            .get(`/animals/${createdAnimalId}`)
            .expect(200)

        const { body } = getAnimalResponse;
        validateAnimalData(body);
    });
});

// Update animal validations
describe("on update animal with valid data", () => {
    it("should update animal", async () => {
        const updatedAnimalResponse = await request(API_URL)
            .patch(`/animals/${createdAnimalId}`)
            .send(validUpdateAnimalData)
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(200)

        const { body } = updatedAnimalResponse;

        expect(body).toBeDefined();
        expect(body.id).toBe(createdAnimalId);
        expect(body.gender).toBe(validUpdateAnimalData.gender);
        expect(body.specie).toBe(validUpdateAnimalData.specie);
        expect(body.name).toBe(validUpdateAnimalData.name);
        expect(body.addedAt).toBeDefined();
        expect(body.description).toBe(validUpdateAnimalData.description);
        expect(body.sickness).toBeInstanceOf(Array);

        expect(body.account).toBeInstanceOf(Object);
        expect(body.account.id).toBeDefined();
        expect(body.account.name).toBeDefined();
    });
});

describe("on update animal with invalid gender", () => {
    it("should update animal", async () => {
        await request(API_URL)
            .patch(`/animals/${createdAnimalId}`)
            .send({ ...validUpdateAnimalData, gender: "INVALID" })
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on update animal with invalid specie", () => {
    it("should update animal", async () => {
        await request(API_URL)
            .patch(`/animals/${createdAnimalId}`)
            .send({ ...validUpdateAnimalData, specie: "INVALID" })
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on update animal with invalid name", () => {
    it("should update animal", async () => {
        await request(API_URL)
            .patch(`/animals/${createdAnimalId}`)
            .send({ ...validUpdateAnimalData, name: "N" })
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on update animal with invalid description", () => {
    it("should update animal", async () => {
        await request(API_URL)
            .patch(`/animals/${createdAnimalId}`)
            .send({ ...validUpdateAnimalData, description: "N" })
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(400)
    });
});

describe("on update animal that does not belong to this account", () => {
    it("should update animal", async () => {
        await request(API_URL)
            .patch(`/animals/${createdAnimalId}`)
            .send(validUpdateAnimalData)
            .set({ "authorization": PROTECTOR_SECONDARY_TOKEN })
            .expect(403)
    });
});

describe("on update animal without token", () => {
    it("should update animal", async () => {
        await request(API_URL)
            .patch(`/animals/${createdAnimalId}`)
            .send(validUpdateAnimalData)
            .expect(401)
    });
});

describe("on update animal with invalid token", () => {
    it("should update animal", async () => {
        await request(API_URL)
            .patch(`/animals/${createdAnimalId}`)
            .send(validUpdateAnimalData)
            .set({ "authorization": "InVaLiDtOKeN1m2kf94mfs91nfi" })
            .expect(403)
    });
});

// Delete animal validations
describe("on delete animal", () => {
    it("should return status 200 animal", async () => {
        await request(API_URL)
            .delete(`/animals/${createdAnimalId}`)
            .set({ "authorization": PROTECTOR_TOKEN })
            .expect(200)
    });

    it("should not return animal data", async () => {
        await request(API_URL)
            .get(`/animals/${createdAnimalId}`)
            .expect(404)
    });
});