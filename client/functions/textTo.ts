import * as Device from "expo-device";
import { Platform } from "react-native";

export const textTo = async (
    text: string,
    endpoint: "text-to-meal" | "text-to-sport"
  ) => {
    try {
      const rootOrigin =
        Platform.OS === "android"
          ? "192.168.231.115"
          : Device.isDevice
          ? process.env.LOCAL_DEV_IP || "localhost"
          : "localhost";
      const serverUrl = `http://${rootOrigin}:4000`;
  
      if (!text.trim()) throw new Error("Text input cannot be empty");
  
      const response = await fetch(`${serverUrl}/${endpoint}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
  
      return response.json();
    } catch (error) {
      console.error(`Error in textTo: ${endpoint}`, error);
      throw error;
    }
  };
