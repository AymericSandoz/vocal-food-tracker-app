import express, { Request, Response } from "express";
import { speechToText } from "./functions/speechToText";
import { textToMeal } from "./functions/textToMeal";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import path from "path";
const userRoutes = require("./routes/user");
const mealRoutes = require("./routes/meal");
const { createMeal } = require("./controllers/meal");
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
app.use(express.json({ limit: "50mb" }));

// Cross-origin requests
app.use(cors());

// Configuration du stockage avec renommage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = path.extname(originalName) || ".m4a"; // Par défaut, ajoutez .m4a si aucune extension
    cb(null, `${Date.now()}${extension}`);
  },
});

// Middleware multer
const upload = multer({ storage });

app.use("/user", userRoutes);
app.use("/meal", mealRoutes);

app.post("/speech-to-text", upload.single("audio"), async (req: Request, res: Response) => {

    const transcriptionData = await speechToText(req);
    const mealAnalysis = await textToMeal(transcriptionData);
    let data = {transcriptionData, mealAnalysis};
    createMeal(data);
    res.json(data);

});


app.get("/", (req, res) => {
  res.send("The Speech-to-Text API is up and running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});