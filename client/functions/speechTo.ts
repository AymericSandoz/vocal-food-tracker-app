import { MutableRefObject } from "react";
import { Audio } from "expo-av";
import { serverUrl } from "../utils/serverUrl";

export const speechTo = async (
  audioRecordingRef: MutableRefObject<Audio.Recording>,
  session: string | null | undefined,
  endpoint: "speech-to-meal" | "speech-to-sport"
) => {
  try {

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

      console.log("Recording URI:", `${serverUrl}/${endpoint}/`);
      const response = await fetch(`${serverUrl}/${endpoint}/`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session}`,
        },
        body: formData,
      });
      return response.json();
    } else {
      console.log("Status must be prepared to record audio");
    }
  } catch (error) {
    console.error(`Error in speechTo: ${endpoint}`, error);
    throw error;
  }
};
