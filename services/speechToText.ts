import axios from "axios";
import FormData from "form-data";
import fs from "fs";
export const speechToText = async (req) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à OpenAI:", error.response?.data || error.message);
    throw new Error("Erreur lors de la transcription");
  }
};

