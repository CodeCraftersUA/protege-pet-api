// Dependencies
import express from "express";
import { createRequire } from "module";

const app = express();

// Validations
import * as protectorValidators from "../middlewares/validations/protector.js";

// Mock
const require = createRequire(import.meta.url);
const protectorsMock = require("../mock/protectors.json");


app.get("", (req, res) => {
    res.json(protectorsMock);
});

app.patch("", (req, res) => {

});

app.post("", protectorValidators.postValidate, (req, res) => {
    const newProtector = req.body;
    res.status(201).send(newProtector);
});

export default app;