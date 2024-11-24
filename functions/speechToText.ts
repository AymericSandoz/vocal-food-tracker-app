import { Request, Response } from "express";

export const speechToText = async (req: Request, res: Response) => {
  try {
    // Simuler une transcription pour l'exemple
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