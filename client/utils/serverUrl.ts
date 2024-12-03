import { Platform } from "react-native";
import * as Device from "expo-device";

const rootOrigin =
  Platform.OS === "android"
    ? "192.168.231.115" // METTRE SON IP ICI ou 10.0.2.2 si émulateur(à confirmer)
    : Device.isDevice
    ? process.env.LOCAL_DEV_IP || "localhost"
    : "localhost";

export const serverUrl = `http://${rootOrigin}:4000`;

