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
import { MealCard } from "@/components/resultAnalysis/meal";

const TextInputMeal = () => {
  console.log("TextInputMeal");
  const [text, setText] = useState("");
  const [mealAnalysis, setMealAnalysis] = useState({});
  const { session } = useSession();

  const handleTextTo = async (text: string, endpoint: "text-to-meal") => {
    try {
      const result = await textTo(text, session, endpoint);
      setMealAnalysis(result || {});
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
        placeholder="Enter meal text"
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => handleTextTo(text, "text-to-meal")}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      {mealAnalysis && Object.keys(mealAnalysis).length > 0 && (
        <MealCard
          name={mealAnalysis.name}
          totalCalories={mealAnalysis.totalCalories}
          transcription={mealAnalysis.transcription}
          foods={mealAnalysis.foods}
        />
      )}
    </View>
  );
};

export default TextInputMeal;

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
