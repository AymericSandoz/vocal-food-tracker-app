import { MutableRefObject } from "react";
import { Audio } from "expo-av";
import * as Device from "expo-device";
import { Platform } from "react-native";

export const speechTo = async (
  audioRecordingRef: MutableRefObject<Audio.Recording>,
  endpoint: "speech-to-meal" | "speech-to-sport"
) => {
  try {
    const rootOrigin =
      Platform.OS === "android"
        ? "192.168.231.115"
        : Device.isDevice
        ? process.env.LOCAL_DEV_IP || "localhost"
        : "localhost";
    const serverUrl = `http://${rootOrigin}:4000`;

    const isPrepared = audioRecordingRef?.current?._canRecord;
    if (isPrepared) {
      await audioRecordingRef?.current?.stopAndUnloadAsync();
      const recordingUri = audioRecordingRef?.current?.getURI() || "";

      if (!recordingUri) throw new Error("Recording URI is not available");

      const formData = new FormData() as any;
      formData.append("audio", {
        uri: recordingUri,
        type: "audio/m4a",
        name: "audio.m4a",
      });

      const response = await fetch(`${serverUrl}/${endpoint}/`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      return response.json();
    } else {
      throw new Error("Recording must be prepared prior to unloading");
    }
  } catch (error) {
    console.error(`Error in speechTo: ${endpoint}`, error);
    throw error;
  }
};
