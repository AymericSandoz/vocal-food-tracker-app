// import { Request, Response } from "express";
// import fs from 'fs';
// import OpenAI from 'openai';
// import "dotenv/config";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export const speechToText = async (req: Request, res: Response) => {
//   try {

// console.log("testfs", fs.createReadStream(req.file.path))
//     const transcription = await openai.audio.transcriptions.create({
//       file: fs.createReadStream(req.file.path),
//       model: "whisper-1",
//       // language: "de", // this is optional but helps the model
//     });

//     console.log("transcription:", transcription);
//     const transcript = "This is a test transcription";

//     // Structurer la réponse pour qu'elle soit interprétable par le front-end
//     const response = {
//       results: [
//         {
//           alternatives: [
//             {
//               transcript: transcript,
//             },
//           ],
//         },
//       ],
//     };

//     res.json(response);
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Internal Server Error");
//   }
// };

import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const speechToText = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path)); // Charge le fichier
    formData.append("model", "whisper-1"); // Modèle Whisper

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(), // Nécessaire pour définir les bons headers multipart
        },
      }
    );

    console.log("Réponse de OpenAI:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de l'appel à OpenAI:", error.response?.data || error.message);
    res.status(500).send("Erreur lors de la transcription");
  }
};
