import { Request, Response } from "express";
import fs from 'fs';
import OpenAI from 'openai';
import "dotenv/config";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const speechToText = async (req: Request, res: Response) => {
  try {

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
      // language: "de", // this is optional but helps the model
    });

    console.log("transcription:", transcription);
    const transcript = "This is a test transcription";

    // Structurer la réponse pour qu'elle soit interprétable par le front-end
    const response = {
      results: [
        {
          alternatives: [
            {
              transcript: transcript,
            },
          ],
        },
      ],
    };

    res.json(response);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};