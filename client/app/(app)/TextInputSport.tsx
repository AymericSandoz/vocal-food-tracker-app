import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useSession } from "@/functions/auth/ctx";
import { textTo } from "@/functions/textTo";
import { SportCard } from "@/components/resultAnalysis/sport";

const TextInputSport = () => {
  const [text, setText] = useState("");
  const [sportAnalysis, setSportAnalysis] = useState([]);
  const { session } = useSession();

  const handleTextTo = async (text: string, endpoint: "text-to-sport") => {
    try {
      const result = await textTo(text, session, endpoint);
      setSportAnalysis(result || {});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Enter sport text"
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => handleTextTo(text, "text-to-sport")}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      {sportAnalysis &&
        sportAnalysis.length > 0 &&
        sportAnalysis.map((analysis) => (
          <SportCard
            key={analysis._id}
            sport={analysis.sport}
            caloriesBurned={analysis.caloriesBurned}
            transcription={analysis.transcription}
            duration={analysis.duration}
          />
        ))}
    </View>
  );
};

export default TextInputSport;

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
