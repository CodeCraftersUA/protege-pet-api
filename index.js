// Dependencies
import express from "express";

// Routes
import protectorRoutes from "./routes/protector.js";

const PORT = 3000; // API listen port

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/protectors", protectorRoutes);


const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`API running at: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit();
    }
};
start();