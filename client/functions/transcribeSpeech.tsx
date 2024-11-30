import { Audio } from "expo-av";
import { MutableRefObject } from "react";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import * as Device from "expo-device";

export const transcribeSpeech = async (
  audioRecordingRef: MutableRefObject<Audio.Recording>
) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });

    const isPrepared = audioRecordingRef?.current?._canRecord;
    if (isPrepared) {
      await audioRecordingRef?.current?.stopAndUnloadAsync();
      const recordingUri = audioRecordingRef?.current?.getURI() || "";

      if (recordingUri) {
        const formData = new FormData() as any;
        formData.append("audio", {
          uri: recordingUri,
          type: "audio/m4a", // Ou un autre type en fonction du format
          name: "audio.m4a", // Le nom du fichier
        });

        const rootOrigin =
          Platform.OS === "android"
            ? "192.168.140.115" // METTRE SON IP ICI ou 10.0.2.2 si émulateur(à confirmer)
            : Device.isDevice
            ? process.env.LOCAL_DEV_IP || "localhost"
            : "localhost";
        const serverUrl = `http://${rootOrigin}:4000`;

        console.log("formData", formData);
        console.log("serverUrl", serverUrl);

        const serverResponse = await fetch(`${serverUrl}/speech-to-meal/`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        })
          .then((res) => res.json())
          .catch((e: Error) =>
            console.error("error during post to /speech-to-meal", e)
          );

        console.log("serverResponse", serverResponse);

        const mealAnalysis = serverResponse;
        if (mealAnalysis) {
          return mealAnalysis;
        } else {
          console.error("No results from server");
        }
      } else {
        console.error("Recording URI is not available");
      }
    } else {
      console.error("Recording must be prepared prior to unloading");
    }
  } catch (e) {
    console.error("Failed to transcribe speech!", e);
  }
};
