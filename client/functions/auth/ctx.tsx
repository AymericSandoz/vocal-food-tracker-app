import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";
import { Platform } from "react-native";
import * as Device from "expo-device";

const rootOrigin =
  Platform.OS === "android"
    ? "192.168.231.115" // METTRE SON IP ICI ou 10.0.2.2 si émulateur(à confirmer)
    : Device.isDevice
    ? process.env.LOCAL_DEV_IP || "localhost"
    : "localhost";
const serverUrl = `http://${rootOrigin}:4000`;

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          try {
            const response = await fetch(`${serverUrl}/user/login/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              throw new Error("Erreur lors de la connexion");
            }

            const data = await response.json();

            // Stockez le jeton ou les informations utilisateur dans la session
            setSession(data.token || data.user);
          } catch (err) {
            console.error("Erreur lors de la connexion :", err.message);
            throw err; // Permet au composant qui appelle signIn de gérer l'erreur
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
