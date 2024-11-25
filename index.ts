import express, { Request, Response } from "express";
import { speechToText } from "./functions/speechToText";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
app.use(express.json({ limit: "50mb" }));

// Cross-origin requests
app.use(cors());

// Configurez multer pour gérer les téléchargements de fichiers
const upload = multer({ dest: "uploads/" });


app.post("/speech-to-text", upload.single("audio"), (req: Request, res: Response) => {
  console.log("POST request received at /speech-to-text");
  console.log("File received:", req.file);
  speechToText(req, res);
});

app.get("/", (req, res) => {
  res.send("The Speech-to-Text API is up and running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});