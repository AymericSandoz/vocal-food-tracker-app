import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
type SportProps = {
  sport: "String";
  caloriesBurned: "String";
  duration: "String";
};
export const SportCard = ({ sport, caloriesBurned, duration }: SportProps) => {
  console.log(
    "sport",
    sport,
    "CaloriesBurned",
    caloriesBurned,
    "duration",
    duration
  );
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.header}>{sport}</Text>
      <View style={styles.totalCaloriesContainer}>
        <Text style={styles.totalCaloriesText}>Calories Burned :</Text>
        <Text style={styles.totalCaloriesValue}>{caloriesBurned} cal</Text>
        <Text style={styles.totalCaloriesText}>Duration :</Text>
        <Text style={styles.totalCaloriesValue}>{duration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  transcription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  foodList: {
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  scrollView: {
    maxHeight: 150,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  foodItemCalories: {
    fontSize: 12,
    color: "#777",
  },
  foodItemTotalCalories: {
    fontSize: 14,
    color: "#333",
  },
  totalCaloriesContainer: {
    backgroundColor: "#e6f7ff",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  totalCaloriesText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF",
  },
  totalCaloriesValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007BFF",
    marginTop: 4,
  },
});
