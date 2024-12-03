import { serverUrl } from "../utils/serverUrl";

export const textTo = async (
    text: string,
    session: string | null | undefined,
    endpoint: "text-to-meal" | "text-to-sport"
  ) => {
    try {
      if (!text.trim()) throw new Error("Text input cannot be empty");
  
      const response = await fetch(`${serverUrl}/${endpoint}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify({ text }),
      });
  
      return response.json();
    } catch (error) {
      console.error(`Error in textTo: ${endpoint}`, error);
      throw error;
    }
  };
