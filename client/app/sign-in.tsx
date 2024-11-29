import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { storeToken } from "@/functions/auth/token";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { router } from "expo-router";
import { useSession } from "../functions/auth/ctx";

const rootOrigin =
  Platform.OS === "android"
    ? "192.168.121.115" // METTRE SON IP ICI ou 10.0.2.2 si émulateur(à confirmer)
    : Device.isDevice
    ? process.env.LOCAL_DEV_IP || "localhost"
    : "localhost";
const serverUrl = `http://${rootOrigin}:4000`;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();
  const handleLogin = async () => {
    try {
      setError("");
      await signIn(email, password);
      router.replace("/"); // Redirige vers l'écran d'accueil
    } catch (err) {
      setError(err.message || "Erreur lors de la connexion");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Se connecter" onPress={handleLogin} />
      <Button
        title="Pas encore inscrit ? S'inscrire"
        onPress={() => router.push("/sign-up")}
        color="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
