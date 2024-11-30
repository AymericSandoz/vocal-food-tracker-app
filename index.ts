import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
const userRoutes = require("./routes/user");
const mealRoutes = require("./routes/meal");
const openaiRoutes = require("./routes/openai");
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
require("./config/db");
const app = express();
app.use(express.json({ limit: "5mb" })); // éviter les fichiers audio trop volumineux

// Cross-origin requests
app.use(cors());

app.use("/user", userRoutes);
app.use("/meal", mealRoutes);
app.use("/", openaiRoutes);


app.get("/", (req, res) => {
  res.send("The Speech-to-Meal API is up and running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});