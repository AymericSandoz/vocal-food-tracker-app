import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { router } from "expo-router";
import { useSession } from "../functions/auth/ctx";

const rootOrigin =
  Platform.OS === "android"
    ? "192.168.140.115" // METTRE SON IP ICI ou 10.0.2.2 si émulateur(à confirmer)
    : Device.isDevice
    ? process.env.LOCAL_DEV_IP || "localhost"
    : "localhost";
const serverUrl = `http://${rootOrigin}:4000`;

console.log("serverUrl:", serverUrl);

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();

  const handleSignUp = async () => {
    try {
      const response = await fetch(`${serverUrl}/user/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      if (response.ok) {
        console.log("about to sign in");
        signIn(email, password);
        router.replace("/");
      } else {
        const responseData = await response.json();
        setError(responseData.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />
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
      <Button title="S'inscrire" onPress={handleSignUp} />
      <Button
        title="Déjà inscrit ? Se connecter"
        onPress={() => router.push("/sign-in")}
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

export default SignUpScreen;
