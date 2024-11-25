import express, { Request, Response } from "express";
import { speechToText } from "./functions/speechToText";
import { textToMeal } from "./functions/textToMeal";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import path from "path";

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



app.post("/speech-to-text", upload.single("audio"), async (req: Request, res: Response) => {
    console.log("POST request received at /speech-to-text");

    // Appel de speechToText pour obtenir la transcription
    const transcriptionData = await speechToText(req);

console.log("transcriptionData", transcriptionData);
    // Appel de textToMeal pour analyser la transcription
    const mealAnalysis = await textToMeal(transcriptionData);

    console.log("mealAnalysis", mealAnalysis);

    // je veux renvoyer le un objet meal analyse avec transcription et la mealanalysis
    res.json({transcriptionData, mealAnalysis});
    console.log({transcriptionData, mealAnalysis});

});


app.get("/", (req, res) => {
  res.send("The Speech-to-Text API is up and running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});